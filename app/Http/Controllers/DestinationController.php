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
            },
            'reviews' => function ($query) {
                $query->with('user')->latest()->limit(5);
            }
        ]);

        $destination->loadCount(['bookings', 'reviews']);

        // Related destinations from same agency
        $agencyDestinations = Destination::where('agency_id', $destination->agency_id)
            ->where('id', '!=', $destination->id)
            ->withCount('bookings')
            ->limit(3)
            ->get();

        // Related destinations by category
        $relatedDestinations = Destination::where('category', $destination->category)
            ->where('id', '!=', $destination->id)
            ->withCount('bookings')
            ->limit(4)
            ->get();

        // Popular destinations (alternative recommendations)
        $popularDestinations = Destination::popular()
            ->where('id', '!=', $destination->id)
            ->limit(6)
            ->get();

        // Calculate average rating from reviews
        $averageRating = $destination->reviews()->avg('rating') ?? $destination->rating ?? 4.5;

        // Process recent reviews for display
        $recentReviews = $destination->reviews->map(function ($review) {
            return [
                'id' => $review->id,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'user' => [
                    'name' => $review->user->name,
                    'avatar' => $review->user->avatar ?? "https://ui-avatars.com/api/?name=" . urlencode($review->user->name)
                ],
                'created_at' => $review->created_at->format('M j, Y'),
            ];
        });

        // Weather data processing
        $weatherInfo = [
            'description' => $destination->weather_info,
            'temperature_ranges' => $destination->temperature_ranges,
            'best_time_to_visit' => $this->getBestTimeToVisit($destination->temperature_ranges)
        ];

        // Activities and services
        $activities = $destination->activities ?? [];
        $includedServices = $destination->included_services ?? [];

        return Inertia::render('destinations/show', [
            'destination' => array_merge($destination->toArray(), [
                'average_rating' => round($averageRating, 1),
                'review_count' => $destination->reviews_count,
                'weather' => $weatherInfo,
                'activities' => $activities,
                'included_services' => $includedServices,
                'photo_gallery' => $destination->photo_gallery ?? [],
            ]),
            'agencyDestinations' => $agencyDestinations,
            'relatedDestinations' => $relatedDestinations,
            'popularDestinations' => $popularDestinations,
            'recentReviews' => $recentReviews,
            'stats' => [
                'total_bookings' => $destination->bookings_count,
                'average_rating' => round($averageRating, 1),
                'review_count' => $destination->reviews_count,
                'duration_days' => $destination->duration_days ?? 7,
                'max_group_size' => $destination->max_group_size ?? 20,
                'difficulty_level' => $destination->difficulty_level ?? 'moderate'
            ],
            'itinerary' => $this->generateSampleItinerary($destination),
        ]);
    }

    /**
     * Generate a sample itinerary based on destination data
     */
    private function generateSampleItinerary($destination)
    {
        $days = $destination->duration_days ?? 7;
        $activities = $destination->activities ?? ['Sightseeing', 'Cultural Experience', 'Adventure'];

        $itinerary = [];
        for ($day = 1; $day <= min($days, 7); $day++) {
            $activity = $activities[($day - 1) % count($activities)] ?? 'Exploration';
            $itinerary[] = [
                'day' => $day,
                'title' => "Day {$day}: {$activity}",
                'description' => $this->generateDayDescription($activity, $destination->name),
                'highlights' => $this->generateDayHighlights($activity)
            ];
        }

        return $itinerary;
    }

    /**
     * Generate day description for itinerary
     */
    private function generateDayDescription($activity, $destinationName)
    {
        $descriptions = [
            'Sightseeing' => "Explore the iconic landmarks and breathtaking views of {$destinationName}",
            'Cultural Experience' => "Immerse yourself in the rich local culture and traditions",
            'Adventure' => "Embark on thrilling adventures and outdoor activities",
            'Wildlife Watching' => "Discover amazing wildlife in their natural habitat",
            'Historical Tours' => "Journey through fascinating historical sites and stories",
            'Food Tours' => "Savor authentic local cuisine and culinary delights",
            'Nature Walks' => "Connect with nature through guided walks and hikes"
        ];

        return $descriptions[$activity] ?? "Experience the best of {$destinationName}";
    }

    /**
     * Generate highlights for each day
     */
    private function generateDayHighlights($activity)
    {
        $highlights = [
            'Sightseeing' => ['Photo opportunities', 'Guided tour', 'Local insights'],
            'Cultural Experience' => ['Traditional performances', 'Local artisans', 'Cultural workshops'],
            'Adventure' => ['Outdoor activities', 'Equipment provided', 'Safety briefing'],
            'Wildlife Watching' => ['Expert guides', 'Photography tips', 'Conservation insights'],
            'Historical Tours' => ['Expert historians', 'Ancient sites', 'Fascinating stories'],
            'Food Tours' => ['Local restaurants', 'Cooking classes', 'Market visits'],
            'Nature Walks' => ['Scenic routes', 'Flora and fauna', 'Peaceful environment']
        ];

        return $highlights[$activity] ?? ['Memorable experiences', 'Professional guides', 'Amazing discoveries'];
    }

    /**
     * Determine best time to visit based on temperature ranges
     */
    private function getBestTimeToVisit($temperatureRanges)
    {
        if (!$temperatureRanges)
            return 'Year-round';

        $ranges = is_string($temperatureRanges) ? json_decode($temperatureRanges, true) : $temperatureRanges;

        if (!$ranges)
            return 'Year-round';

        $bestSeasons = [];
        foreach ($ranges as $season => $temps) {
            if (isset($temps['min']) && isset($temps['max'])) {
                // Consider seasons with temperatures between 15-25°C as ideal
                if ($temps['min'] >= 10 && $temps['max'] <= 30) {
                    $bestSeasons[] = ucfirst($season);
                }
            }
        }

        return !empty($bestSeasons) ? implode(' and ', $bestSeasons) : 'Year-round';
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
