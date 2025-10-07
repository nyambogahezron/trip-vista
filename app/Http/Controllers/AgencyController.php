<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAgencyRequest;
use App\Http\Requests\UpdateAgencyRequest;
use App\Models\Agency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AgencyController extends Controller
{
    public function __construct()
    {
        // Allow guest access to read-only methods
        $this->authorizeResource(Agency::class, 'agency', [
            'except' => ['index', 'show', 'featured', 'api']
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Agency::query();

        // Search functionality
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filter by rating
        if ($request->filled('rating')) {
            $query->where('rating', '>=', $request->rating);
        }

        // Filter by location
        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        $agencies = $query->withCount(['destinations', 'bookings'])
            ->with([
                'destinations' => function ($q) {
                    $q->limit(3);
                }
            ])
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('agencies/index', [
            'agencies' => $agencies,
            'filters' => $request->only(['search', 'rating', 'location']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('agencies/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAgencyRequest $request)
    {
        $validated = $request->validated();

        // Handle file uploads
        /** @var \Illuminate\Http\Request $request */
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('agencies/logos', 'public');
        }

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('agencies/featured', 'public');
        }

        $agency = Agency::create($validated);

        return redirect()->route('agencies.show', $agency)
            ->with('success', 'Agency created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Agency $agency)
    {
        $agency->load([
            'destinations' => function ($query) {
                $query->withCount('bookings')->orderBy('rating', 'desc');
            },
            'bookings' => function ($query) {
                $query->with(['user', 'destination'])->latest()->limit(10);
            },
            'approvedReviews' => function ($query) {
                $query->with('user')->latest()->limit(5);
            }
        ]);

        $agency->loadCount(['destinations', 'bookings', 'approvedReviews']);

        // Get featured tours (destinations with high ratings)
        $featuredTours = $agency->destinations()
            ->where('rating', '>=', 4.5)
            ->withCount('bookings')
            ->orderBy('rating', 'desc')
            ->limit(4)
            ->get();

        // Get recent reviews with user details
        $recentReviews = $agency->approvedReviews()
            ->with(['user'])
            ->latest()
            ->limit(3)
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'user_name' => $review->user->name,
                    'user_avatar' => $review->user->avatar ?? 'https://i.pravatar.cc/150?img=' . ($review->user->id % 50),
                    'user_location' => $review->user->location ?? 'Unknown',
                    'created_at' => $review->created_at,
                ];
            });

        return Inertia::render('agencies/show', [
            'agency' => [
                'id' => $agency->id,
                'name' => $agency->name,
                'description' => $agency->description,
                'logo' => $agency->logo,
                'featured_image' => $agency->featured_image,
                'rating' => $agency->rating,
                'review_count' => $agency->review_count,
                'specialties' => $agency->specialties ?? [],
                'founded_year' => $agency->founded_year,
                'locations' => $agency->locations ?? [],
                'website' => $agency->website,
                'email' => $agency->email,
                'phone' => $agency->phone,
                'location' => $agency->location,
                'is_featured' => $agency->is_featured,
                'destinations_count' => $agency->destinations_count,
                'bookings_count' => $agency->bookings_count,
            ],
            'stats' => [
                'total_destinations' => $agency->destinations_count,
                'total_bookings' => $agency->bookings_count,
                'average_rating' => $agency->average_rating,
                'review_count' => $agency->approved_reviews_count,
                'popular_destinations' => $agency->destinations->take(5),
            ],
            'featured_tours' => $featuredTours,
            'recent_reviews' => $recentReviews,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agency $agency)
    {
        return Inertia::render('agencies/edit', [
            'agency' => $agency
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAgencyRequest $request, Agency $agency)
    {
        $validated = $request->validated();

        // Handle file uploads
        /** @var \Illuminate\Http\Request $request */
        if ($request->hasFile('logo')) {
            // Delete old logo
            if ($agency->logo) {
                Storage::disk('public')->delete($agency->logo);
            }
            $validated['logo'] = $request->file('logo')->store('agencies/logos', 'public');
        }

        if ($request->hasFile('featured_image')) {
            // Delete old featured image
            if ($agency->featured_image) {
                Storage::disk('public')->delete($agency->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('agencies/featured', 'public');
        }

        $agency->update($validated);

        return redirect()->route('agencies.show', $agency)
            ->with('success', 'Agency updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agency $agency)
    {
        // Delete associated files
        if ($agency->logo) {
            Storage::disk('public')->delete($agency->logo);
        }
        if ($agency->featured_image) {
            Storage::disk('public')->delete($agency->featured_image);
        }

        $agency->delete();

        return redirect()->route('agencies.index')
            ->with('success', 'Agency deleted successfully.');
    }

    /**
     * Display featured agencies.
     */
    public function featured()
    {
        $agencies = Agency::featured()
            ->withCount(['destinations', 'bookings'])
            ->paginate(8);

        return Inertia::render('agencies/featured', [
            'agencies' => $agencies
        ]);
    }

    /**
     * Get agencies for API consumption.
     */
    public function api(Request $request)
    {
        $query = Agency::query();

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('featured')) {
            $query->featured();
        }

        $agencies = $query->withCount(['destinations', 'bookings'])
            ->paginate($request->get('per_page', 15));

        return response()->json($agencies);
    }
}
