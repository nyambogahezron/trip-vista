export interface Destination {
    id: number;
    name: string;
    location: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    duration: string;
    highlights: string[];
}

export const destinations: Destination[] = [
    {
        id: 1,
        name: 'Bali Paradise',
        location: 'Bali, Indonesia',
        description: 'Experience the magical beauty of Bali with pristine beaches, ancient temples, and vibrant culture.',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 324,
        duration: '7 days',
        highlights: ['Beautiful beaches', 'Cultural temples', 'Traditional cuisine', 'Scenic rice terraces'],
    },
    {
        id: 2,
        name: 'Swiss Alps Adventure',
        location: 'Switzerland',
        description: 'Discover the breathtaking Swiss Alps with snow-capped mountains, crystal-clear lakes, and charming villages.',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        rating: 4.9,
        reviews: 256,
        duration: '10 days',
        highlights: ['Mountain hiking', 'Scenic railways', 'Alpine villages', 'Winter sports'],
    },
    {
        id: 3,
        name: 'Tokyo City Break',
        location: 'Tokyo, Japan',
        description: 'Immerse yourself in the vibrant culture of Tokyo with modern skyscrapers, traditional shrines, and world-class cuisine.',
        price: 1599,
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
        rating: 4.7,
        reviews: 412,
        duration: '5 days',
        highlights: ['Modern city life', 'Traditional temples', 'Amazing food', 'Cherry blossoms'],
    },
    {
        id: 4,
        name: 'Santorini Escape',
        location: 'Santorini, Greece',
        description: 'Relax on the stunning Greek island of Santorini with white-washed buildings, blue domes, and spectacular sunsets.',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 189,
        duration: '6 days',
        highlights: ['Sunset views', 'White architecture', 'Wine tasting', 'Volcanic beaches'],
    },
    {
        id: 5,
        name: 'Machu Picchu Trek',
        location: 'Peru',
        description: 'Embark on an unforgettable journey to the ancient citadel of Machu Picchu through the Andes Mountains.',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
        rating: 4.9,
        reviews: 167,
        duration: '8 days',
        highlights: ['Ancient ruins', 'Mountain trekking', 'Inca history', 'Andean culture'],
    },
    {
        id: 6,
        name: 'Safari Kenya',
        location: 'Kenya, Africa',
        description: "Experience the wild beauty of Africa with incredible wildlife safaris in Kenya's national parks.",
        price: 2299,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 134,
        duration: '12 days',
        highlights: ['Wildlife safari', 'Big Five animals', 'Masai culture', 'Great migration'],
    },
];
