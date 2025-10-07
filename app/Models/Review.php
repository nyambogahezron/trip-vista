<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'reviewable_id',
        'reviewable_type',
        'rating',
        'comment',
        'images',
        'verified_purchase',
        'is_approved',
    ];

    protected $casts = [
        'images' => 'array',
        'verified_purchase' => 'boolean',
        'is_approved' => 'boolean',
        'rating' => 'integer',
    ];

    /**
     * Get the reviewable model (Agency or Destination).
     */
    public function reviewable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the user who wrote the review.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to get approved reviews only.
     */
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    /**
     * Scope to get verified purchase reviews only.
     */
    public function scopeVerified($query)
    {
        return $query->where('verified_purchase', true);
    }

    /**
     * Scope to filter by rating.
     */
    public function scopeByRating($query, int $rating)
    {
        return $query->where('rating', $rating);
    }

    /**
     * Scope to get reviews for a specific reviewable type.
     */
    public function scopeForType($query, string $type)
    {
        return $query->where('reviewable_type', $type);
    }

    /**
     * Get reviews for agencies.
     */
    public function scopeForAgencies($query)
    {
        return $query->forType(Agency::class);
    }

    /**
     * Get reviews for destinations.
     */
    public function scopeForDestinations($query)
    {
        return $query->forType(Destination::class);
    }

    /**
     * Check if the review has images.
     */
    public function hasImages(): bool
    {
        return !empty($this->images);
    }

    /**
     * Get the full star rating (can be used for display).
     */
    public function getStarsAttribute(): string
    {
        return str_repeat('⭐', $this->rating) . str_repeat('☆', 5 - $this->rating);
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Update the reviewable's rating when a review is created/updated/deleted
        static::created(function ($review) {
            $review->updateReviewableRating();
        });

        static::updated(function ($review) {
            $review->updateReviewableRating();
        });

        static::deleted(function ($review) {
            $review->updateReviewableRating();
        });
    }

    /**
     * Update the average rating of the reviewable model.
     */
    private function updateReviewableRating(): void
    {
        if ($this->reviewable) {
            $averageRating = $this->reviewable
                ->reviews()
                ->approved()
                ->avg('rating');

            $this->reviewable->update([
                'rating' => $averageRating ? round($averageRating, 2) : null
            ]);
        }
    }
}
