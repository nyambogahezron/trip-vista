import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Award,
    Camera,
    CheckCircle,
    Clock,
    Globe,
    Heart,
    Mail,
    MapPin,
    Mountain,
    Phone,
    Share2,
    Shield,
    Star,
    Thermometer,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Weather {
    description: string;
    temperature_ranges: Record<string, { min: number; max: number }>;
    best_time_to_visit: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    user: {
        name: string;
        avatar: string;
    };
    created_at: string;
}

interface Destination {
    id: number;
    name: string;
    description: string;
    long_description: string;
    location: string;
    country: string;
    price: number;
    duration: string;
    duration_days: number;
    max_group_size: number;
    difficulty_level: string;
    category: string;
    rating: number;
    average_rating: number;
    review_count: number;
    featured_image: string;
    photo_gallery: string[];
    activities: string[];
    included_services: string[];
    weather: Weather;
    bookings_count?: number;
    agency: {
        id: number;
        name: string;
        description: string;
        phone: string;
        email: string;
        website: string;
        locations: string[];
    };
}

interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    highlights: string[];
}

interface Stats {
    total_bookings: number;
    average_rating: number;
    review_count: number;
    duration_days: number;
    max_group_size: number;
    difficulty_level: string;
}

interface Props {
    destination: Destination;
    agencyDestinations: Destination[];
    relatedDestinations: Destination[];
    popularDestinations: Destination[];
    recentReviews: Review[];
    stats: Stats;
    itinerary: ItineraryDay[];
}

export default function Show({ destination, relatedDestinations, recentReviews, stats, itinerary }: Props) {
    const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'reviews' | 'gallery'>('overview');

    const getDifficultyColor = (level: string) => {
        switch (level) {
            case 'easy':
                return 'text-green-600 bg-green-100';
            case 'moderate':
                return 'text-yellow-600 bg-yellow-100';
            case 'challenging':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className={`h-4 w-4 ${index < Math.floor(rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
        ));
    };

    return (
        <section>
            <Head title={`${destination.name} - Trip Vista`} />

            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={destination.featured_image}
                    alt={destination.name}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 text-white">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="mb-2 flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            <span className="text-lg">{destination.location}</span>
                        </div>
                        <h1 className="mb-4 text-5xl font-bold">{destination.name}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {renderStars(destination.average_rating)}
                                <span className="ml-2 text-lg">{destination.average_rating}</span>
                                <span className="text-gray-300">({destination.review_count} reviews)</span>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-sm font-medium ${getDifficultyColor(destination.difficulty_level)}`}>
                                {destination.difficulty_level}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-8 right-8 flex gap-3">
                    <button className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                        <Heart className="h-5 w-5" />
                    </button>
                    <button className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                        <Share2 className="h-5 w-5" />
                    </button>
                    <button className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                        <Camera className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
                        >
                            <div className="rounded-xl bg-blue-50 p-4 text-center">
                                <Clock className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                                <div className="text-sm text-gray-600">Duration</div>
                                <div className="font-semibold">{destination.duration_days} days</div>
                            </div>
                            <div className="rounded-xl bg-green-50 p-4 text-center">
                                <Users className="mx-auto mb-2 h-6 w-6 text-green-600" />
                                <div className="text-sm text-gray-600">Group Size</div>
                                <div className="font-semibold">Max {destination.max_group_size}</div>
                            </div>
                            <div className="rounded-xl bg-purple-50 p-4 text-center">
                                <Mountain className="mx-auto mb-2 h-6 w-6 text-purple-600" />
                                <div className="text-sm text-gray-600">Difficulty</div>
                                <div className="font-semibold capitalize">{destination.difficulty_level}</div>
                            </div>
                            <div className="rounded-xl bg-orange-50 p-4 text-center">
                                <TrendingUp className="mx-auto mb-2 h-6 w-6 text-orange-600" />
                                <div className="text-sm text-gray-600">Bookings</div>
                                <div className="font-semibold">{stats.total_bookings}</div>
                            </div>
                        </motion.div>

                        {/* Navigation Tabs */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-8 border-b border-gray-200"
                        >
                            <nav className="flex space-x-8">
                                {[
                                    { id: 'overview' as const, label: 'Overview' },
                                    { id: 'itinerary' as const, label: 'Itinerary' },
                                    { id: 'reviews' as const, label: 'Reviews' },
                                    { id: 'gallery' as const, label: 'Gallery' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                            activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </motion.div>

                        {/* Tab Content */}
                        <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    {/* Description */}
                                    <div>
                                        <h2 className="mb-4 text-2xl font-bold">About This Experience</h2>
                                        <p className="mb-6 leading-relaxed text-gray-700">{destination.long_description}</p>
                                    </div>

                                    {/* Activities */}
                                    {destination.activities && Array.isArray(destination.activities) && destination.activities.length > 0 && (
                                        <div>
                                            <h3 className="mb-4 text-xl font-bold">Activities Included</h3>
                                            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                                                {destination.activities.map((activity, index) => (
                                                    <div key={index} className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                        <span className="text-sm">{activity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Weather Info */}
                                    <div>
                                        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                                            <Thermometer className="h-5 w-5" />
                                            Weather & Climate
                                        </h3>
                                        <div className="rounded-xl bg-blue-50 p-6">
                                            <p className="mb-4 text-gray-700">{destination.weather.description}</p>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                {Object.entries(destination.weather.temperature_ranges || {}).map(([season, temps]) => (
                                                    <div key={season} className="text-center">
                                                        <div className="font-medium capitalize">{season}</div>
                                                        <div className="text-sm text-gray-600">
                                                            {temps.min}°C - {temps.max}°C
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 rounded-lg bg-blue-100 p-3">
                                                <strong>Best time to visit:</strong> {destination.weather.best_time_to_visit}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Included Services */}
                                    {destination.included_services &&
                                        Array.isArray(destination.included_services) &&
                                        destination.included_services.length > 0 && (
                                            <div>
                                                <h3 className="mb-4 text-xl font-bold">What's Included</h3>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    {destination.included_services.map((service, index) => (
                                                        <div key={index} className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
                                                            <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                                                            <span className="text-sm">{service}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            )}

                            {activeTab === 'itinerary' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Daily Itinerary</h2>
                                    {itinerary.map((day, index) => (
                                        <motion.div
                                            key={day.day}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="rounded-xl border border-gray-200 p-6"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                                    <span className="font-bold text-blue-600">{day.day}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="mb-2 text-xl font-semibold">{day.title}</h3>
                                                    <p className="mb-4 text-gray-700">{day.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {day.highlights.map((highlight, idx) => (
                                                            <span key={idx} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
                                                                {highlight}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold">Reviews</h2>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">{renderStars(destination.average_rating)}</div>
                                            <span className="font-semibold">{destination.average_rating}</span>
                                            <span className="text-gray-500">({destination.review_count} reviews)</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {recentReviews.map((review, index) => (
                                            <motion.div
                                                key={review.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="rounded-xl border border-gray-200 p-6"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <img src={review.user.avatar} alt={review.user.name} className="h-12 w-12 rounded-full" />
                                                    <div className="flex-1">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <span className="font-semibold">{review.user.name}</span>
                                                            <div className="flex">{renderStars(review.rating)}</div>
                                                            <span className="text-sm text-gray-500">{review.created_at}</span>
                                                        </div>
                                                        <p className="text-gray-700">{review.comment}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'gallery' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Photo Gallery</h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {destination.photo_gallery.map((photo, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
                                            >
                                                <img
                                                    src={photo}
                                                    alt={`${destination.name} - Photo ${index + 1}`}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="sticky top-8 space-y-6"
                        >
                            {/* Booking Card */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-6 text-center">
                                    <div className="mb-2 text-3xl font-bold text-green-600">{formatCurrency(destination.price)}</div>
                                    <div className="text-gray-600">per person</div>
                                </div>

                                <button className="mb-4 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                                    Book Now
                                </button>

                                <div className="text-center">
                                    <Link href={`/agencies/${destination.agency.id}`} className="text-sm text-blue-600 hover:text-blue-700">
                                        View Agency Details
                                    </Link>
                                </div>
                            </div>

                            {/* Agency Info */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-bold">Tour Operator</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Award className="h-5 w-5 text-blue-600" />
                                        <span className="font-medium">{destination.agency.name}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{destination.agency.description}</p>

                                    <div className="space-y-2 border-t pt-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span>{destination.agency.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span>{destination.agency.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Globe className="h-4 w-4 text-gray-400" />
                                            <span>{destination.agency.website}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Safety & Support */}
                            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                                    <Shield className="h-5 w-5 text-green-600" />
                                    Safety & Support
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                                        <span>24/7 emergency support</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                                        <span>Comprehensive travel insurance</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                                        <span>Professional certified guides</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                                        <span>Free cancellation up to 48h</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related Destinations */}
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-16">
                    <h2 className="mb-8 text-3xl font-bold">You Might Also Like</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {relatedDestinations.map((related, index) => (
                            <motion.div
                                key={related.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="group overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
                            >
                                <Link href={`/destinations/${related.id}`}>
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={related.featured_image}
                                            alt={related.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(related.difficulty_level)}`}
                                            >
                                                {related.difficulty_level}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-1 flex items-center gap-1 text-sm text-gray-500">
                                            <MapPin className="h-4 w-4" />
                                            {related.location}
                                        </div>
                                        <h3 className="mb-2 font-bold transition-colors group-hover:text-blue-600">{related.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                {renderStars(related.rating)}
                                                <span className="ml-1 text-sm text-gray-600">({related.bookings_count})</span>
                                            </div>
                                            <div className="font-bold text-green-600">{formatCurrency(related.price)}</div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
