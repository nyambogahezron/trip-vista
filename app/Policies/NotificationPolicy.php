<?php

namespace App\Policies;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class NotificationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Users can view their own notifications
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Notification $notification): bool
    {
        return $user->is_admin || $notification->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->is_admin ?? false; // Only admins can create notifications
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Notification $notification): bool
    {
        // Users can mark their own notifications as read/unread, admins can update any
        return $user->is_admin || $notification->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Notification $notification): bool
    {
        // Users can delete their own notifications, admins can delete any
        return $user->is_admin || $notification->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Notification $notification): bool
    {
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Notification $notification): bool
    {
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can mark the notification as read.
     */
    public function markAsRead(User $user, Notification $notification): bool
    {
        return $user->is_admin || $notification->user_id === $user->id;
    }

    /**
     * Determine whether the user can mark the notification as unread.
     */
    public function markAsUnread(User $user, Notification $notification): bool
    {
        return $user->is_admin || $notification->user_id === $user->id;
    }

    /**
     * Determine whether the user can broadcast notifications.
     */
    public function broadcast(User $user): bool
    {
        return $user->is_admin ?? false;
    }
}
