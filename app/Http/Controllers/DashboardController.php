<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Destination;
use App\Models\Booking;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Get stats for dashboard
        $stats = [
            'totalAgencies' => Agency::count(),
            'totalDestinations' => Destination::count(),
            'totalBookings' => $user->is_admin ? Booking::count() : $user->bookings()->count(),
            'unreadNotifications' => $user->notifications()->where('read_at', null)->count(),
        ];

        // Get recent activities
        $recentBookings = $user->is_admin
            ? Booking::with(['destination', 'agency', 'user'])->latest()->limit(5)->get()
            : $user->bookings()->with(['destination', 'agency'])->latest()->limit(5)->get();

        // Get popular destinations
        $popularDestinations = Destination::withCount('bookings')
            ->orderBy('bookings_count', 'desc')
            ->limit(3)
            ->get();

        // Get featured agencies
        $featuredAgencies = Agency::where('is_featured', true)
            ->orWhere('rating', '>=', 4.5)
            ->limit(3)
            ->get();

        // Get user's upcoming bookings
        $upcomingBookings = $user->bookings()
            ->upcoming()
            ->with(['destination', 'agency'])
            ->orderBy('travel_date')
            ->limit(3)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings,
            'popularDestinations' => $popularDestinations,
            'featuredAgencies' => $featuredAgencies,
            'upcomingBookings' => $upcomingBookings,
            'user' => $user
        ]);
    }
}
