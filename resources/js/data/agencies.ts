export interface Agency {
    id: number;
    name: string;
    description: string;
    logo: string;
    featuredImage: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    established: string;
    destinations: number;
    website: string;
    location: string;
}

export const agencies: Agency[] = [
    {
        id: 1,
        name: 'Adventure World Tours',
        description:
            'Specialists in adventure travel and extreme sports experiences around the globe. We offer thrilling expeditions to remote destinations.',
        logo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop&crop=center',
        featuredImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 1247,
        specialties: ['Adventure Travel', 'Extreme Sports', 'Mountain Expeditions'],
        established: '2010',
        destinations: 45,
        website: 'https://adventureworld.com',
        location: 'Denver, USA',
    },
    {
        id: 2,
        name: 'Luxury Escapes Co.',
        description: 'Premium travel experiences featuring the finest hotels, resorts, and exclusive destinations worldwide.',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
        featuredImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 892,
        specialties: ['Luxury Travel', 'Five-Star Hotels', 'Private Tours'],
        established: '2008',
        destinations: 32,
        website: 'https://luxuryescapes.com',
        location: 'London, UK',
    },
    {
        id: 3,
        name: 'Cultural Journeys',
        description: 'Immersive cultural experiences that connect travelers with local communities and authentic traditions.',
        logo: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop&crop=center',
        featuredImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 634,
        specialties: ['Cultural Tours', 'Local Experiences', 'Heritage Sites'],
        established: '2012',
        destinations: 28,
        website: 'https://culturaljourneys.com',
        location: 'Barcelona, Spain',
    },
    {
        id: 4,
        name: 'Eco Adventures',
        description: 'Sustainable travel experiences that promote environmental conservation and responsible tourism.',
        logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center',
        featuredImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 456,
        specialties: ['Eco Tourism', 'Wildlife Conservation', 'Sustainable Travel'],
        established: '2015',
        destinations: 22,
        website: 'https://ecoadventures.com',
        location: 'Costa Rica',
    },
    {
        id: 5,
        name: 'Family Fun Travel',
        description: 'Creating magical family memories with kid-friendly destinations and activities for all ages.',
        logo: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=100&h=100&fit=crop&crop=center',
        featuredImage: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=300&fit=crop',
        rating: 4.6,
        reviewCount: 789,
        specialties: ['Family Travel', 'Theme Parks', 'Educational Tours'],
        established: '2009',
        destinations: 38,
        website: 'https://familyfuntravel.com',
        location: 'Orlando, USA',
    },
    {
        id: 6,
        name: "Backpacker's Paradise",
        description: 'Budget-friendly adventures for independent travelers seeking authentic experiences off the beaten path.',
        logo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center',
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        rating: 4.5,
        reviewCount: 1156,
        specialties: ['Budget Travel', 'Backpacking', 'Youth Hostels'],
        established: '2011',
        destinations: 67,
        website: 'https://backpackersparadise.com',
        location: 'Amsterdam, Netherlands',
    },
];
