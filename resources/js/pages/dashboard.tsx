import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Bell, Building2, Calendar, Clock, MapPin, Plane, Star, TrendingUp } from 'lucide-react';

interface DashboardProps {
    stats: {
        totalAgencies: number;
        totalDestinations: number;
        totalBookings: number;
        unreadNotifications: number;
    };
    recentBookings: Array<{
        id: number;
        booking_number: string;
        status: string;
        total_price: number;
        travel_date: string;
        destination: {
            id: number;
            name: string;
            location: string;
        };
        agency: {
            id: number;
            name: string;
        };
        user?: {
            id: number;
            name: string;
        };
    }>;
    popularDestinations: Array<{
        id: number;
        name: string;
        location: string;
        featured_image: string;
        rating: number;
        bookings_count: number;
    }>;
    featuredAgencies: Array<{
        id: number;
        name: string;
        logo: string;
        rating: number;
        description: string;
    }>;
    upcomingBookings: Array<{
        id: number;
        booking_number: string;
        travel_date: string;
        destination: {
            name: string;
            location: string;
        };
        agency: {
            name: string;
        };
    }>;
    user: {
        name: string;
        is_admin: boolean;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ stats, recentBookings, popularDestinations, featuredAgencies, upcomingBookings, user }: DashboardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 p-6">
                {/* Welcome Section */}
                <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <h1 className="mb-2 text-2xl font-bold">Welcome back, {user.name}!</h1>
                    <p className="text-blue-100">
                        {user.is_admin
                            ? 'Manage your travel platform and monitor all activities.'
                            : 'Ready for your next adventure? Explore new destinations and bookings.'}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Travel Agencies</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalAgencies}</div>
                            <p className="text-xs text-muted-foreground">Registered agencies</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Destinations</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalDestinations}</div>
                            <p className="text-xs text-muted-foreground">Available destinations</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{user.is_admin ? 'Total Bookings' : 'My Bookings'}</CardTitle>
                            <Plane className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalBookings}</div>
                            <p className="text-xs text-muted-foreground">{user.is_admin ? 'All bookings' : 'Your travel bookings'}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.unreadNotifications}</div>
                            <p className="text-xs text-muted-foreground">Unread notifications</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Recent Bookings */}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                {user.is_admin ? 'Recent Bookings' : 'My Recent Bookings'}
                            </CardTitle>
                            <CardDescription>
                                {user.is_admin ? 'Latest booking activities across the platform' : 'Your latest travel bookings'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentBookings.length > 0 ? (
                                    recentBookings.map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">#{booking.booking_number}</span>
                                                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {booking.destination.name}, {booking.destination.location}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    by {booking.agency.name} • {formatDate(booking.travel_date)}
                                                    {user.is_admin && booking.user && ` • ${booking.user.name}`}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">{formatCurrency(booking.total_price)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="py-4 text-center text-muted-foreground">No bookings yet</p>
                                )}
                            </div>
                            {recentBookings.length > 0 && (
                                <div className="mt-4">
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href="/bookings">View All Bookings</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Upcoming Bookings or Popular Destinations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                {!user.is_admin ? 'Upcoming Trips' : 'Popular Destinations'}
                            </CardTitle>
                            <CardDescription>{!user.is_admin ? 'Your scheduled adventures' : 'Most booked destinations'}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {!user.is_admin ? (
                                    upcomingBookings.length > 0 ? (
                                        upcomingBookings.map((booking) => (
                                            <div key={booking.id} className="rounded-lg border p-3">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">{booking.destination.name}</p>
                                                    <p className="text-xs text-muted-foreground">{booking.destination.location}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDate(booking.travel_date)} • {booking.agency.name}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-4 text-center text-sm text-muted-foreground">No upcoming trips</p>
                                    )
                                ) : (
                                    popularDestinations.map((destination) => (
                                        <div key={destination.id} className="flex items-center gap-3 p-2">
                                            <img
                                                src={destination.featured_image || '/placeholder-destination.jpg'}
                                                alt={destination.name}
                                                className="h-12 w-12 rounded object-cover"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">{destination.name}</p>
                                                <p className="truncate text-xs text-muted-foreground">{destination.location}</p>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs">{destination.rating}</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">{destination.bookings_count} bookings</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Featured Agencies */}
                {featuredAgencies.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Featured Travel Agencies
                            </CardTitle>
                            <CardDescription>Top-rated agencies for your next adventure</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {featuredAgencies.map((agency) => (
                                    <div key={agency.id} className="rounded-lg border p-4">
                                        <div className="mb-3 flex items-center gap-3">
                                            <img
                                                src={agency.logo || '/placeholder-agency.jpg'}
                                                alt={agency.name}
                                                className="h-12 w-12 rounded object-cover"
                                            />
                                            <div>
                                                <h3 className="font-semibold">{agency.name}</h3>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm">{agency.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{agency.description}</p>
                                        <Button variant="outline" size="sm" asChild className="w-full">
                                            <Link href={`/agencies/${agency.id}`}>View Agency</Link>
                                        </Button>
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
