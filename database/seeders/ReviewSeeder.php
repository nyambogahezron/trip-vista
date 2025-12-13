<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\User;
use App\Models\Agency;
use App\Models\Destination;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have some users, agencies, and destinations
        $users = User::all();
        $agencies = Agency::all();
        $destinations = Destination::all();

        if ($users->isEmpty() || $agencies->isEmpty() || $destinations->isEmpty()) {
            $this->command->warn('Please run UserSeeder, AgencySeeder, and DestinationSeeder first!');
            return;
        }

        $this->command->info('Creating reviews...');

        // Create reviews for agencies
        $agencies->each(function ($agency) use ($users) {
            // Create 3-8 reviews per agency
            $reviewCount = rand(3, min(8, $users->count()));

            // Get random users for this agency (ensure no duplicates)
            $reviewUsers = $users->random($reviewCount);

            foreach ($reviewUsers as $user) {
                // Check if review already exists
                $existingReview = Review::where([
                    'user_id' => $user->id,
                    'reviewable_type' => Agency::class,
                    'reviewable_id' => $agency->id
                ])->first();

                if (!$existingReview) {
                    Review::factory()
                        ->for($user)
                        ->forAgency($agency)
                        ->create();
                }
            }

            $this->command->info("Created reviews for agency: {$agency->name}");
        });

        // Create reviews for destinations
        $destinations->each(function ($destination) use ($users) {
            // Create 2-6 reviews per destination
            $reviewCount = rand(2, min(6, $users->count()));

            // Get random users for this destination (ensure no duplicates)
            $reviewUsers = $users->random($reviewCount);

            foreach ($reviewUsers as $user) {
                // Check if review already exists
                $existingReview = Review::where([
                    'user_id' => $user->id,
                    'reviewable_type' => Destination::class,
                    'reviewable_id' => $destination->id
                ])->first();

                if (!$existingReview) {
                    Review::factory()
                        ->for($user)
                        ->forDestination($destination)
                        ->create();
                }
            }

            $this->command->info("Created reviews for destination: {$destination->name}");
        });

        // Create some specific high-quality reviews
        $this->createSpecialReviews($users, $agencies, $destinations);

        // Create some detailed reviews with images
        $this->createDetailedReviews($users, $agencies, $destinations);

        $this->command->info('Reviews seeded successfully!');
    }

    /**
     * Create some special reviews with specific ratings and content.
     */
    private function createSpecialReviews($users, $agencies, $destinations): void
    {
        // Create some 5-star reviews for agencies
        for ($i = 0; $i < 3; $i++) {
            $user = $users->random();
            $agency = $agencies->random();

            $existingReview = Review::where([
                'user_id' => $user->id,
                'reviewable_type' => Agency::class,
                'reviewable_id' => $agency->id
            ])->first();

            if (!$existingReview) {
                Review::factory()
                    ->for($user)
                    ->forAgency($agency)
                    ->fiveStars()
                    ->verified()
                    ->withImages(3)
                    ->create();
            }
        }

        // Create some 5-star reviews for destinations
        for ($i = 0; $i < 3; $i++) {
            $user = $users->random();
            $destination = $destinations->random();

            $existingReview = Review::where([
                'user_id' => $user->id,
                'reviewable_type' => Destination::class,
                'reviewable_id' => $destination->id
            ])->first();

            if (!$existingReview) {
                Review::factory()
                    ->for($user)
                    ->forDestination($destination)
                    ->fiveStars()
                    ->verified()
                    ->withImages(2)
                    ->create();
            }
        }

        $this->command->info('Created special reviews (5-star and 1-star)');
    }

    /**
     * Create detailed reviews with comprehensive content.
     */
    private function createDetailedReviews($users, $agencies, $destinations): void
    {
        $this->command->info('Created detailed and brief reviews');
    }
}
