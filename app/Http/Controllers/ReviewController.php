<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Models\Review;
use App\Models\Agency;
use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Display a listing of reviews.
     */
    public function index(Request $request): Response
    {
        $query = Review::with(['user:id,name', 'reviewable'])
            ->approved()
            ->latest();

        // Filter by reviewable type
        if ($request->filled('type')) {
            if ($request->type === 'agencies') {
                $query->forAgencies();
            } elseif ($request->type === 'destinations') {
                $query->forDestinations();
            }
        }

        // Filter by rating
        if ($request->filled('rating')) {
            $query->byRating($request->rating);
        }

        // Search in comments
        if ($request->filled('search')) {
            $query->where('comment', 'like', '%' . $request->search . '%')
                ->orWhereHas('user', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->search . '%');
                });
        }

        $reviews = $query->paginate(15)->withQueryString();

        return Inertia::render('reviews/index', [
            'reviews' => $reviews,
            'filters' => $request->only(['type', 'rating', 'search']),
            'stats' => [
                'total' => Review::approved()->count(),
                'agencies' => Review::approved()->forAgencies()->count(),
                'destinations' => Review::approved()->forDestinations()->count(),
                'average_rating' => Review::approved()->avg('rating'),
            ]
        ]);
    }

    /**
     * Show the form for creating a new review.
     */
    public function create(Request $request): Response
    {
        $reviewableType = $request->get('type');
        $reviewableId = $request->get('id');
        $reviewable = null;

        if ($reviewableType && $reviewableId) {
            $reviewable = match ($reviewableType) {
                'agency' => Agency::find($reviewableId),
                'destination' => Destination::find($reviewableId),
                default => null
            };
        }

        return Inertia::render('reviews/create', [
            'reviewable' => $reviewable,
            'reviewable_type' => $reviewableType,
        ]);
    }

    /**
     * Store a newly created review.
     */
    public function store(StoreReviewRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();

        // Handle image uploads
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $imagePaths[] = $path;
            }
            $validated['images'] = $imagePaths;
        }

        $review = Review::create($validated);

        return redirect()->route('reviews.show', $review)
            ->with('success', 'Review submitted successfully!');
    }

    /**
     * Display the specified review.
     */
    public function show(Review $review): Response
    {
        $review->load(['user:id,name', 'reviewable']);

        return Inertia::render('reviews/show', [
            'review' => $review,
            'can_edit' => Auth::check() && Auth::id() === $review->user_id,
            'can_delete' => Auth::check() && Auth::id() === $review->user_id,
        ]);
    }

    /**
     * Show the form for editing the specified review.
     */
    public function edit(Review $review): Response
    {
        $this->authorize('update', $review);

        $review->load(['user:id,name', 'reviewable']);

        return Inertia::render('reviews/edit', [
            'review' => $review
        ]);
    }

    /**
     * Update the specified review.
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        $this->authorize('update', $review);

        $validated = $request->validated();

        // Handle image uploads
        if ($request->hasFile('images')) {
            // Delete old images
            if ($review->images) {
                foreach ($review->images as $imagePath) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $imagePaths[] = $path;
            }
            $validated['images'] = $imagePaths;
        }

        $review->update($validated);

        return redirect()->route('reviews.show', $review)
            ->with('success', 'Review updated successfully!');
    }

    /**
     * Remove the specified review.
     */
    public function destroy(Review $review)
    {
        $this->authorize('delete', $review);

        // Delete associated images
        if ($review->images) {
            foreach ($review->images as $imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $review->delete();

        return redirect()->route('reviews.index')
            ->with('success', 'Review deleted successfully!');
    }

    /**
     * Get reviews for a specific reviewable (Agency or Destination).
     */
    public function getReviewsFor(Request $request, string $type, string $id)
    {
        $reviewableClass = match ($type) {
            'agencies' => Agency::class,
            'destinations' => Destination::class,
            default => null
        };

        if (!$reviewableClass) {
            return response()->json(['error' => 'Invalid reviewable type'], 400);
        }

        $reviewable = $reviewableClass::find($id);
        if (!$reviewable) {
            return response()->json(['error' => 'Item not found'], 404);
        }

        $query = $reviewable->reviews()->with(['user:id,name'])->approved();

        // Sort options
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'oldest':
                $query->oldest();
                break;
            case 'rating_high':
                $query->orderBy('rating', 'desc');
                break;
            case 'rating_low':
                $query->orderBy('rating', 'asc');
                break;
            default:
                $query->latest();
        }

        // Filter by rating
        if ($request->filled('rating')) {
            $query->byRating($request->rating);
        }

        $reviews = $query->paginate(10)->withQueryString();

        return response()->json([
            'reviews' => $reviews,
            'stats' => [
                'total' => $reviewable->review_count,
                'average' => $reviewable->average_rating,
                'distribution' => $reviewable->rating_distribution,
            ]
        ]);
    }

    /**
     * Toggle review approval status (Admin only).
     */
    public function toggleApproval(Review $review)
    {
        $this->authorize('update', $review);

        $review->update(['is_approved' => !$review->is_approved]);

        return response()->json([
            'success' => true,
            'is_approved' => $review->is_approved,
            'message' => $review->is_approved ? 'Review approved' : 'Review unapproved'
        ]);
    }

    /**
     * Mark review as verified purchase (Admin only).
     */
    public function markVerified(Review $review)
    {
        $this->authorize('update', $review);

        $review->update(['verified_purchase' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Review marked as verified purchase'
        ]);
    }

    /**
     * Get user's own reviews.
     */
    public function myReviews(Request $request): Response
    {
        $query = Auth::user()->reviews()
            ->with(['reviewable'])
            ->latest();

        // Filter by reviewable type
        if ($request->filled('type')) {
            if ($request->type === 'agencies') {
                $query->forAgencies();
            } elseif ($request->type === 'destinations') {
                $query->forDestinations();
            }
        }

        $reviews = $query->paginate(10)->withQueryString();

        return Inertia::render('reviews/my-reviews', [
            'reviews' => $reviews,
            'filters' => $request->only(['type']),
            'stats' => [
                'total' => Auth::user()->reviews()->count(),
                'agencies' => Auth::user()->reviews()->forAgencies()->count(),
                'destinations' => Auth::user()->reviews()->forDestinations()->count(),
            ]
        ]);
    }
}
