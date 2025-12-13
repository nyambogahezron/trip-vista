<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BookingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Users can view their own bookings, admins can view all
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Booking $booking): bool
    {
        return $user->is_admin || $booking->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // Any authenticated user can create bookings
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Booking $booking): bool
    {
        // Users can update their own bookings, admins can update any
        // But only if booking is not completed
        return ($user->is_admin || $booking->user_id === $user->id)
            && $booking->status !== Booking::STATUS_COMPLETED;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Booking $booking): bool
    {
        // Users can delete their own bookings, admins can delete any
        // But only if booking is pending or cancelled
        return ($user->is_admin || $booking->user_id === $user->id)
            && in_array($booking->status, [Booking::STATUS_PENDING, Booking::STATUS_CANCELLED]);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Booking $booking): bool
    {
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Booking $booking): bool
    {
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can cancel the booking.
     */
    public function cancel(User $user, Booking $booking): bool
    {
        return ($user->is_admin || $booking->user_id === $user->id)
            && $booking->canBeCancelled();
    }

    /**
     * Determine whether the user can confirm the booking.
     */
    public function confirm(User $user, Booking $booking): bool
    {
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can mark payment as paid.
     */
    public function markPaid(User $user, Booking $booking): bool
    {
        return $user->is_admin ?? false;
    }
}
