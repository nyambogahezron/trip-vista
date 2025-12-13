import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index, show } from '@/routes/agencies';
import { Head, Link } from '@inertiajs/react';
import { Building2, MapPin, Star, TrendingUp } from 'lucide-react';

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
    destinations_count: number;
    bookings_count: number;
    destinations: Array<{
        id: number;
        name: string;
        location: string;
    }>;
}

interface FeaturedAgenciesProps {
    agencies: {
        data: Agency[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function FeaturedAgencies({ agencies }: FeaturedAgenciesProps) {
    return (
        <AppLayout>
            <Head title="Featured Agencies" />
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                {/* Header */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Featured Travel Agencies</h1>
                    <p className="text-muted-foreground">Discover our top-rated and most trusted travel partners</p>
                </div>

                {/* Featured Badge */}
                <div className="flex justify-center">
                    <Badge variant="secondary" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        {agencies.total} Featured Agencies
                    </Badge>
                </div>

                {/* Agencies Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {agencies.data.map((agency) => (
                        <Card key={agency.id} className="transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    {agency.logo && <img src={agency.logo} alt={agency.name} className="h-12 w-12 rounded-lg object-cover" />}
                                    <div className="min-w-0 flex-1">
                                        <CardTitle className="truncate text-lg">{agency.name}</CardTitle>
                                        <div className="mt-1 flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm">{agency.rating}</span>
                                            </div>
                                            <Badge variant="outline">Featured</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{agency.location}</span>
                                </div>

                                <CardDescription className="line-clamp-3">{agency.description}</CardDescription>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">{agency.destinations_count}</span>
                                        <p className="text-muted-foreground">Destinations</p>
                                    </div>
                                    <div>
                                        <span className="font-medium">{agency.bookings_count}</span>
                                        <p className="text-muted-foreground">Bookings</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button asChild className="flex-1">
                                        <Link href={show(agency.id).url}>View Details</Link>
                                    </Button>
                                    {agency.website && (
                                        <Button variant="outline" asChild>
                                            <a href={agency.website} target="_blank" rel="noopener noreferrer">
                                                Website
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination would go here if needed */}
                {agencies.last_page > 1 && (
                    <div className="mt-8 flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Showing {agencies.data.length} of {agencies.total} featured agencies
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {agencies.data.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                            <h3 className="mb-2 text-lg font-semibold">No Featured Agencies</h3>
                            <p className="mb-4 text-muted-foreground">There are currently no featured travel agencies available.</p>
                            <Button asChild>
                                <Link href={index().url}>Browse All Agencies</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
