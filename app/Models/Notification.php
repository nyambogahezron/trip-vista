<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    /** @use HasFactory<\Database\Factories\NotificationFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'message',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    const TYPE_BOOKING_CONFIRMATION = 'booking_confirmation';
    const TYPE_BOOKING_REMINDER = 'booking_reminder';
    const TYPE_BOOKING_CANCELLATION = 'booking_cancellation';
    const TYPE_PAYMENT_CONFIRMATION = 'payment_confirmation';
    const TYPE_SYSTEM_UPDATE = 'system_update';
    const TYPE_PROMOTIONAL = 'promotional';

    /**
     * Get the user that owns the notification.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include unread notifications.
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Scope a query to only include read notifications.
     */
    public function scopeRead($query)
    {
        return $query->where('is_read', true);
    }

    /**
     * Scope a query to only include notifications by type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Mark the notification as read.
     */
    public function markAsRead(): bool
    {
        return $this->update(['is_read' => true]);
    }

    /**
     * Mark the notification as unread.
     */
    public function markAsUnread(): bool
    {
        return $this->update(['is_read' => false]);
    }

    /**
     * Get the notification icon based on type.
     */
    public function getIconAttribute(): string
    {
        return match ($this->type) {
            self::TYPE_BOOKING_CONFIRMATION => 'check-circle',
            self::TYPE_BOOKING_REMINDER => 'clock',
            self::TYPE_BOOKING_CANCELLATION => 'x-circle',
            self::TYPE_PAYMENT_CONFIRMATION => 'credit-card',
            self::TYPE_SYSTEM_UPDATE => 'info',
            self::TYPE_PROMOTIONAL => 'tag',
            default => 'bell',
        };
    }

    /**
     * Get the notification color based on type.
     */
    public function getColorAttribute(): string
    {
        return match ($this->type) {
            self::TYPE_BOOKING_CONFIRMATION => 'success',
            self::TYPE_BOOKING_REMINDER => 'warning',
            self::TYPE_BOOKING_CANCELLATION => 'danger',
            self::TYPE_PAYMENT_CONFIRMATION => 'info',
            self::TYPE_SYSTEM_UPDATE => 'primary',
            self::TYPE_PROMOTIONAL => 'secondary',
            default => 'dark',
        };
    }
}
