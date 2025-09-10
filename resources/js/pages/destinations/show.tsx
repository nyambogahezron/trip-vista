import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, ExternalLink, Globe, Mail, MapPin, Phone, Star, Users } from 'lucide-react';

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
        description: string;
        rating: number;
        location: string;
        phone: string;
        email: string;
        website: string;
        destinations_count: number;
        bookings_count: number;
    };
    bookings_count: number;
    bookings: Array<{
        id: number;
        user: {
            name: string;
        };
        created_at: string;
        status: string;
    }>;
}

interface DestinationShowProps {
    destination: Destination;
    relatedDestinations: Destination[];
}

export default function DestinationShow({ destination, relatedDestinations }: DestinationShowProps) {
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout>
            <Head title={destination.name} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Hero Section */}
                <div className="relative h-96 overflow-hidden">
                    <img
                        src={destination.featured_image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop'}
                        alt={destination.name}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-6 left-6">
                        <Link href={route('destinations.index')}>
                            <Button variant="secondary" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Destinations
                            </Button>
                        </Link>
                    </div>
                    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                        <div className="mx-auto max-w-7xl">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <Badge className="mb-4">{destination.category}</Badge>
                                <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{destination.name}</h1>
                                <div className="mb-4 flex items-center text-white">
                                    <MapPin className="mr-2 h-5 w-5" />
                                    <span className="text-lg">{destination.location}</span>
                                </div>
                                <div className="flex items-center text-white">
                                    <Star className="mr-1 h-5 w-5 fill-current text-yellow-400" />
                                    <span className="mr-4 text-lg font-medium">{destination.rating?.toFixed(1) || 'N/A'}</span>
                                    <Users className="mr-1 h-5 w-5" />
                                    <span className="text-lg">{destination.bookings_count} bookings</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left Column - Main Content */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* Description */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About This Destination</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="leading-relaxed text-gray-700">{destination.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Activities */}
                            {destination.activities && parseActivities(destination.activities).length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Activities & Highlights</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                {parseActivities(destination.activities).map((activity, index) => (
                                                    <div key={index} className="flex items-center rounded-lg bg-blue-50 p-3">
                                                        <Camera className="mr-3 h-5 w-5 text-blue-600" />
                                                        <span className="text-gray-800">{activity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}

                            {/* Recent Bookings */}
                            {destination.bookings && destination.bookings.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Recent Bookings</CardTitle>
                                            <CardDescription>Recent travelers who visited this destination</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {destination.bookings.slice(0, 5).map((booking) => (
                                                    <div key={booking.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{booking.user.name}</p>
                                                            <p className="text-sm text-gray-500">Booked on {formatDate(booking.created_at)}</p>
                                                        </div>
                                                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                                                            {booking.status}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Booking Card */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                                <Card className="sticky top-6">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-2xl text-blue-600">{formatPrice(destination.price)}</CardTitle>
                                                <CardDescription>per person</CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                                                    <span className="ml-1 font-medium">{destination.rating?.toFixed(1) || 'N/A'}</span>
                                                </div>
                                                <p className="text-sm text-gray-500">{destination.bookings_count} reviews</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button className="w-full" size="lg">
                                            Book Now
                                        </Button>
                                        <p className="text-center text-sm text-gray-500">Free cancellation up to 24 hours before</p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Agency Info */}
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Hosted by</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={
                                                    destination.agency.logo ||
                                                    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=64&h=64&fit=crop'
                                                }
                                                alt={destination.agency.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{destination.agency.name}</h4>
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                                                    <span className="ml-1 text-sm">{destination.agency.rating?.toFixed(1) || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600">{destination.agency.description}</p>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="mr-2 h-4 w-4" />
                                                {destination.agency.location}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Globe className="mr-2 h-4 w-4" />
                                                {destination.agency.destinations_count} destinations
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Users className="mr-2 h-4 w-4" />
                                                {destination.agency.bookings_count} bookings
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            {destination.agency.phone && (
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Phone className="mr-2 h-4 w-4" />
                                                    {destination.agency.phone}
                                                </div>
                                            )}
                                            {destination.agency.email && (
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    {destination.agency.email}
                                                </div>
                                            )}
                                            {destination.agency.website && (
                                                <a
                                                    href={destination.agency.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    Visit Website
                                                </a>
                                            )}
                                        </div>

                                        <Link href={route('agencies.show', destination.agency.id)}>
                                            <Button variant="outline" className="w-full">
                                                View Agency Profile
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>

                    {/* Related Destinations */}
                    {relatedDestinations && relatedDestinations.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-16"
                        >
                            <h2 className="mb-8 text-3xl font-bold text-gray-900">Similar Destinations</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {relatedDestinations.map((related) => (
                                    <Card key={related.id} className="group transition-shadow hover:shadow-lg">
                                        <div className="relative h-32 overflow-hidden">
                                            <img
                                                src={
                                                    related.featured_image ||
                                                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
                                                }
                                                alt={related.name}
                                                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="mb-1 font-semibold text-gray-900">{related.name}</h3>
                                            <p className="mb-2 text-sm text-gray-500">{related.location}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-blue-600">{formatPrice(related.price)}</span>
                                                <Link href={route('destinations.show', related.id)}>
                                                    <Button size="sm" variant="outline">
                                                        View
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
