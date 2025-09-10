<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Destination;
use App\Models\Agency;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bookingDate = $this->faker->dateTimeBetween('-30 days', '+5 days');
        $travelDate = $this->faker->dateTimeBetween($bookingDate, '+60 days');
        $numberOfPeople = $this->faker->numberBetween(1, 8);

        return [
            'user_id' => User::factory(),
            'destination_id' => Destination::factory(),
            'agency_id' => Agency::factory(),
            'booking_date' => $bookingDate,
            'status' => $this->faker->randomElement([
                Booking::STATUS_PENDING,
                Booking::STATUS_CONFIRMED,
                Booking::STATUS_CANCELLED,
                Booking::STATUS_COMPLETED,
            ]),
            'payment_status' => $this->faker->randomElement([
                Booking::PAYMENT_STATUS_UNPAID,
                Booking::PAYMENT_STATUS_PAID,
                Booking::PAYMENT_STATUS_REFUNDED,
            ]),
            'total_price' => $this->faker->randomFloat(2, 100.00, 3000.00),
            'number_of_people' => $numberOfPeople,
            'special_requests' => $this->faker->optional(0.3)->sentence(),
            'travel_time' => $this->faker->time('H:i'),
            'travel_date' => $travelDate,
            'contact_phone' => $this->faker->phoneNumber(),
        ];
    }

    /**
     * Indicate that the booking is pending.
     */
    public function pending(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Booking::STATUS_PENDING,
            'payment_status' => Booking::PAYMENT_STATUS_UNPAID,
        ]);
    }

    /**
     * Indicate that the booking is confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Booking::STATUS_CONFIRMED,
            'payment_status' => $this->faker->randomElement([
                Booking::PAYMENT_STATUS_PAID,
                Booking::PAYMENT_STATUS_UNPAID,
            ]),
        ]);
    }

    /**
     * Indicate that the booking is completed.
     */
    public function completed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Booking::STATUS_COMPLETED,
            'payment_status' => Booking::PAYMENT_STATUS_PAID,
            'travel_date' => $this->faker->dateTimeBetween('-60 days', '-1 day'),
        ]);
    }

    /**
     * Indicate that the booking is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Booking::STATUS_CANCELLED,
            'payment_status' => $this->faker->randomElement([
                Booking::PAYMENT_STATUS_UNPAID,
                Booking::PAYMENT_STATUS_REFUNDED,
            ]),
        ]);
    }

    /**
     * Indicate that the booking is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn(array $attributes) => [
            'travel_date' => $this->faker->dateTimeBetween('+1 day', '+60 days'),
            'status' => $this->faker->randomElement([
                Booking::STATUS_PENDING,
                Booking::STATUS_CONFIRMED,
            ]),
        ]);
    }

    /**
     * Indicate that the booking is paid.
     */
    public function paid(): static
    {
        return $this->state(fn(array $attributes) => [
            'payment_status' => Booking::PAYMENT_STATUS_PAID,
        ]);
    }

    /**
     * Indicate that the booking is for a specific user.
     */
    public function forUser(User $user): static
    {
        return $this->state(fn(array $attributes) => [
            'user_id' => $user->id,
        ]);
    }

    /**
     * Indicate that the booking is for a specific destination.
     */
    public function forDestination(Destination $destination): static
    {
        return $this->state(fn(array $attributes) => [
            'destination_id' => $destination->id,
            'agency_id' => $destination->agency_id,
        ]);
    }
}
