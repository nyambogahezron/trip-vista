import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Globe, Mail, MapPin, Phone, Star } from 'lucide-react';

interface Agency {
    id: number;
    name: string;
    description: string;
    logo: string;
    rating: number;
    location: string;
    website: string;
    phone: string;
    email: string;
    featured_image: string;
    is_featured: boolean;
    destinations: Array<{
        id: number;
        name: string;
        location: string;
        rating: number;
        bookings_count: number;
    }>;
    bookings: Array<{
        id: number;
        booking_number: string;
        user: {
            name: string;
        };
        destination: {
            name: string;
        };
        created_at: string;
    }>;
}

interface ShowAgencyProps {
    agency: Agency;
    stats: {
        total_destinations: number;
        total_bookings: number;
        average_rating: number;
        popular_destinations: Array<{
            id: number;
            name: string;
            location: string;
        }>;
    };
}

export default function ShowAgency({ agency, stats }: ShowAgencyProps) {
    return (
        <AppLayout>
            <Head title={agency.name} />
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                {/* Agency Header */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            {agency.logo && <img src={agency.logo} alt={agency.name} className="h-16 w-16 rounded-lg object-cover" />}
                            <div className="flex-1">
                                <div className="mb-2 flex items-center gap-2">
                                    <CardTitle className="text-2xl">{agency.name}</CardTitle>
                                    {agency.is_featured && <Badge variant="secondary">Featured</Badge>}
                                </div>
                                <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>{agency.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{agency.location}</span>
                                    </div>
                                </div>
                                <CardDescription>{agency.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{agency.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{agency.email}</span>
                            </div>
                            {agency.website && (
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <a
                                        href={agency.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Visit Website
                                    </a>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Destinations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_destinations}</div>
                            <p className="text-xs text-muted-foreground">Available destinations</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Total Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_bookings}</div>
                            <p className="text-xs text-muted-foreground">All-time bookings</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Average Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.average_rating}</div>
                            <p className="text-xs text-muted-foreground">Customer rating</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Destinations */}
                {agency.destinations && agency.destinations.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Destinations</CardTitle>
                            <CardDescription>Popular destinations offered by this agency</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {agency.destinations.map((destination) => (
                                    <div key={destination.id} className="rounded-lg border p-4">
                                        <h3 className="font-semibold">{destination.name}</h3>
                                        <p className="text-sm text-muted-foreground">{destination.location}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs">{destination.rating}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{destination.bookings_count} bookings</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
