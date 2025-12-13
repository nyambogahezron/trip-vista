<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Destination;
use App\Models\Agency;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Booking::class, 'booking');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Booking::with(['destination', 'agency', 'user']);

        // Filter by user if not admin
        if (!Auth::user()->is_admin ?? false) {
            $query->where('user_id', Auth::id());
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        // Filter by payment status
        if ($request->filled('payment_status')) {
            $query->byPaymentStatus($request->payment_status);
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->where('travel_date', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->where('travel_date', '<=', $request->date_to);
        }

        // Sort options
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'travel_date':
                $query->orderBy('travel_date', 'asc');
                break;
            case 'amount':
                $query->orderBy('total_price', 'desc');
                break;
            default:
                $query->latest();
        }

        $bookings = $query->paginate(10)->withQueryString();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only(['status', 'payment_status', 'date_from', 'date_to', 'sort']),
            'stats' => [
                'total' => Booking::count(),
                'pending' => Booking::byStatus(Booking::STATUS_PENDING)->count(),
                'confirmed' => Booking::byStatus(Booking::STATUS_CONFIRMED)->count(),
                'completed' => Booking::byStatus(Booking::STATUS_COMPLETED)->count(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $destination = null;
        if ($request->filled('destination_id')) {
            $destination = Destination::with('agency')->find($request->destination_id);
        }

        $destinations = Destination::with('agency')->get();
        $agencies = Agency::all();

        return Inertia::render('Bookings/Create', [
            'destinations' => $destinations,
            'agencies' => $agencies,
            'preselectedDestination' => $destination,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();
        $validated['status'] = Booking::STATUS_PENDING;
        $validated['payment_status'] = Booking::PAYMENT_STATUS_UNPAID;

        $booking = Booking::create($validated);

        // Create notification
        Notification::create([
            'user_id' => $booking->user_id,
            'type' => Notification::TYPE_BOOKING_CONFIRMATION,
            'message' => "Your booking for {$booking->destination->name} has been created and is pending confirmation.",
        ]);

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $booking->load(['destination.agency', 'user']);

        return Inertia::render('Bookings/Show', [
            'booking' => $booking,
            'canCancel' => $booking->canBeCancelled(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        $destinations = Destination::with('agency')->get();
        $agencies = Agency::all();

        return Inertia::render('Bookings/Edit', [
            'booking' => $booking,
            'destinations' => $destinations,
            'agencies' => $agencies,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        $oldStatus = $booking->status;
        $booking->update($request->validated());

        // Create notification if status changed
        if ($oldStatus !== $booking->status) {
            $message = match ($booking->status) {
                Booking::STATUS_CONFIRMED => "Your booking for {$booking->destination->name} has been confirmed.",
                Booking::STATUS_CANCELLED => "Your booking for {$booking->destination->name} has been cancelled.",
                Booking::STATUS_COMPLETED => "Your booking for {$booking->destination->name} has been completed. We hope you enjoyed your trip!",
                default => "Your booking status has been updated.",
            };

            Notification::create([
                'user_id' => $booking->user_id,
                'type' => $booking->status === Booking::STATUS_CANCELLED
                    ? Notification::TYPE_BOOKING_CANCELLATION
                    : Notification::TYPE_BOOKING_CONFIRMATION,
                'message' => $message,
            ]);
        }

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        // Create cancellation notification
        Notification::create([
            'user_id' => $booking->user_id,
            'type' => Notification::TYPE_BOOKING_CANCELLATION,
            'message' => "Your booking for {$booking->destination->name} has been deleted.",
        ]);

        $booking->delete();

        return redirect()->route('bookings.index')
            ->with('success', 'Booking deleted successfully.');
    }

    /**
     * Cancel a booking.
     */
    public function cancel(Booking $booking)
    {
        $this->authorize('update', $booking);

        if (!$booking->canBeCancelled()) {
            return back()->with('error', 'This booking cannot be cancelled.');
        }

        $booking->update(['status' => Booking::STATUS_CANCELLED]);

        // Create notification
        Notification::create([
            'user_id' => $booking->user_id,
            'type' => Notification::TYPE_BOOKING_CANCELLATION,
            'message' => "Your booking for {$booking->destination->name} has been cancelled.",
        ]);

        return back()->with('success', 'Booking cancelled successfully.');
    }

    /**
     * Confirm a booking (admin only).
     */
    public function confirm(Booking $booking)
    {
        $this->authorize('update', $booking);

        $booking->update(['status' => Booking::STATUS_CONFIRMED]);

        // Create notification
        Notification::create([
            'user_id' => $booking->user_id,
            'type' => Notification::TYPE_BOOKING_CONFIRMATION,
            'message' => "Great news! Your booking for {$booking->destination->name} has been confirmed.",
        ]);

        return back()->with('success', 'Booking confirmed successfully.');
    }

    /**
     * Mark payment as paid (admin only).
     */
    public function markPaid(Booking $booking)
    {
        $this->authorize('update', $booking);

        $booking->update(['payment_status' => Booking::PAYMENT_STATUS_PAID]);

        // Create notification
        Notification::create([
            'user_id' => $booking->user_id,
            'type' => Notification::TYPE_PAYMENT_CONFIRMATION,
            'message' => "Payment confirmed for your booking of {$booking->destination->name}.",
        ]);

        return back()->with('success', 'Payment marked as paid successfully.');
    }

    /**
     * Get user's upcoming bookings.
     */
    public function upcoming()
    {
        $bookings = Auth::user()->bookings()
            ->upcoming()
            ->with(['destination', 'agency'])
            ->orderBy('travel_date', 'asc')
            ->get();

        return Inertia::render('Bookings/Upcoming', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Get user's past bookings.
     */
    public function history()
    {
        $bookings = Auth::user()->bookings()
            ->past()
            ->with(['destination', 'agency'])
            ->orderBy('travel_date', 'desc')
            ->paginate(10);

        return Inertia::render('Bookings/History', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Get bookings for API consumption.
     */
    public function api(Request $request)
    {
        $query = Booking::with(['destination', 'agency', 'user']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        $bookings = $query->paginate($request->get('per_page', 15));

        return response()->json($bookings);
    }
}
