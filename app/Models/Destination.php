<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Destination extends Model
{
    /** @use HasFactory<\Database\Factories\DestinationFactory> */
    use HasFactory;

    protected $fillable = [
        'agency_id',
        'name',
        'description',
        'long_description',
        'location',
        'country',
        'featured_image',
        'category',
        'rating',
        'price',
        'activities',
        'weather_info',
        'best_time_to_visit',
        'temperature_ranges',
        'duration_days',
        'max_group_size',
        'included_services',
        'photo_gallery',
        'is_featured',
        'difficulty_level',
    ];

    protected $casts = [
        'activities' => 'array',
        'weather_info' => 'array',
        'best_time_to_visit' => 'array',
        'temperature_ranges' => 'array',
        'included_services' => 'array',
        'photo_gallery' => 'array',
        'rating' => 'decimal:2',
        'price' => 'decimal:2',
        'duration_days' => 'integer',
        'max_group_size' => 'integer',
        'is_featured' => 'boolean',
    ];

    /**
     * Get the agency that owns the destination.
     */
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    /**
     * Get the bookings for the destination.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get all of the destination's reviews.
     */
    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    /**
     * Get approved reviews for the destination.
     */
    public function approvedReviews(): MorphMany
    {
        return $this->reviews()->approved();
    }

    /**
     * Get the average rating for the destination.
     */
    public function getAverageRatingAttribute(): float
    {
        return $this->approvedReviews()->avg('rating') ?? 0;
    }

    /**
     * Get the total review count for the destination.
     */
    public function getReviewCountAttribute(): int
    {
        return $this->approvedReviews()->count();
    }

    /**
     * Get the rating distribution for the destination.
     */
    public function getRatingDistributionAttribute(): array
    {
        $distribution = [];
        for ($i = 1; $i <= 5; $i++) {
            $distribution[$i] = $this->approvedReviews()->where('rating', $i)->count();
        }
        return $distribution;
    }

    /**
     * Get the total bookings count.
     */
    public function getTotalBookingsAttribute(): int
    {
        return $this->bookings()->count();
    }

    /**
     * Scope a query to only include destinations by category.
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to only include destinations within price range.
     */
    public function scopeByPriceRange($query, $minPrice, $maxPrice)
    {
        return $query->whereBetween('price', [$minPrice, $maxPrice]);
    }

    /**
     * Scope a query to search destinations.
     */
    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'like', "%{$search}%")
            ->orWhere('location', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%")
            ->orWhere('category', 'like', "%{$search}%");
    }

    /**
     * Scope a query to only include popular destinations.
     */
    public function scopePopular($query)
    {
        return $query->withCount('bookings')
            ->orderBy('bookings_count', 'desc');
    }
}
