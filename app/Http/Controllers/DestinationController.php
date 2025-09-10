<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDestinationRequest;
use App\Http\Requests\UpdateDestinationRequest;
use App\Models\Destination;
use App\Models\Agency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DestinationController extends Controller
{
    public function __construct()
    {
        // Allow guest access to read-only methods
        $this->authorizeResource(Destination::class, 'destination', [
            'except' => ['index', 'show', 'popular', 'byAgency', 'api']
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Destination::with('agency');

        // Search functionality
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        // Filter by price range
        if ($request->filled('min_price') || $request->filled('max_price')) {
            $minPrice = $request->get('min_price', 0);
            $maxPrice = $request->get('max_price', 999999);
            $query->byPriceRange($minPrice, $maxPrice);
        }

        // Filter by agency
        if ($request->filled('agency_id')) {
            $query->where('agency_id', $request->agency_id);
        }

        // Sort options
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'popular':
                $query->popular();
                break;
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            default:
                $query->latest();
        }

        $destinations = $query->withCount('bookings')
            ->paginate(12)
            ->withQueryString();

        $agencies = Agency::select('id', 'name')->get();
        $categories = Destination::distinct()->pluck('category')->filter();

        return Inertia::render('destinations/index', [
            'destinations' => $destinations,
            'agencies' => $agencies,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'min_price', 'max_price', 'agency_id', 'sort']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $agencies = Agency::select('id', 'name')->get();

        return Inertia::render('destinations/create', [
            'agencies' => $agencies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDestinationRequest $request)
    {
        $validated = $request->validated();

        // Handle file upload
        /** @var \Illuminate\Http\Request $request */
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('destinations/featured', 'public');
        }

        $destination = Destination::create($validated);

        return redirect()->route('destinations.show', $destination)
            ->with('success', 'Destination created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Destination $destination)
    {
        $destination->load([
            'agency',
            'bookings' => function ($query) {
                $query->with('user')->latest()->limit(10);
            }
        ]);

        $destination->loadCount('bookings');

        // Related destinations
        $relatedDestinations = Destination::where('category', $destination->category)
            ->where('id', '!=', $destination->id)
            ->withCount('bookings')
            ->limit(4)
            ->get();

        return Inertia::render('destinations/show', [
            'destination' => $destination,
            'relatedDestinations' => $relatedDestinations,
            'stats' => [
                'total_bookings' => $destination->bookings_count,
                'average_rating' => $destination->average_rating,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Destination $destination)
    {
        $agencies = Agency::select('id', 'name')->get();

        return Inertia::render('destinations/edit', [
            'destination' => $destination,
            'agencies' => $agencies
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDestinationRequest $request, Destination $destination)
    {
        $validated = $request->validated();

        // Handle file upload
        /** @var \Illuminate\Http\Request $request */
        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($destination->featured_image) {
                Storage::disk('public')->delete($destination->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('destinations/featured', 'public');
        }

        $destination->update($validated);

        return redirect()->route('destinations.show', $destination)
            ->with('success', 'Destination updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Destination $destination)
    {
        // Delete associated file
        if ($destination->featured_image) {
            Storage::disk('public')->delete($destination->featured_image);
        }

        $destination->delete();

        return redirect()->route('destinations.index')
            ->with('success', 'Destination deleted successfully.');
    }

    /**
     * Display popular destinations.
     */
    public function popular()
    {
        $destinations = Destination::popular()
            ->with('agency')
            ->withCount('bookings')
            ->paginate(8);

        return Inertia::render('destinations/popular', [
            'destinations' => $destinations
        ]);
    }

    /**
     * Get destinations by agency.
     */
    public function byAgency(Agency $agency)
    {
        $destinations = $agency->destinations()
            ->withCount('bookings')
            ->paginate(12);

        return Inertia::render('destinations/by-agency', [
            'destinations' => $destinations,
            'agency' => $agency
        ]);
    }

    /**
     * Get destinations for API consumption.
     */
    public function api(Request $request)
    {
        $query = Destination::with('agency');

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        if ($request->filled('popular')) {
            $query->popular();
        }

        $destinations = $query->withCount('bookings')
            ->paginate($request->get('per_page', 15));

        return response()->json($destinations);
    }
}
