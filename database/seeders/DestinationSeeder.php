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
            [
                'name' => 'Everest Base Camp Trek',
                'description' => 'Epic 14-day trek to the base of the world\'s highest mountain',
                'location' => 'Nepal',
                'country' => 'Nepal',
                'long_description' => 'Embark on the adventure of a lifetime with our Everest Base Camp Trek. This challenging 14-day journey takes you through diverse landscapes, from lush forests to high-altitude alpine terrain. Experience the rich Sherpa culture, visit ancient monasteries, and witness breathtaking views of the world\'s highest peaks. The trek culminates at Everest Base Camp at 5,364 meters, offering an incredible sense of achievement and stunning mountain vistas.',
                'weather_info' => 'Best seasons: Spring (March-May) and Autumn (September-November). Clear mountain views and moderate temperatures.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => -5, 'max' => 15],
                    'summer' => ['min' => 5, 'max' => 20],
                    'autumn' => ['min' => -10, 'max' => 10],
                    'winter' => ['min' => -20, 'max' => 5]
                ]),
                'duration_days' => 14,
                'max_group_size' => 12,
                'difficulty_level' => 'challenging',
                'included_services' => json_encode([
                    'Professional mountain guide',
                    'Porter service',
                    'All meals during trek',
                    'Teahouse accommodation',
                    'Permits and park fees',
                    'Medical kit and oxygen',
                    'Airport transfers',
                    'Trekking equipment'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1571018374051-4b43de3fa944?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
                ]),
                'price' => 2500.00,
                'duration' => '14 days',
                'type' => 'Adventure',
                'image' => 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agency_id' => $agencies->where('name', 'Adventure Seekers Travel')->first()?->id ?? $agencies->first()->id,
                'name' => 'Patagonia Wilderness Expedition',
                'description' => 'Explore the rugged beauty of Patagonia with glacier hiking, rock climbing, and wildlife spotting in one of the world\'s last great wilderness areas.',
                'location' => 'Argentina & Chile',
                'country' => 'Argentina',
                'long_description' => 'Discover the untamed beauty of Patagonia on this 10-day wilderness expedition. Journey through dramatic landscapes of towering granite peaks, ancient glaciers, and pristine lakes. Encounter unique wildlife including guanacos, condors, and possibly pumas. Hike through Torres del Paine National Park, kayak among icebergs in Glaciar Grey, and experience the raw power of nature in one of the world\'s last great wilderness areas.',
                'weather_info' => 'Unpredictable weather with strong winds. Best time: December-March (summer). Layers essential.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 2, 'max' => 12],
                    'summer' => ['min' => 8, 'max' => 18],
                    'autumn' => ['min' => 0, 'max' => 10],
                    'winter' => ['min' => -5, 'max' => 5]
                ]),
                'duration_days' => 10,
                'max_group_size' => 8,
                'difficulty_level' => 'moderate',
                'included_services' => json_encode([
                    'Expert naturalist guide',
                    'All meals and snacks',
                    'Eco-lodge accommodation',
                    'Transportation in region',
                    'Kayaking equipment',
                    'Park entrance fees',
                    'Wildlife viewing equipment',
                    'Photography workshop'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1531499880430-8c5bb1235ea6?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1516729081656-10b0e9be4e67?w=800&h=600&fit=crop'
                ]),
                'category' => 'Adventure',
                'rating' => 4.8,
                'price' => 3200.00,
                'activities' => ['Glacier Hiking', 'Rock Climbing', 'Wildlife Watching', 'Photography', 'Camping'],
                'featured_image' => 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],


            [
                'agency_id' => $agencies->where('name', 'Tropical Paradise Tours')->first()?->id ?? $agencies->random()->id,
                'name' => 'Maldives Luxury Resort Experience',
                'description' => 'Indulge in ultimate luxury at a private resort in the Maldives. Crystal clear waters, pristine beaches, and world-class amenities await.',
                'location' => 'Maldives',
                'country' => 'Maldives',
                'long_description' => 'Escape to paradise with our exclusive Maldives luxury resort experience. Stay in overwater bungalows with direct ocean access, enjoy private beaches with powder-soft white sand, and indulge in world-class spa treatments. Snorkel in crystal-clear lagoons teeming with marine life, dine on fresh seafood under the stars, and experience the ultimate in tropical luxury. This 7-day retreat offers the perfect blend of relaxation and adventure.',
                'weather_info' => 'Tropical climate with year-round warmth. Dry season (December-April) is ideal. Occasional rain showers refresh the air.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 26, 'max' => 30],
                    'summer' => ['min' => 25, 'max' => 31],
                    'autumn' => ['min' => 26, 'max' => 30],
                    'winter' => ['min' => 25, 'max' => 29]
                ]),
                'duration_days' => 7,
                'max_group_size' => 2,
                'difficulty_level' => 'easy',
                'included_services' => json_encode([
                    'Overwater bungalow accommodation',
                    'All meals and premium beverages',
                    'Private beach access',
                    'Spa treatments',
                    'Snorkeling equipment',
                    'Sunset cruise',
                    'Airport seaplane transfers',
                    '24/7 butler service'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1571037628998-0185d0b18e6a?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop'
                ]),
                'category' => 'Beach',
                'rating' => 4.9,
                'price' => 4500.00,
                'activities' => ['Snorkeling', 'Diving', 'Spa Treatments', 'Sunset Cruises', 'Beach Activities'],
                'featured_image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agency_id' => $agencies->where('name', 'Tropical Paradise Tours')->first()?->id ?? $agencies->random()->id,
                'name' => 'Bali Island Hopping Adventure',
                'description' => 'Discover the magic of Bali through island hopping, temple visits, rice terrace tours, and authentic Balinese cultural experiences.',
                'location' => 'Bali, Indonesia',
                'country' => 'Indonesia',
                'long_description' => 'Immerse yourself in the enchanting culture and natural beauty of Bali on this comprehensive 8-day island adventure. Visit ancient Hindu temples, trek through emerald rice terraces, and explore traditional villages. Experience authentic Balinese cooking classes, witness spectacular sunrise from Mount Batur, and relax on pristine beaches. This journey combines cultural immersion with natural wonders, offering a perfect introduction to the "Island of the Gods".',
                'weather_info' => 'Tropical climate with dry season (April-October) being ideal. Warm temperatures year-round with occasional afternoon showers.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 24, 'max' => 30],
                    'summer' => ['min' => 23, 'max' => 29],
                    'autumn' => ['min' => 24, 'max' => 31],
                    'winter' => ['min' => 25, 'max' => 32]
                ]),
                'duration_days' => 8,
                'max_group_size' => 16,
                'difficulty_level' => 'easy',
                'included_services' => json_encode([
                    'Professional local guide',
                    'All accommodation (boutique hotels)',
                    'Daily breakfast and select meals',
                    'Temple entrance fees',
                    'Cooking class with local family',
                    'Sunrise volcano trek',
                    'Traditional dance performance',
                    'Airport transfers'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1555400082-0e1574e4e79e?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1539650116574-75c0c6d73d02?w=800&h=600&fit=crop'
                ]),
                'category' => 'Beach',
                'rating' => 4.7,
                'price' => 1800.00,
                'activities' => ['Island Hopping', 'Temple Tours', 'Cultural Shows', 'Cooking Classes', 'Beach Activities'],
                'featured_image' => 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],


            [
                'agency_id' => $agencies->where('name', 'Cultural Heritage Expeditions')->first()?->id ?? $agencies->random()->id,
                'name' => 'Ancient Rome Historical Tour',
                'description' => 'Walk in the footsteps of emperors and gladiators. Explore the Colosseum, Vatican City, and hidden gems of the Eternal City with expert historians.',
                'location' => 'Rome, Italy',
                'country' => 'Italy',
                'long_description' => 'Step back in time on this comprehensive 5-day journey through Ancient Rome. Led by expert historians and archaeologists, explore iconic landmarks like the Colosseum, Roman Forum, and Pantheon. Visit the Vatican Museums with skip-the-line access, discover hidden underground chambers, and enjoy exclusive after-hours access to key sites. Experience authentic Roman cuisine, stay in a boutique hotel near the Spanish Steps, and gain deep insights into the empire that shaped the Western world.',
                'weather_info' => 'Mediterranean climate with mild winters and warm summers. Spring (April-June) and fall (September-November) are ideal.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 10, 'max' => 22],
                    'summer' => ['min' => 18, 'max' => 30],
                    'autumn' => ['min' => 12, 'max' => 24],
                    'winter' => ['min' => 4, 'max' => 15]
                ]),
                'duration_days' => 5,
                'max_group_size' => 20,
                'difficulty_level' => 'easy',
                'included_services' => json_encode([
                    'Expert historian guide',
                    'Skip-the-line museum tickets',
                    'Boutique hotel accommodation',
                    'Daily breakfast',
                    'Welcome dinner',
                    'Private Vatican tour',
                    'Underground Rome experience',
                    'Food and wine tasting'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
                ]),
                'category' => 'Historical',
                'rating' => 4.8,
                'price' => 1200.00,
                'activities' => ['Historical Tours', 'Museum Visits', 'Archaeological Sites', 'Food Tours', 'Art Galleries'],
                'featured_image' => 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agency_id' => $agencies->where('name', 'Cultural Heritage Expeditions')->first()?->id ?? $agencies->random()->id,
                'name' => 'Machu Picchu Cultural Journey',
                'description' => 'Discover the mysteries of the Inca civilization with a comprehensive tour of Machu Picchu and the Sacred Valley of Peru.',
                'location' => 'Cusco, Peru',
                'country' => 'Peru',
                'long_description' => 'Embark on a mystical 6-day journey to the heart of the ancient Inca Empire. Start in colonial Cusco, acclimatize to the altitude, and explore the Sacred Valley\'s vibrant markets and traditional villages. Experience the iconic train ride to Aguas Calientes and witness sunrise over Machu Picchu from Huayna Picchu. Learn about Inca engineering marvels, participate in traditional ceremonies with local shamans, and discover the secrets of this UNESCO World Heritage Site.',
                'weather_info' => 'Dry season (May-September) is best for clear views. Expect cool mornings and warm afternoons. Rain gear essential.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 8, 'max' => 20],
                    'summer' => ['min' => 5, 'max' => 18],
                    'autumn' => ['min' => 7, 'max' => 19],
                    'winter' => ['min' => 12, 'max' => 22]
                ]),
                'duration_days' => 6,
                'max_group_size' => 16,
                'difficulty_level' => 'moderate',
                'included_services' => json_encode([
                    'Professional archaeological guide',
                    'Train tickets to Aguas Calientes',
                    'Machu Picchu entrance permits',
                    'Sacred Valley tour',
                    'Traditional ceremony participation',
                    'Boutique hotel in Cusco',
                    'All meals included',
                    'Altitude acclimatization support'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1580312264769-cc42bf51b4e5?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1589222224439-a18d4b98a3ed?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1461863109726-246fa9799503?w=800&h=600&fit=crop'
                ]),
                'category' => 'Cultural',
                'rating' => 4.9,
                'price' => 1600.00,
                'activities' => ['Archaeological Tours', 'Cultural Immersion', 'Local Markets', 'Traditional Ceremonies', 'Hiking'],
                'featured_image' => 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],


            [
                'agency_id' => $agencies->where('name', 'Wildlife Safari Adventures')->first()?->id ?? $agencies->random()->id,
                'name' => 'Serengeti Big Five Safari',
                'description' => 'Witness the Great Migration and encounter the Big Five in Tanzania\'s world-famous Serengeti National Park.',
                'location' => 'Serengeti, Tanzania',
                'country' => 'Tanzania',
                'long_description' => 'Experience the ultimate African safari on this 7-day adventure through the legendary Serengeti. Witness millions of wildebeest, zebras, and gazelles during the Great Migration, search for the Big Five (lion, leopard, elephant, buffalo, and rhino), and enjoy exclusive game drives in remote areas. Stay in luxury tented camps, take a hot air balloon ride over the savanna at sunrise, and visit a traditional Maasai village to learn about their ancient culture and way of life.',
                'weather_info' => 'Dry season (June-October) is best for wildlife viewing. Expect warm days and cool nights. Migration timing varies.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 15, 'max' => 28],
                    'summer' => ['min' => 12, 'max' => 26],
                    'autumn' => ['min' => 16, 'max' => 29],
                    'winter' => ['min' => 18, 'max' => 32]
                ]),
                'duration_days' => 7,
                'max_group_size' => 6,
                'difficulty_level' => 'easy',
                'included_services' => json_encode([
                    'Professional safari guide',
                    'Luxury tented camp accommodation',
                    'All meals and beverages',
                    'Game drive vehicles',
                    'Hot air balloon safari',
                    'Maasai village visit',
                    'Park entrance fees',
                    'Airport transfers'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1571831103412-b5b194d31a55?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1520960480709-c67d62a0c0c2?w=800&h=600&fit=crop'
                ]),
                'category' => 'Wildlife',
                'rating' => 4.9,
                'price' => 3500.00,
                'activities' => ['Game Drives', 'Wildlife Photography', 'Hot Air Balloon', 'Cultural Village Visits', 'Nature Walks'],
                'featured_image' => 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agency_id' => $agencies->where('name', 'Wildlife Safari Adventures')->first()?->id ?? $agencies->random()->id,
                'name' => 'Amazon Rainforest Expedition',
                'description' => 'Explore the world\'s largest rainforest and discover its incredible biodiversity with indigenous guides.',
                'location' => 'Amazon Basin, Brazil',
                'country' => 'Brazil',
                'long_description' => 'Venture deep into the Amazon rainforest on this 8-day expedition to discover one of Earth\'s most biodiverse ecosystems. Navigate winding rivers by canoe, trek through dense jungle trails, and spot exotic wildlife including jaguars, sloths, and hundreds of bird species. Stay in eco-lodges run by local communities, learn traditional survival skills from indigenous guides, and contribute to conservation efforts while experiencing the raw beauty of the world\'s lungs.',
                'weather_info' => 'Hot and humid year-round. Dry season (June-November) has fewer insects and easier wildlife spotting.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 23, 'max' => 32],
                    'summer' => ['min' => 22, 'max' => 31],
                    'autumn' => ['min' => 24, 'max' => 33],
                    'winter' => ['min' => 25, 'max' => 34]
                ]),
                'duration_days' => 8,
                'max_group_size' => 10,
                'difficulty_level' => 'moderate',
                'included_services' => json_encode([
                    'Indigenous expert guides',
                    'Eco-lodge accommodation',
                    'All meals (traditional cuisine)',
                    'Canoe and boat transportation',
                    'Wildlife viewing equipment',
                    'Survival skills workshop',
                    'Conservation project visit',
                    'Jungle gear provided'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1548083127-d8e44c25e1b4?w=800&h=600&fit=crop'
                ]),
                'category' => 'Nature',
                'rating' => 4.7,
                'price' => 2800.00,
                'activities' => ['Jungle Trekking', 'Wildlife Spotting', 'River Cruises', 'Indigenous Culture', 'Canopy Tours'],
                'featured_image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],


            [
                'agency_id' => $agencies->where('name', 'Urban Explorer Tours')->first()?->id ?? $agencies->random()->id,
                'name' => 'New York City Complete Experience',
                'description' => 'Discover the energy and excitement of NYC with visits to iconic landmarks, Broadway shows, and world-class dining.',
                'location' => 'New York, USA',
                'country' => 'United States',
                'long_description' => 'Immerse yourself in the ultimate New York City experience over 5 action-packed days. From the bright lights of Times Square to the serenity of Central Park, explore iconic landmarks including the Statue of Liberty, Empire State Building, and Brooklyn Bridge. Enjoy VIP Broadway show tickets, guided food tours through diverse neighborhoods, and insider access to world-renowned museums. Stay in a boutique Manhattan hotel and experience the city that never sleeps like a true New Yorker.',
                'weather_info' => 'Four distinct seasons. Spring (April-June) and fall (September-November) offer the most pleasant weather.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 8, 'max' => 20],
                    'summer' => ['min' => 18, 'max' => 28],
                    'autumn' => ['min' => 10, 'max' => 22],
                    'winter' => ['min' => -2, 'max' => 8]
                ]),
                'duration_days' => 5,
                'max_group_size' => 25,
                'difficulty_level' => 'easy',
                'included_services' => json_encode([
                    'Expert city guide',
                    'Boutique Manhattan hotel',
                    'Daily breakfast',
                    'Broadway show tickets',
                    'Food tour experiences',
                    'Museum skip-the-line passes',
                    'Subway passes',
                    'Welcome cocktail reception'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop'
                ]),
                'category' => 'Urban',
                'rating' => 4.6,
                'price' => 1350.00,
                'activities' => ['City Tours', 'Broadway Shows', 'Museum Visits', 'Food Tours', 'Shopping'],
                'featured_image' => 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'agency_id' => $agencies->where('name', 'Urban Explorer Tours')->first()?->id ?? $agencies->random()->id,
                'name' => 'Tokyo Modern Culture Tour',
                'description' => 'Experience the perfect blend of traditional and modern culture in Japan\'s vibrant capital city.',
                'location' => 'Tokyo, Japan',
                'country' => 'Japan',
                'long_description' => 'Discover the fascinating contrasts of Tokyo on this 6-day cultural immersion. Experience ancient traditions at Senso-ji Temple and modern innovation in Shibuya. Learn sushi-making from master chefs, explore cutting-edge neighborhoods like Harajuku and Akihabara, and witness the serenity of traditional tea ceremonies. Stay in a boutique hotel in Ginza, enjoy exclusive access to sumo wrestling practice, and experience the incredible efficiency and hospitality that make Japan unique.',
                'weather_info' => 'Four distinct seasons. Spring (cherry blossoms) and autumn are most popular. Summer is hot and humid.',
                'temperature_ranges' => json_encode([
                    'spring' => ['min' => 10, 'max' => 20],
                    'summer' => ['min' => 22, 'max' => 30],
                    'autumn' => ['min' => 12, 'max' => 22],
                    'winter' => ['min' => 2, 'max' => 12]
                ]),
                'duration_days' => 6,
                'max_group_size' => 18,
                'difficulty_level' => 'easy',
                'included_services' => json_encode([
                    'Professional cultural guide',
                    'Boutique Ginza hotel',
                    'Daily breakfast',
                    'Sushi-making class',
                    'Traditional tea ceremony',
                    'Sumo wrestling experience',
                    'Tokyo Metro passes',
                    'Pop culture district tours'
                ]),
                'photo_gallery' => json_encode([
                    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&h=600&fit=crop'
                ]),
                'category' => 'Urban',
                'rating' => 4.8,
                'price' => 1950.00,
                'activities' => ['City Tours', 'Temple Visits', 'Sushi Making', 'Pop Culture Tours', 'Night Markets'],
                'featured_image' => 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($featuredDestinations as $destinationData) {
            try {
                Destination::create($destinationData);
                $this->command->info("Created destination: {$destinationData['name']}");
            } catch (\Exception $e) {
                $this->command->error("Failed to create destination: {$destinationData['name']} - {$e->getMessage()}");
            }
        }


        foreach ($agencies as $agency) {
            $randomDestinationCount = rand(2, 5);
            try {
                Destination::factory($randomDestinationCount)->create([
                    'agency_id' => $agency->id,
                ]);
                $this->command->info("Created {$randomDestinationCount} random destinations for agency: {$agency->name}");
            } catch (\Exception $e) {
                $this->command->error("Failed to create random destinations for agency {$agency->name}: {$e->getMessage()}");
            }
        }

        try {
            Destination::factory(10)->popular()->create();
            $this->command->info("Created 10 popular destinations");
        } catch (\Exception $e) {
            $this->command->error("Failed to create popular destinations: {$e->getMessage()}");
        }

        // Create budget-friendly destinations
        try {
            Destination::factory(8)->budget()->create();
            $this->command->info("Created 8 budget destinations");
        } catch (\Exception $e) {
            $this->command->error("Failed to create budget destinations: {$e->getMessage()}");
        }

        // Create luxury destinations
        try {
            Destination::factory(5)->luxury()->create();
            $this->command->info("Created 5 luxury destinations");
        } catch (\Exception $e) {
            $this->command->error("Failed to create luxury destinations: {$e->getMessage()}");
        }
    }
}
