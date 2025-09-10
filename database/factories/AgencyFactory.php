<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agency>
 */
class AgencyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company() . ' Travel Agency',
            'description' => $this->faker->paragraph(3),
            'email' => $this->faker->unique()->companyEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'website' => $this->faker->url(),
            'social_media' => [
                'facebook' => 'https://facebook.com/' . $this->faker->userName(),
                'twitter' => 'https://twitter.com/' . $this->faker->userName(),
                'instagram' => 'https://instagram.com/' . $this->faker->userName(),
            ],
            'rating' => $this->faker->randomFloat(1, 3.0, 5.0),
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'logo' => null, // Will be set manually or by seeder if needed
            'featured_image' => null, // Will be set manually or by seeder if needed
        ];
    }

    /**
     * Indicate that the agency is highly rated.
     */
    public function highlyRated(): static
    {
        return $this->state(fn(array $attributes) => [
            'rating' => $this->faker->randomFloat(1, 4.5, 5.0),
        ]);
    }

    /**
     * Indicate that the agency is new (lower rating).
     */
    public function newAgency(): static
    {
        return $this->state(fn(array $attributes) => [
            'rating' => $this->faker->randomFloat(1, 3.0, 4.0),
        ]);
    }

    /**
     * Configure the model factory with relationships.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (\App\Models\Agency $agency) {
            // Create destinations for this agency
            \App\Models\Destination::factory(rand(3, 8))->create([
                'agency_id' => $agency->id,
            ]);
        });
    }
}
