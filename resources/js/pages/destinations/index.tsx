import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MapPin, Search, Star } from 'lucide-react';
import { useState } from 'react';

interface Destination {
    id: number;
    name: string;
    description: string;
    location: string;
    category: string;
    price: number;
    rating: number;
    featured_image: string;
    activities: string | string[];
    agency: {
        id: number;
        name: string;
        logo: string;
    };
    bookings_count: number;
}

interface DestinationsIndexProps {
    destinations: {
        data: Destination[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters?: {
        search?: string;
        category?: string;
        min_price?: string;
        max_price?: string;
        agency_id?: string;
        sort?: string;
    };
    categories?: string[];
    agencies?: Array<{
        id: number;
        name: string;
    }>;
}

export default function DestinationsIndex({ destinations, filters = {}, categories = [], agencies = [] }: DestinationsIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedAgency, setSelectedAgency] = useState(filters.agency_id || '');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'latest');

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedAgency) params.append('agency_id', selectedAgency);
        if (minPrice) params.append('min_price', minPrice);
        if (maxPrice) params.append('max_price', maxPrice);
        if (sortBy) params.append('sort', sortBy);

        router.get(route('destinations.index'), Object.fromEntries(params));
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedAgency('');
        setMinPrice('');
        setMaxPrice('');
        setSortBy('latest');
        router.get(route('destinations.index'));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const parseActivities = (activities: string | string[]) => {
        if (Array.isArray(activities)) return activities;
        if (typeof activities === 'string') {
            return activities.split(',').map((activity) => activity.trim());
        }
        return [];
    };

    return (
        <AppLayout>
            <Head title="Destinations" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 py-20 text-white">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="mb-6 text-4xl font-bold md:text-6xl">Discover Amazing Destinations</h1>
                            <p className="mx-auto mb-8 max-w-3xl text-xl md:text-2xl">
                                Explore breathtaking places around the world with our curated collection of destinations
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8 rounded-lg bg-white p-6 shadow-lg"
                    >
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="relative">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search destinations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Agency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Agencies</SelectItem>
                                    {agencies.map((agency) => (
                                        <SelectItem key={agency.id} value={agency.id.toString()}>
                                            {agency.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Latest</SelectItem>
                                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="popular">Most Popular</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input placeholder="Min Price ($)" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                            <Input placeholder="Max Price ($)" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={handleFilter} className="flex-1">
                                Apply Filters
                            </Button>
                            <Button variant="outline" onClick={clearFilters}>
                                Clear
                            </Button>
                        </div>
                    </motion.div>

                    {/* Results Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">{destinations.total} Destinations Found</h2>
                    </div>

                    {/* Destinations Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {destinations.data.map((destination, index) => (
                            <motion.div
                                key={destination.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={
                                                destination.featured_image ||
                                                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
                                            }
                                            alt={destination.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <Badge variant="secondary" className="bg-white/90">
                                                {destination.category}
                                            </Badge>
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <div className="flex items-center text-white">
                                                <Star className="h-4 w-4 fill-current text-yellow-400" />
                                                <span className="ml-1 text-sm font-medium">{destination.rating?.toFixed(1) || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg transition-colors group-hover:text-blue-600">{destination.name}</CardTitle>
                                        <CardDescription className="flex items-center text-gray-500">
                                            <MapPin className="mr-1 h-4 w-4" />
                                            {destination.location}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pt-0">
                                        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{destination.description}</p>

                                        <div className="mb-3 flex items-center justify-between">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <img
                                                    src={
                                                        destination.agency.logo ||
                                                        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=32&h=32&fit=crop'
                                                    }
                                                    alt={destination.agency.name}
                                                    className="mr-2 h-6 w-6 rounded-full"
                                                />
                                                {destination.agency.name}
                                            </div>
                                        </div>

                                        {destination.activities && parseActivities(destination.activities).length > 0 && (
                                            <div className="mb-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {parseActivities(destination.activities)
                                                        .slice(0, 2)
                                                        .map((activity, idx) => (
                                                            <Badge key={idx} variant="outline" className="text-xs">
                                                                {activity}
                                                            </Badge>
                                                        ))}
                                                    {parseActivities(destination.activities).length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{parseActivities(destination.activities).length - 2} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="text-lg font-bold text-blue-600">{formatPrice(destination.price)}</div>
                                            <Link href={route('destinations.show', destination.id)}>
                                                <Button size="sm">View Details</Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {destinations.last_page > 1 && (
                        <div className="flex justify-center">
                            <div className="flex gap-2">
                                {[...Array(destinations.last_page)].map((_, i) => (
                                    <Link
                                        key={i + 1}
                                        href={route('destinations.index', { ...filters, page: i + 1 })}
                                        className={`rounded-lg px-4 py-2 transition-colors ${
                                            destinations.current_page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {i + 1}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
