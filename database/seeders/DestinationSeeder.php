<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\Destination;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agencies = Agency::all();

        if ($agencies->isEmpty()) {
            $this->command->warn('No agencies found. Running AgencySeeder first...');
            $this->call(AgencySeeder::class);
            $agencies = Agency::all();
        }

        // Create featured destinations for each agency
        $featuredDestinations = [
            // Adventure Seekers Travel destinations
            [
                'agency_id' => $agencies->where('name', 'Adventure Seekers Travel')->first()?->id ?? $agencies->first()->id,
                'name' => 'Everest Base Camp Trek',
                'description' => 'Experience the ultimate trekking adventure to the base camp of the world\'s highest mountain. This challenging 14-day trek offers breathtaking views of the Himalayas and an unforgettable cultural experience.',
                'location' => 'Nepal Himalayas',
                'category' => 'Adventure',
                'rating' => 4.9,
                'price' => 2500.00,
                'activities' => ['Trekking', 'Mountain Climbing', 'Photography', 'Cultural Tours', 'Helicopter Tour'],
            ],
            [
                'agency_id' => $agencies->where('name', 'Adventure Seekers Travel')->first()?->id ?? $agencies->first()->id,
                'name' => 'Patagonia Wilderness Expedition',
                'description' => 'Explore the rugged beauty of Patagonia with glacier hiking, rock climbing, and wildlife spotting in one of the world\'s last great wilderness areas.',
                'location' => 'Argentina & Chile',
                'category' => 'Adventure',
                'rating' => 4.8,
                'price' => 3200.00,
                'activities' => ['Glacier Hiking', 'Rock Climbing', 'Wildlife Watching', 'Photography', 'Camping'],
            ],

            // Tropical Paradise Tours destinations
            [
                'agency_id' => $agencies->where('name', 'Tropical Paradise Tours')->first()?->id ?? $agencies->random()->id,
                'name' => 'Maldives Luxury Resort Experience',
                'description' => 'Indulge in ultimate luxury at a private resort in the Maldives. Crystal clear waters, pristine beaches, and world-class amenities await.',
                'location' => 'Maldives',
                'category' => 'Beach',
                'rating' => 4.9,
                'price' => 4500.00,
                'activities' => ['Snorkeling', 'Diving', 'Spa Treatments', 'Sunset Cruises', 'Beach Activities'],
            ],
            [
                'agency_id' => $agencies->where('name', 'Tropical Paradise Tours')->first()?->id ?? $agencies->random()->id,
                'name' => 'Bali Island Hopping Adventure',
                'description' => 'Discover the magic of Bali through island hopping, temple visits, rice terrace tours, and authentic Balinese cultural experiences.',
                'location' => 'Bali, Indonesia',
                'category' => 'Beach',
                'rating' => 4.7,
                'price' => 1800.00,
                'activities' => ['Island Hopping', 'Temple Tours', 'Cultural Shows', 'Cooking Classes', 'Beach Activities'],
            ],

            // Cultural Heritage Expeditions destinations
            [
                'agency_id' => $agencies->where('name', 'Cultural Heritage Expeditions')->first()?->id ?? $agencies->random()->id,
                'name' => 'Ancient Rome Historical Tour',
                'description' => 'Walk in the footsteps of emperors and gladiators. Explore the Colosseum, Vatican City, and hidden gems of the Eternal City with expert historians.',
                'location' => 'Rome, Italy',
                'category' => 'Historical',
                'rating' => 4.8,
                'price' => 1200.00,
                'activities' => ['Historical Tours', 'Museum Visits', 'Archaeological Sites', 'Food Tours', 'Art Galleries'],
            ],
            [
                'agency_id' => $agencies->where('name', 'Cultural Heritage Expeditions')->first()?->id ?? $agencies->random()->id,
                'name' => 'Machu Picchu Cultural Journey',
                'description' => 'Discover the mysteries of the Inca civilization with a comprehensive tour of Machu Picchu and the Sacred Valley of Peru.',
                'location' => 'Cusco, Peru',
                'category' => 'Cultural',
                'rating' => 4.9,
                'price' => 1600.00,
                'activities' => ['Archaeological Tours', 'Cultural Immersion', 'Local Markets', 'Traditional Ceremonies', 'Hiking'],
            ],

            // Wildlife Safari Adventures destinations
            [
                'agency_id' => $agencies->where('name', 'Wildlife Safari Adventures')->first()?->id ?? $agencies->random()->id,
                'name' => 'Serengeti Big Five Safari',
                'description' => 'Witness the Great Migration and encounter the Big Five in Tanzania\'s world-famous Serengeti National Park.',
                'location' => 'Serengeti, Tanzania',
                'category' => 'Wildlife',
                'rating' => 4.9,
                'price' => 3500.00,
                'activities' => ['Game Drives', 'Wildlife Photography', 'Hot Air Balloon', 'Cultural Village Visits', 'Nature Walks'],
            ],
            [
                'agency_id' => $agencies->where('name', 'Wildlife Safari Adventures')->first()?->id ?? $agencies->random()->id,
                'name' => 'Amazon Rainforest Expedition',
                'description' => 'Explore the world\'s largest rainforest and discover its incredible biodiversity with indigenous guides.',
                'location' => 'Amazon Basin, Brazil',
                'category' => 'Nature',
                'rating' => 4.7,
                'price' => 2800.00,
                'activities' => ['Jungle Trekking', 'Wildlife Spotting', 'River Cruises', 'Indigenous Culture', 'Canopy Tours'],
            ],
        ];

        foreach ($featuredDestinations as $destinationData) {
            Destination::create($destinationData);
        }

        // Create additional random destinations for each agency
        foreach ($agencies as $agency) {
            $randomDestinationCount = rand(2, 5);
            Destination::factory($randomDestinationCount)->create([
                'agency_id' => $agency->id,
            ]);
        }

        // Create some popular destinations across different agencies
        Destination::factory(10)->popular()->create([
            'agency_id' => $agencies->random()->id,
        ]);

        // Create budget-friendly destinations
        Destination::factory(8)->budget()->create([
            'agency_id' => $agencies->random()->id,
        ]);

        // Create luxury destinations
        Destination::factory(5)->luxury()->create([
            'agency_id' => $agencies->random()->id,
        ]);
    }
}
