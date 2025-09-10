<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Booking extends Model
{
    /** @use HasFactory<\Database\Factories\BookingFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'destination_id',
        'agency_id',
        'booking_date',
        'status',
        'payment_status',
        'total_price',
        'number_of_people',
        'special_requests',
        'travel_time',
        'travel_date',
        'contact_phone',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'travel_date' => 'date',
        'travel_time' => 'datetime:H:i',
        'total_price' => 'decimal:2',
        'number_of_people' => 'integer',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_COMPLETED = 'completed';

    const PAYMENT_STATUS_UNPAID = 'unpaid';
    const PAYMENT_STATUS_PAID = 'paid';
    const PAYMENT_STATUS_REFUNDED = 'refunded';

    /**
     * Get the user that owns the booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the destination that belongs to the booking.
     */
    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    /**
     * Get the agency that belongs to the booking.
     */
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    /**
     * Scope a query to only include bookings by status.
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to only include bookings by payment status.
     */
    public function scopeByPaymentStatus($query, $paymentStatus)
    {
        return $query->where('payment_status', $paymentStatus);
    }

    /**
     * Scope a query to only include upcoming bookings.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('travel_date', '>=', Carbon::now()->toDateString());
    }

    /**
     * Scope a query to only include past bookings.
     */
    public function scopePast($query)
    {
        return $query->where('travel_date', '<', Carbon::now()->toDateString());
    }

    /**
     * Get the booking status badge color.
     */
    public function getStatusBadgeColorAttribute(): string
    {
        return match ($this->status) {
            self::STATUS_PENDING => 'warning',
            self::STATUS_CONFIRMED => 'success',
            self::STATUS_CANCELLED => 'danger',
            self::STATUS_COMPLETED => 'info',
            default => 'secondary',
        };
    }

    /**
     * Get the payment status badge color.
     */
    public function getPaymentStatusBadgeColorAttribute(): string
    {
        return match ($this->payment_status) {
            self::PAYMENT_STATUS_PAID => 'success',
            self::PAYMENT_STATUS_UNPAID => 'warning',
            self::PAYMENT_STATUS_REFUNDED => 'info',
            default => 'secondary',
        };
    }

    /**
     * Check if booking can be cancelled.
     */
    public function canBeCancelled(): bool
    {
        return $this->status === self::STATUS_PENDING
            && $this->travel_date > Carbon::now()->addDays(1);
    }
}
