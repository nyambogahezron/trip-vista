import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Mail, MapPin, Phone, Star, Users } from 'lucide-react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

interface Agency {
    id: number;
    name: string;
    description: string;
    logo: string;
    featured_image: string;
    rating: number;
    review_count: number;
    specialties: string[];
    founded_year: number;
    locations: string[];
    website: string;
    email: string;
    phone: string;
    location: string;
    is_featured: boolean;
    destinations_count: number;
    bookings_count: number;
}

interface Stats {
    total_destinations: number;
    total_bookings: number;
    average_rating: number;
    review_count: number;
    popular_destinations: Array<{
        id: number;
        name: string;
        location: string;
        rating: number;
    }>;
}

interface FeaturedTour {
    id: number;
    name: string;
    location: string;
    rating: number;
    bookings_count: number;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    user_name: string;
    user_avatar: string;
    user_location: string;
    created_at: string;
}

interface AgencyDetailsProps {
    agency: Agency;
    stats: Stats;
    featured_tours: FeaturedTour[];
    recent_reviews: Review[];
}

export default function AgencyDetails({ agency, stats, featured_tours, recent_reviews }: AgencyDetailsProps) {
    if (!agency) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="container mx-auto flex grow flex-col items-center justify-center px-4 py-32 text-center">
                    <h1 className="mb-4 text-3xl font-bold">Agency Not Found</h1>
                    <p className="mb-6 text-muted-foreground">The agency you're looking for doesn't exist or has been removed.</p>
                    <Button onClick={() => window.history.back()}>Go Back</Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Head title={agency.name} />
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24">
                <div className="absolute inset-0 z-0">
                    <img src={agency.featured_image} alt={agency.name} className="h-full w-full object-cover brightness-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
                    <motion.div
                        className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-background/80 shadow-lg">
                            <img src={agency.logo} alt={agency.name + ' logo'} className="h-full w-full object-cover" />
                        </div>
                        <div className="grow text-center md:text-left">
                            <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">{agency.name}</h1>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 md:justify-start">
                                <div className="flex items-center">
                                    <Star className="mr-1.5 h-5 w-5 text-yellow-400" />
                                    <span className="font-medium">{agency.rating}</span>
                                    <span className="ml-1 text-sm text-white/70">({agency.review_count} reviews)</span>
                                </div>
                                <div className="flex items-center">
                                    <Globe className="mr-1.5 h-5 w-5" />
                                    <a href={'https://' + agency.website} className="hover:underline" target="_blank" rel="noopener noreferrer">
                                        {agency.website}
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <Users className="mr-1.5 h-5 w-5" />
                                    <span>Since {agency.founded_year}</span>
                                </div>
                            </div>
                        </div>
                        <Button className="rounded-full" size="lg">
                            Contact Agency
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-background py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left Column: About & Info */}
                        <div className="space-y-8 lg:col-span-2">
                            <motion.div
                                className="rounded-xl bg-card p-6 shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h2 className="mb-4 text-2xl font-semibold">About {agency.name}</h2>
                                <p className="mb-6 text-muted-foreground">{agency.description}</p>
                                <p className="text-muted-foreground">
                                    With over {new Date().getFullYear() - agency.founded_year} years of experience in the travel industry,{' '}
                                    {agency.name} has been curating exceptional travel experiences across {agency.locations.length} destinations
                                    worldwide. Our team of expert travel consultants works tirelessly to create personalized itineraries that match
                                    your preferences, budget, and travel style.
                                </p>
                            </motion.div>

                            <motion.div
                                className="rounded-xl bg-card p-6 shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="mb-4 text-2xl font-semibold">Our Specialties</h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {agency.specialties.map((specialty, index) => (
                                        <div key={index} className="flex items-center rounded-lg bg-muted p-3">
                                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                {index % 3 === 0 ? (
                                                    <MapPin className="h-5 w-5" />
                                                ) : index % 3 === 1 ? (
                                                    <Users className="h-5 w-5" />
                                                ) : (
                                                    <Calendar className="h-5 w-5" />
                                                )}
                                            </div>
                                            <span>{specialty}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="rounded-xl bg-card p-6 shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <h2 className="mb-4 text-2xl font-semibold">Featured Tours</h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {featured_tours &&
                                        featured_tours.slice(0, 4).map((tour, index) => (
                                            <div key={tour.id} className="group relative h-48 overflow-hidden rounded-lg">
                                                <img
                                                    src={'https://source.unsplash.com/random/300x200?travel,' + tour.name}
                                                    alt={tour.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-black/0 p-4">
                                                    <h3 className="font-medium text-white">{tour.name}</h3>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                                            <span className="text-sm text-white/90">{tour.rating}</span>
                                                        </div>
                                                        <span className="text-sm text-white/90">{tour.bookings_count} bookings</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <Button variant="outline" className="rounded-full">
                                        View All Tours
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                className="rounded-xl bg-card p-6 shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h2 className="mb-4 text-2xl font-semibold">Traveler Reviews</h2>
                                <div className="space-y-4">
                                    {recent_reviews &&
                                        recent_reviews.map((review, index) => (
                                            <div key={review.id} className="border-b pb-4 last:border-0">
                                                <div className="mb-2 flex justify-between">
                                                    <div className="flex items-center">
                                                        <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-muted">
                                                            <img src={review.user_avatar} alt="Reviewer" className="h-full w-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{review.user_name}</p>
                                                            <p className="text-sm text-muted-foreground">{review.user_location}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={'h-4 w-4 ' + (i < review.rating ? 'text-yellow-400' : 'text-gray-300')}
                                                                fill={i < review.rating ? 'currentColor' : 'none'}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                                            </div>
                                        ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <Button variant="outline" className="rounded-full">
                                        See All {agency.review_count} Reviews
                                    </Button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Contact & Location */}
                        <div className="space-y-8">
                            <motion.div
                                className="rounded-xl bg-card p-6 shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <Mail className="mt-0.5 mr-3 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <a href={'mailto:' + agency.email} className="text-primary hover:underline">
                                                {agency.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="mt-0.5 mr-3 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <p className="text-muted-foreground">{agency.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <MapPin className="mt-0.5 mr-3 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Headquarters</p>
                                            <p className="text-muted-foreground">
                                                {agency.locations[0]}, with offices in {agency.locations.slice(1, 3).join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="rounded-xl bg-card p-6 shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="mb-4 text-xl font-semibold">Destinations We Serve</h2>
                                <div className="flex flex-wrap gap-2">
                                    {agency.locations.map((location, index) => (
                                        <span key={index} className="rounded-full bg-muted px-3 py-1.5 text-sm">
                                            {location}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="relative overflow-hidden rounded-xl bg-primary/10 p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-24 w-24 rounded-full bg-primary/20"></div>
                                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-32 w-32 rounded-full bg-primary/20"></div>
                                <h2 className="relative mb-4 text-xl font-semibold">Ready to Start Planning?</h2>
                                <p className="relative mb-6 text-muted-foreground">
                                    Contact us today and let our experts help you create your perfect journey.
                                </p>
                                <Button className="relative w-full rounded-full">Get a Custom Itinerary</Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
