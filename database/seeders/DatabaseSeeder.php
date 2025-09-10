<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🌱 Starting database seeding...');

        // Create admin user
        $this->command->info('👤 Creating admin user...');
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@tripvista.com',
            'password' => Hash::make('password'),
            // 'is_admin' => true, // Uncomment if you add is_admin field to users table
        ]);

        // Create test user
        $this->command->info('👤 Creating test user...');
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        // Create additional users
        $this->command->info('👥 Creating additional users...');
        User::factory(15)->create();

        // Seed agencies
        $this->command->info('🏢 Seeding travel agencies...');
        $this->call(AgencySeeder::class);

        // Seed destinations
        $this->command->info('🏝️ Seeding destinations...');
        $this->call(DestinationSeeder::class);

        // Seed bookings
        $this->command->info('📅 Seeding bookings...');
        $this->call(BookingSeeder::class);

        // Seed notifications
        $this->command->info('🔔 Seeding notifications...');
        $this->call(NotificationSeeder::class);

        $this->command->info('✅ Database seeding completed successfully!');
        $this->command->line('');
        $this->command->line('🔑 Login credentials:');
        $this->command->line('   Admin: admin@tripvista.com / password');
        $this->command->line('   User:  test@example.com / password');
        $this->command->line('');
        $this->command->info('🚀 Your Trip Vista application is ready to go!');
    }
}
