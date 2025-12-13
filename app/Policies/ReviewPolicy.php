<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ReviewPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Anyone can view reviews
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Review $review): bool
    {
        // Anyone can view approved reviews, only owner can view unapproved
        return $review->is_approved || $user->id === $review->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // Any authenticated user can create reviews
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Review $review): bool
    {
        // Users can only update their own reviews
        return $user->id === $review->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Review $review): bool
    {
        // Users can only delete their own reviews
        return $user->id === $review->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Review $review): bool
    {
        // Only the owner can restore their own reviews
        return $user->id === $review->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Review $review): bool
    {
        // Only the owner can permanently delete their own reviews
        return $user->id === $review->user_id;
    }

    /**
     * Determine whether the user can approve/unapprove reviews.
     */
    public function approve(User $user, Review $review): bool
    {
        // For now, only the owner can toggle approval
        // In a real app, you might have admin roles
        return $user->id === $review->user_id;
    }

    /**
     * Determine whether the user can mark review as verified purchase.
     */
    public function verify(User $user, Review $review): bool
    {
        // For now, only the owner can verify
        // In a real app, this might be based on actual purchase history
        return $user->id === $review->user_id;
    }
}
