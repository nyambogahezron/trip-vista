<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\User;
use App\Models\Agency;
use App\Models\Destination;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    protected $model = Review::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Randomly choose between Agency and Destination
        $reviewableType = $this->faker->randomElement([Agency::class, Destination::class]);

        return [
            'user_id' => User::factory(),
            'reviewable_type' => $reviewableType,
            'reviewable_id' => function (array $attributes) use ($reviewableType) {
                return $reviewableType === Agency::class
                    ? Agency::factory()->create()->id
                    : Destination::factory()->create()->id;
            },
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->paragraph(3),
            'images' => $this->faker->boolean(30) ? [ // 30% chance of having images
                'reviews/' . $this->faker->uuid() . '.jpg',
                'reviews/' . $this->faker->uuid() . '.jpg',
            ] : null,
            'verified_purchase' => $this->faker->boolean(70), // 70% chance of verified purchase
            'is_approved' => $this->faker->boolean(95), // 95% chance of approval
        ];
    }

    /**
     * Create a review for a specific reviewable model.
     */
    public function forReviewable($reviewable): static
    {
        return $this->state([
            'reviewable_type' => get_class($reviewable),
            'reviewable_id' => $reviewable->id,
        ]);
    }

    /**
     * Create a review for an agency.
     */
    public function forAgency($agency = null): static
    {
        return $this->state([
            'reviewable_type' => Agency::class,
            'reviewable_id' => $agency ? $agency->id : Agency::factory(),
        ]);
    }

    /**
     * Create a review for a destination.
     */
    public function forDestination($destination = null): static
    {
        return $this->state([
            'reviewable_type' => Destination::class,
            'reviewable_id' => $destination ? $destination->id : Destination::factory(),
        ]);
    }

    /**
     * Create a review with a specific rating.
     */
    public function rating(int $rating): static
    {
        return $this->state([
            'rating' => $rating,
        ]);
    }

    /**
     * Create a 5-star review.
     */
    public function fiveStars(): static
    {
        return $this->state([
            'rating' => 5,
            'comment' => $this->faker->randomElement([
                'Absolutely amazing experience! Highly recommend to everyone.',
                'Perfect in every way. Exceeded all my expectations.',
                'Outstanding service and quality. Will definitely return!',
                'Best experience ever! Everything was flawless.',
                'Incredible! Worth every penny and more.',
            ]),
        ]);
    }

    /**
     * Create a 1-star review.
     */
    public function oneStar(): static
    {
        return $this->state([
            'rating' => 1,
            'comment' => $this->faker->randomElement([
                'Terrible experience. Would not recommend to anyone.',
                'Very disappointed. Nothing went as expected.',
                'Poor service and quality. Waste of money.',
                'Awful! Everything was wrong from start to finish.',
                'Completely unsatisfied. Worst experience ever.',
            ]),
        ]);
    }

    /**
     * Create an approved review.
     */
    public function approved(): static
    {
        return $this->state([
            'is_approved' => true,
        ]);
    }

    /**
     * Create an unapproved review.
     */
    public function unapproved(): static
    {
        return $this->state([
            'is_approved' => false,
        ]);
    }

    /**
     * Create a verified purchase review.
     */
    public function verified(): static
    {
        return $this->state([
            'verified_purchase' => true,
        ]);
    }

    /**
     * Create an unverified purchase review.
     */
    public function unverified(): static
    {
        return $this->state([
            'verified_purchase' => false,
        ]);
    }

    /**
     * Create a review with images.
     */
    public function withImages(int $count = 2): static
    {
        $images = [];
        for ($i = 0; $i < $count; $i++) {
            $images[] = 'reviews/' . $this->faker->uuid() . '.jpg';
        }

        return $this->state([
            'images' => $images,
        ]);
    }

    /**
     * Create a review without images.
     */
    public function withoutImages(): static
    {
        return $this->state([
            'images' => null,
        ]);
    }

    /**
     * Create a detailed review with longer comment.
     */
    public function detailed(): static
    {
        return $this->state([
            'comment' => $this->faker->paragraphs(5, true),
        ]);
    }

    /**
     * Create a brief review with shorter comment.
     */
    public function brief(): static
    {
        return $this->state([
            'comment' => $this->faker->sentence(),
        ]);
    }
}
