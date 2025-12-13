<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = [
            'booking_confirmation',
            'booking_reminder',
            'booking_cancellation',
            'payment_confirmation',
            'system_update',
            'promotional',
        ];

        $type = $this->faker->randomElement($types);

        return [
            'user_id' => User::factory(),
            'type' => $type,
            'message' => $this->getMessageByType($type),
            'is_read' => $this->faker->boolean(30), // 30% chance of being read
        ];
    }

    /**
     * Generate message based on notification type.
     */
    private function getMessageByType(string $type): string
    {
        return match ($type) {
            'booking_confirmation' => $this->faker->randomElement([
                'Your booking has been confirmed! Get ready for an amazing trip.',
                'Great news! Your travel booking is now confirmed.',
                'Booking confirmed! We look forward to serving you.',
            ]),
            'booking_reminder' => $this->faker->randomElement([
                'Reminder: Your trip is coming up in 3 days!',
                'Don\'t forget! Your travel date is approaching.',
                'Trip reminder: Pack your bags, adventure awaits!',
            ]),
            'booking_cancellation' => $this->faker->randomElement([
                'Your booking has been cancelled. We\'re sorry for any inconvenience.',
                'Booking cancellation confirmed. Refund will be processed shortly.',
                'Your trip has been cancelled due to unforeseen circumstances.',
            ]),
            'payment_confirmation' => $this->faker->randomElement([
                'Payment received! Your booking is now fully paid.',
                'Thank you for your payment. Receipt has been sent to your email.',
                'Payment confirmed. You\'re all set for your trip!',
            ]),
            'system_update' => $this->faker->randomElement([
                'System maintenance scheduled for tonight. Some features may be unavailable.',
                'New features added! Check out our latest updates.',
                'Important: Updated terms and conditions available.',
            ]),
            'promotional' => $this->faker->randomElement([
                'Special offer: 20% off on all beach destinations this month!',
                'Limited time: Early bird discount on summer packages.',
                'New destinations added! Explore our latest travel options.',
            ]),
            default => $this->faker->sentence(),
        };
    }

    /**
     * Indicate that the notification is unread.
     */
    public function unread(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_read' => false,
        ]);
    }

    /**
     * Indicate that the notification is read.
     */
    public function read(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_read' => true,
        ]);
    }

    /**
     * Set a specific type.
     */
    public function type(string $type): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => $type,
            'message' => $this->getMessageByType($type),
        ]);
    }

    /**
     * Indicate that the notification is for a specific user.
     */
    public function forUser(User $user): static
    {
        return $this->state(fn(array $attributes) => [
            'user_id' => $user->id,
        ]);
    }

    /**
     * Create a booking confirmation notification.
     */
    public function bookingConfirmation(): static
    {
        return $this->type('booking_confirmation');
    }

    /**
     * Create a booking reminder notification.
     */
    public function bookingReminder(): static
    {
        return $this->type('booking_reminder');
    }

    /**
     * Create a payment confirmation notification.
     */
    public function paymentConfirmation(): static
    {
        return $this->type('payment_confirmation');
    }

    /**
     * Create a promotional notification.
     */
    public function promotional(): static
    {
        return $this->type('promotional');
    }
}
