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
                'logo' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=face',
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
                'featured_image' => 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
            ],
            [
                'name' => 'Tropical Paradise Tours',
                'logo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
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
                'featured_image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            ],
            [
                'name' => 'Cultural Heritage Expeditions',
                'logo' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
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
                'featured_image' => 'https://images.unsplash.com/photo-1539650116574-75c0c6d73df5?w=800&h=600&fit=crop',
            ],
            [
                'name' => 'Urban Explorer Tours',
                'logo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
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
                'featured_image' => 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop',
            ],
            [
                'name' => 'Wildlife Safari Adventures',
                'logo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
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
                'featured_image' => 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
            ],
        ];

        foreach ($featuredAgencies as $agencyData) {
            Agency::create($agencyData);
        }

        // Create additional random agencies
        Agency::factory(15)->create();
    }
}
