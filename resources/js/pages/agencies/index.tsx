import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { agencies } from '@/data/agencies';
import { Agency } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Globe, MapPinned, Search, Star, Users } from 'lucide-react';
import { useState } from 'react';

interface AgenciesIndexProps {
    agencies?: {
        data: Agency[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters?: {
        search?: string;
        rating?: string;
        location?: string;
    };
}

export default function AgenciesIndex({ agencies: agenciesProp, filters = {} }: AgenciesIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedRating, setSelectedRating] = useState(filters.rating || '');
    const [selectedLocation, setSelectedLocation] = useState(filters.location || '');

    const staticAgencies = agencies;
    const currentPage = agenciesProp?.current_page || 1;
    const perPage = agenciesProp?.per_page || 6;

    const handleSearch = () => {
        router.get(
            '/agencies',
            {
                search: searchTerm,
                rating: selectedRating,
                location: selectedLocation,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedRating('');
        setSelectedLocation('');
        router.get('/agencies');
    };

    const filteredAgencies = staticAgencies.filter((agency) => {
        const matchesSearch =
            agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agency.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agency.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRating = selectedRating === '' || agency.rating >= parseFloat(selectedRating);

        const matchesLocation = selectedLocation === '' || agency.location.toLowerCase().includes(selectedLocation.toLowerCase());

        return matchesSearch && matchesRating && matchesLocation;
    });

    const totalAgencies = filteredAgencies.length;
    const lastPage = Math.ceil(totalAgencies / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedAgencies = filteredAgencies.slice(startIndex, endIndex);

    const agenciesData = agenciesProp || {
        data: paginatedAgencies,
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        total: totalAgencies,
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Trusted Tour Agencies - Trip Vista" />
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary/20 to-primary/20 pt-32 pb-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Trusted Tour Agencies</h1>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Connect with expert agencies who will create your perfect travel experience with local knowledge and personalized service.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="border-b bg-background py-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-6 flex flex-col gap-4 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                    <Input
                                        placeholder="Search agencies by name, description, or specialties..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(e.target.value)}
                                    className="rounded-md border border-input bg-background px-3 py-2"
                                >
                                    <option value="">All Ratings</option>
                                    <option value="4.5">4.5+ Stars</option>
                                    <option value="4.0">4.0+ Stars</option>
                                    <option value="3.5">3.5+ Stars</option>
                                </select>
                                <Input
                                    placeholder="Location"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-32"
                                />
                                <Button onClick={handleSearch}>Search</Button>
                                {(searchTerm || selectedRating || selectedLocation) && (
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Agencies List */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {filteredAgencies.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-lg text-muted-foreground">No agencies found matching your criteria.</p>
                            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
                                Clear Search
                            </Button>
                        </div>
                    ) : (
                        <motion.div className="grid grid-cols-1 gap-8 lg:grid-cols-2" variants={containerVariants} initial="hidden" animate="visible">
                            {filteredAgencies.map((agency) => (
                                <motion.div
                                    key={agency.id}
                                    className="overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all hover:shadow-xl"
                                    variants={itemVariants}
                                >
                                    <div className="md:flex">
                                        <div className="relative h-64 overflow-hidden md:h-auto md:w-2/5">
                                            <img src={agency.featuredImage} alt={agency.name} className="h-full w-full object-cover" />
                                            <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-black/70 to-transparent p-4">
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white">
                                                        <img src={agency.logo} alt={`${agency.name} logo`} className="h-full w-full object-cover" />
                                                    </div>
                                                    <div className="ml-auto flex items-center rounded-full bg-black/30 px-3 py-1">
                                                        <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                                        <span className="text-sm text-white">{agency.rating}</span>
                                                        <span className="ml-1 text-xs text-white/70">({agency.reviewCount})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 md:w-3/5">
                                            <h2 className="mb-3 text-2xl font-bold">{agency.name}</h2>
                                            <p className="mb-4 text-muted-foreground">{agency.description}</p>

                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {agency.specialties.map((specialty, index) => (
                                                    <span key={index} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mb-6 grid grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <a
                                                        href={agency.website}
                                                        className="text-sm text-primary hover:underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {agency.website.replace('https://', '')}
                                                    </a>
                                                </div>
                                                <div className="flex items-center">
                                                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm">Founded {agency.established}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="flex items-center text-sm font-medium">
                                                    <MapPinned className="mr-1 h-4 w-4" /> Location:
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="rounded-full bg-muted px-2 py-1 text-xs">{agency.location}</span>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                                                <span className="text-sm text-muted-foreground">{agency.reviewCount} traveler reviews</span>
                                                <Link href={`/agencies/${agency.id}`}>
                                                    <Button size="sm" className="rounded-full">
                                                        View Agency
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Pagination */}
                {agenciesData.last_page > 1 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex gap-2">
                            {Array.from({ length: agenciesData.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === agenciesData.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() =>
                                        router.get('/agencies', {
                                            ...filters,
                                            page,
                                        })
                                    }
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Become an Agency Partner */}
            <section className="bg-muted py-16">
                <div className="container mx-auto px-4">
                    <div className="overflow-hidden rounded-2xl bg-card shadow-xl">
                        <div className="flex flex-col md:flex-row-reverse">
                            <div className="relative h-64 overflow-hidden md:h-auto md:w-1/2">
                                <img
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                                    alt="Agency Partner"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Are You a Tour Agency?</h2>
                                <p className="mb-6 text-muted-foreground">
                                    Partner with Trip Vista and connect with thousands of travelers looking for their next adventure. Showcase your
                                    unique tours and grow your business.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button className="rounded-full">Become a Partner</Button>
                                    <Button variant="outline" className="rounded-full">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
