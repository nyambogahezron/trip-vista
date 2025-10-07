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
            'name' => $this->faker->unique()->sentence(2) . ' ' . $this->faker->randomElement(['Tour', 'Adventure', 'Experience', 'Journey', 'Escape']) . ' ' . $this->faker->numberBetween(1000, 9999),
            'description' => $this->faker->paragraph(4),
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'featured_image' => 'https://images.unsplash.com/photo-' . $this->faker->randomElement([
                '1506905925346-21bda4d32df4', // beach
                '1544735716-392fe2489ffa', // mountain
                '1515542622106-78bda8ba0e5b', // historical
                '1537953773345-d172ccf13cf1', // bali
                '1587595431973-160d0d94add1', // machu picchu
                '1516426122078-c23e76319801', // safari
                '1544551763-46a013bb70d5', // forest
                '1496442226666-8d4d0e62e6e9', // city
                '1540959733332-eab4deabeeaf', // tokyo
                '1559827260-dc66d52bef19', // patagonia
                '1541963463532-d68292c34d19', // nature
                '1469474968437-35cbeaf5b33f'  // adventure
            ]) . '?w=800&h=600&fit=crop',
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
            // Bookings will be created by the BookingSeeder to avoid conflicts
            // if (rand(1, 10) > 3) { // 70% chance of having bookings
            //     \App\Models\Booking::factory(rand(1, 5))->create([
            //         'destination_id' => $destination->id,
            //         'agency_id' => $destination->agency_id,
            //     ]);
            // }
        });
    }
}
