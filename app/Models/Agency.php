<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agency extends Model
{
    /** @use HasFactory<\Database\Factories\AgencyFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'logo',
        'description',
        'email',
        'phone',
        'address',
        'website',
        'social_media',
        'rating',
        'location',
        'featured_image',
    ];

    protected $casts = [
        'social_media' => 'array',
        'rating' => 'decimal:2',
    ];

    /**
     * Get the destinations for the agency.
     */
    public function destinations(): HasMany
    {
        return $this->hasMany(Destination::class);
    }

    /**
     * Get the bookings for the agency.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the average rating for the agency.
     */
    public function getAverageRatingAttribute(): float
    {
        return $this->bookings()->avg('rating') ?? 0;
    }

    /**
     * Scope a query to only include featured agencies.
     */
    public function scopeFeatured($query)
    {
        return $query->where('rating', '>=', 4.0);
    }

    /**
     * Scope a query to search agencies by name or location.
     */
    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'like', "%{$search}%")
            ->orWhere('location', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%");
    }
}
