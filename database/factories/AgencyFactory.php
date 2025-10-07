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
        $specialtiesOptions = [
            'Adventure Travel',
            'Luxury Travel',
            'Cultural Tours',
            'Eco Tourism',
            'Family Travel',
            'Budget Travel',
            'Business Travel',
            'Honeymoon Packages',
            'Group Tours',
            'Solo Travel',
            'Extreme Sports',
            'Wildlife Safari',
            'Beach Destinations',
            'Mountain Expeditions',
            'City Tours',
            'Food & Wine Tours',
            'Photography Tours',
            'Wellness Retreats'
        ];

        $locationOptions = [
            ['Paris', 'Lyon', 'Marseille', 'Nice', 'Bordeaux'],
            ['London', 'Manchester', 'Edinburgh', 'Liverpool', 'Bath'],
            ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco'],
            ['Tokyo', 'Osaka', 'Kyoto', 'Hiroshima', 'Nara'],
            ['Rome', 'Milan', 'Venice', 'Florence', 'Naples'],
            ['Barcelona', 'Madrid', 'Seville', 'Valencia', 'Granada'],
            ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
            ['Sydney', 'Melbourne', 'Perth', 'Brisbane', 'Adelaide'],
        ];

        $selectedLocations = $this->faker->randomElement($locationOptions);
        $selectedSpecialties = $this->faker->randomElements($specialtiesOptions, $this->faker->numberBetween(2, 5));
        $foundedYear = $this->faker->numberBetween(2000, 2020);

        return [
            'name' => $this->faker->company() . ' Travel Agency',
            'description' => $this->faker->paragraph(3),
            'email' => $this->faker->unique()->companyEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'website' => $this->faker->domainName(),
            'social_media' => [
                'facebook' => 'https://facebook.com/' . $this->faker->userName(),
                'twitter' => 'https://twitter.com/' . $this->faker->userName(),
                'instagram' => 'https://instagram.com/' . $this->faker->userName(),
            ],
            'rating' => $this->faker->randomFloat(1, 3.0, 5.0),
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'founded_year' => $foundedYear,
            'specialties' => $selectedSpecialties,
            'locations' => $selectedLocations,
            'review_count' => $this->faker->numberBetween(50, 2000),
            'is_featured' => $this->faker->boolean(30), // 30% chance of being featured
            'logo' => 'https://images.unsplash.com/photo-' . $this->faker->randomElement([
                '1472099645785-5658abf4ff4e',
                '1507003211169-0a1dd7228f2d',
                '1506905925346-21bda4d32df4',
                '1560250097-0b93528c311a',
                '1500648767791-00dcc994a43e'
            ]) . '?w=400&h=400&fit=crop&crop=face',
            'featured_image' => 'https://images.unsplash.com/photo-' . $this->faker->randomElement([
                '1551632811-561732d1e306',
                '1506905925346-21bda4d32df4',
                '1539650116574-75c0c6d73df5',
                '1444723121867-7a241cacace9',
                '1547036967-23d11aacaee0'
            ]) . '?w=800&h=600&fit=crop',
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
            // Destinations will be created by the DestinationSeeder to avoid conflicts
            // \App\Models\Destination::factory(rand(3, 8))->create([
            //     'agency_id' => $agency->id,
            // ]);
        });
    }
}
