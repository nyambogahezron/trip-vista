<?php

namespace Database\Seeders;

use App\Models\Agency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some featured agencies with specific data
        $featuredAgencies = [
            [
                'name' => 'Adventure Seekers Travel',
                'description' => 'Specializing in thrilling outdoor adventures and extreme sports travel experiences around the world.',
                'email' => 'info@adventureseekers.com',
                'phone' => '+1-555-0101',
                'address' => '123 Adventure Ave, Mountain View, CA 94041',
                'website' => 'https://adventureseekers.com',
                'social_media' => [
                    'facebook' => 'https://facebook.com/adventureseekers',
                    'twitter' => 'https://twitter.com/adventureseekers',
                    'instagram' => 'https://instagram.com/adventureseekers',
                ],
                'rating' => 4.8,
                'location' => 'Mountain View, California',
            ],
            [
                'name' => 'Tropical Paradise Tours',
                'description' => 'Your gateway to the most beautiful tropical destinations, beaches, and island getaways worldwide.',
                'email' => 'bookings@tropicalparadise.com',
                'phone' => '+1-555-0202',
                'address' => '456 Beach Blvd, Miami, FL 33139',
                'website' => 'https://tropicalparadise.com',
                'social_media' => [
                    'facebook' => 'https://facebook.com/tropicalparadise',
                    'twitter' => 'https://twitter.com/tropicalparadise',
                    'instagram' => 'https://instagram.com/tropicalparadise',
                ],
                'rating' => 4.9,
                'location' => 'Miami, Florida',
            ],
            [
                'name' => 'Cultural Heritage Expeditions',
                'description' => 'Immerse yourself in rich cultures and historical sites with our expertly guided cultural tours.',
                'email' => 'explore@culturalheritage.com',
                'phone' => '+1-555-0303',
                'address' => '789 History Lane, Boston, MA 02108',
                'website' => 'https://culturalheritage.com',
                'social_media' => [
                    'facebook' => 'https://facebook.com/culturalheritage',
                    'twitter' => 'https://twitter.com/culturalheritage',
                    'instagram' => 'https://instagram.com/culturalheritage',
                ],
                'rating' => 4.7,
                'location' => 'Boston, Massachusetts',
            ],
            [
                'name' => 'Urban Explorer Tours',
                'description' => 'Discover the best of city life with our comprehensive urban exploration and metropolitan tours.',
                'email' => 'hello@urbanexplorer.com',
                'phone' => '+1-555-0404',
                'address' => '321 City Center, New York, NY 10001',
                'website' => 'https://urbanexplorer.com',
                'social_media' => [
                    'facebook' => 'https://facebook.com/urbanexplorer',
                    'twitter' => 'https://twitter.com/urbanexplorer',
                    'instagram' => 'https://instagram.com/urbanexplorer',
                ],
                'rating' => 4.6,
                'location' => 'New York, New York',
            ],
            [
                'name' => 'Wildlife Safari Adventures',
                'description' => 'Experience the wild side of nature with our authentic safari experiences and wildlife encounters.',
                'email' => 'safari@wildlifeadventures.com',
                'phone' => '+1-555-0505',
                'address' => '654 Safari Street, Denver, CO 80202',
                'website' => 'https://wildlifeadventures.com',
                'social_media' => [
                    'facebook' => 'https://facebook.com/wildlifeadventures',
                    'twitter' => 'https://twitter.com/wildlifeadventures',
                    'instagram' => 'https://instagram.com/wildlifeadventures',
                ],
                'rating' => 4.9,
                'location' => 'Denver, Colorado',
            ],
        ];

        foreach ($featuredAgencies as $agencyData) {
            Agency::create($agencyData);
        }

        // Create additional random agencies
        Agency::factory(15)->create();
    }
}
