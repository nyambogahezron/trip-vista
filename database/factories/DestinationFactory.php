<?php

namespace Database\Factories;

use App\Models\Agency;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Destination>
 */
class DestinationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Adventure', 'Beach', 'Cultural', 'Historical', 'Nature', 'Urban', 'Mountain', 'Wildlife'];
        $activities = [
            'Hiking',
            'Swimming',
            'Sightseeing',
            'Photography',
            'Cultural Tours',
            'Food Tours',
            'Adventure Sports',
            'Wildlife Watching',
            'Beach Activities',
            'Historical Tours',
            'Shopping',
            'Local Markets',
            'Sunset Viewing'
        ];

        return [
            'agency_id' => Agency::factory(),
            'name' => $this->faker->city() . ' ' . $this->faker->randomElement(['Paradise', 'Adventure', 'Experience', 'Gateway', 'Discovery']),
            'description' => $this->faker->paragraph(4),
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'featured_image' => null, // Will be set manually or by seeder if needed
            'category' => $this->faker->randomElement($categories),
            'rating' => $this->faker->randomFloat(1, 3.5, 5.0),
            'price' => $this->faker->randomFloat(2, 50.00, 2000.00),
            'activities' => $this->faker->randomElements($activities, rand(3, 6)),
        ];
    }

    /**
     * Indicate that the destination is popular.
     */
    public function popular(): static
    {
        return $this->state(fn(array $attributes) => [
            'rating' => $this->faker->randomFloat(1, 4.5, 5.0),
            'price' => $this->faker->randomFloat(2, 200.00, 1500.00),
        ]);
    }

    /**
     * Indicate that the destination is budget-friendly.
     */
    public function budget(): static
    {
        return $this->state(fn(array $attributes) => [
            'price' => $this->faker->randomFloat(2, 50.00, 300.00),
        ]);
    }

    /**
     * Indicate that the destination is luxury.
     */
    public function luxury(): static
    {
        return $this->state(fn(array $attributes) => [
            'price' => $this->faker->randomFloat(2, 1000.00, 5000.00),
            'rating' => $this->faker->randomFloat(1, 4.0, 5.0),
        ]);
    }

    /**
     * Set a specific category.
     */
    public function category(string $category): static
    {
        return $this->state(fn(array $attributes) => [
            'category' => $category,
        ]);
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (\App\Models\Destination $destination) {
            // Create some bookings for this destination
            if (rand(1, 10) > 3) { // 70% chance of having bookings
                \App\Models\Booking::factory(rand(1, 5))->create([
                    'destination_id' => $destination->id,
                    'agency_id' => $destination->agency_id,
                ]);
            }
        });
    }
}
