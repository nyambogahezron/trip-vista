<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Destination;
use App\Models\Booking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $destinations = Destination::with('agency')->get();

        if ($users->isEmpty()) {
            $this->command->warn('No users found. Creating test users...');
            User::factory(10)->create();
            $users = User::all();
        }

        if ($destinations->isEmpty()) {
            $this->command->warn('No destinations found. Running DestinationSeeder first...');
            $this->call([AgencySeeder::class, DestinationSeeder::class]);
            $destinations = Destination::with('agency')->get();
        }

        // Create bookings with different statuses
        foreach ($users as $user) {
            $userBookingCount = rand(1, 4);

            for ($i = 0; $i < $userBookingCount; $i++) {
                $destination = $destinations->random();

                // Create booking with random status distribution
                $statusDistribution = [
                    Booking::STATUS_PENDING => 20,      // 20%
                    Booking::STATUS_CONFIRMED => 40,    // 40%
                    Booking::STATUS_COMPLETED => 30,    // 30%
                    Booking::STATUS_CANCELLED => 10,    // 10%
                ];

                $status = $this->weightedRandom($statusDistribution);

                $booking = Booking::factory()
                    ->forUser($user)
                    ->forDestination($destination)
                    ->create([
                        'status' => $status,
                        'payment_status' => $this->getPaymentStatusForBookingStatus($status),
                    ]);
            }
        }

        // Create some specific booking scenarios
        if ($users->count() > 0 && $destinations->count() > 0) {
            $firstUser = $users->first();
            $popularDestination = $destinations->first();

            // Create upcoming confirmed bookings
            Booking::factory(3)
                ->upcoming()
                ->confirmed()
                ->paid()
                ->forUser($firstUser)
                ->create([
                    'destination_id' => $destinations->random()->id,
                    'agency_id' => $destinations->random()->agency_id,
                ]);

            // Create past completed bookings
            Booking::factory(2)
                ->completed()
                ->forUser($firstUser)
                ->create([
                    'destination_id' => $destinations->random()->id,
                    'agency_id' => $destinations->random()->agency_id,
                ]);

            // Create pending bookings waiting for confirmation
            Booking::factory(2)
                ->pending()
                ->create([
                    'user_id' => $users->random()->id,
                    'destination_id' => $destinations->random()->id,
                    'agency_id' => $destinations->random()->agency_id,
                ]);
        }
    }

    /**
     * Get weighted random value based on distribution.
     */
    private function weightedRandom(array $distribution): string
    {
        $total = array_sum($distribution);
        $random = rand(1, $total);
        $sum = 0;

        foreach ($distribution as $status => $weight) {
            $sum += $weight;
            if ($random <= $sum) {
                return $status;
            }
        }

        return array_key_first($distribution);
    }

    /**
     * Get appropriate payment status based on booking status.
     */
    private function getPaymentStatusForBookingStatus(string $bookingStatus): string
    {
        return match ($bookingStatus) {
            Booking::STATUS_PENDING => rand(1, 10) > 7 ? Booking::PAYMENT_STATUS_PAID : Booking::PAYMENT_STATUS_UNPAID,
            Booking::STATUS_CONFIRMED => rand(1, 10) > 3 ? Booking::PAYMENT_STATUS_PAID : Booking::PAYMENT_STATUS_UNPAID,
            Booking::STATUS_COMPLETED => Booking::PAYMENT_STATUS_PAID,
            Booking::STATUS_CANCELLED => rand(1, 10) > 5 ? Booking::PAYMENT_STATUS_REFUNDED : Booking::PAYMENT_STATUS_UNPAID,
            default => Booking::PAYMENT_STATUS_UNPAID,
        };
    }
}
