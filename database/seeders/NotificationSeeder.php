<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Notification;
use App\Models\Booking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->warn('No users found. Creating test users...');
            User::factory(10)->create();
            $users = User::all();
        }

        // Create notifications for each user
        foreach ($users as $user) {
            // Create booking-related notifications if user has bookings
            $userBookings = Booking::where('user_id', $user->id)->get();

            if ($userBookings->isNotEmpty()) {
                foreach ($userBookings->take(2) as $booking) {
                    // Booking confirmation notification
                    Notification::factory()
                        ->bookingConfirmation()
                        ->forUser($user)
                        ->create([
                            'message' => "Your booking for {$booking->destination->name} has been confirmed!",
                        ]);

                    // Random chance for other booking-related notifications
                    if (rand(1, 10) > 6) {
                        Notification::factory()
                            ->paymentConfirmation()
                            ->forUser($user)
                            ->create([
                                'message' => "Payment confirmed for your booking of {$booking->destination->name}.",
                            ]);
                    }

                    if (rand(1, 10) > 8) {
                        Notification::factory()
                            ->bookingReminder()
                            ->forUser($user)
                            ->unread()
                            ->create([
                                'message' => "Reminder: Your trip to {$booking->destination->name} is coming up soon!",
                            ]);
                    }
                }
            }

            // Create general notifications
            $generalNotificationCount = rand(2, 5);
            for ($i = 0; $i < $generalNotificationCount; $i++) {
                $notificationType = $this->getRandomNotificationType();

                Notification::factory()
                    ->type($notificationType)
                    ->forUser($user)
                    ->create([
                        'is_read' => rand(1, 10) > 3, // 70% chance of being read
                    ]);
            }

            // Create some unread notifications for active engagement
            Notification::factory(rand(1, 3))
                ->unread()
                ->forUser($user)
                ->create();
        }

        // Create system-wide promotional notifications
        $systemNotifications = [
            [
                'type' => 'promotional',
                'message' => '🌟 Summer Sale: Up to 40% off on all beach destinations! Book now and save big on your next tropical getaway.',
            ],
            [
                'type' => 'system_update',
                'message' => '🔧 We\'ve updated our mobile app with new features! Update now for the best booking experience.',
            ],
            [
                'type' => 'promotional',
                'message' => '🏔️ New Adventure Packages Available! Explore our latest mountain trekking and adventure sports packages.',
            ],
            [
                'type' => 'system_update',
                'message' => '💳 New Payment Methods: We now accept digital wallets and cryptocurrency for bookings!',
            ],
        ];

        // Send system notifications to all users
        foreach ($systemNotifications as $notificationData) {
            foreach ($users->take(rand(5, $users->count())) as $user) {
                Notification::create([
                    'user_id' => $user->id,
                    'type' => $notificationData['type'],
                    'message' => $notificationData['message'],
                    'is_read' => rand(1, 10) > 7, // 30% chance of being read
                ]);
            }
        }

        // Create some recent notifications for real-time feel
        foreach ($users->take(5) as $user) {
            Notification::factory()
                ->unread()
                ->forUser($user)
                ->create([
                    'created_at' => now()->subMinutes(rand(5, 60)),
                    'updated_at' => now()->subMinutes(rand(5, 60)),
                ]);
        }
    }

    /**
     * Get a random notification type based on realistic distribution.
     */
    private function getRandomNotificationType(): string
    {
        $types = [
            'booking_confirmation' => 25,
            'booking_reminder' => 20,
            'payment_confirmation' => 20,
            'promotional' => 20,
            'system_update' => 10,
            'booking_cancellation' => 5,
        ];

        $total = array_sum($types);
        $random = rand(1, $total);
        $sum = 0;

        foreach ($types as $type => $weight) {
            $sum += $weight;
            if ($random <= $sum) {
                return $type;
            }
        }

        return 'system_update';
    }
}
