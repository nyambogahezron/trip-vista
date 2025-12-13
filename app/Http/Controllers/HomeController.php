<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Destination;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the homepage with featured destinations and agencies.
     */
    public function index()
    {
        // Get featured destinations (top rated with most bookings)
        $featuredDestinations = Destination::with('agency')
            ->withCount('bookings')
            ->whereNotNull('rating')
            ->orderBy('rating', 'desc')
            ->orderBy('bookings_count', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($destination) {
                return [
                    'id' => $destination->id,
                    'name' => $destination->name,
                    'location' => $destination->location ?? 'Unknown Location',
                    'description' => $destination->description ?? 'Experience amazing adventures at this wonderful destination.',
                    'price' => floatval($destination->price ?? 999),
                    'image' => $destination->featured_image
                        ? asset('storage/' . $destination->featured_image)
                        : 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
                    'rating' => floatval($destination->rating ?? 4.5),
                    'reviews' => $destination->bookings_count,
                    'duration' => '7 days', // Default since not in DB
                    'highlights' => $this->parseActivities($destination->activities)
                ];
            });

        // Get featured agencies (top rated with most destinations)
        $featuredAgencies = Agency::withCount(['destinations', 'bookings'])
            ->whereNotNull('rating')
            ->orderBy('rating', 'desc')
            ->orderBy('destinations_count', 'desc')
            ->limit(2)
            ->get()
            ->map(function ($agency) {
                return [
                    'id' => $agency->id,
                    'name' => $agency->name,
                    'description' => $agency->description ?? 'Professional travel agency providing excellent service.',
                    'logo' => $agency->logo
                        ? asset('storage/' . $agency->logo)
                        : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop&crop=center',
                    'featuredImage' => $agency->featured_image
                        ? asset('storage/' . $agency->featured_image)
                        : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
                    'rating' => floatval($agency->rating ?? 4.5),
                    'reviewCount' => $agency->bookings_count,
                    'specialties' => ['Travel Planning', 'Tour Packages', 'Customer Service'], // Default since not in DB
                    'established' => '2020', // Default since not in DB
                    'destinations' => $agency->destinations_count,
                    'website' => $agency->website,
                    'location' => $agency->location ?? 'Global'
                ];
            });

        // Get some stats for the homepage
        $stats = [
            'total_destinations' => Destination::count(),
            'total_agencies' => Agency::count(),
            'total_bookings' => \App\Models\Booking::count(),
            'happy_customers' => \App\Models\User::whereHas('bookings')->count()
        ];

        return Inertia::render('home', [
            'featuredDestinations' => $featuredDestinations,
            'featuredAgencies' => $featuredAgencies,
            'stats' => $stats
        ]);
    }

    /**
     * Parse activities into an array of highlights.
     */
    private function parseActivities($activities): array
    {
        if (!$activities) {
            return ['Beautiful scenery', 'Cultural experience', 'Great food', 'Adventure activities'];
        }

        if (is_string($activities)) {
            $parsed = explode(',', $activities);
            return array_map('trim', $parsed);
        }

        if (is_array($activities)) {
            return $activities;
        }

        // Try to decode as JSON if it's a JSON string
        if (is_string($activities) && json_decode($activities)) {
            return json_decode($activities, true);
        }

        return ['Beautiful scenery', 'Cultural experience', 'Great food', 'Adventure activities'];
    }
}
