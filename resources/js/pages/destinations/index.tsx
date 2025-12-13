import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { destinations } from '@/data/destinations';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Search, Star } from 'lucide-react';
import { useState } from 'react';

type CategoryFilter = string | null;
type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';

export default function Destinations() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>(null);
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [visibleCount, setVisibleCount] = useState(8);

    const categories = Array.from(new Set(destinations.map((dest) => dest.destination)));

   
    const filteredDestinations = destinations
        .filter((dest) => {
            const matchesSearch =
                dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || dest.destination.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !activeCategory || dest.destination === activeCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'price-low') {
                return a.price - b.price;
            } else if (sortBy === 'price-high') {
                return b.price - a.price;
            } else if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            return a.id - b.id; // default sort by id
        });

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    // Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
            {/* Hero Section */}
            <section className="bg-linear-to-r from-primary/20 to-secondary/20 pt-32 pb-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Discover Amazing Destinations</h1>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Explore our handpicked selection of the world's most breathtaking locations and start planning your next adventure.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="border-b py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                            <Input
                                placeholder="Search destinations or countries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Categories:</span>
                            <Button
                                variant={!activeCategory ? 'secondary' : 'outline'}
                                size="sm"
                                className="rounded-full"
                                onClick={() => setActiveCategory(null)}
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={activeCategory === category ? 'secondary' : 'outline'}
                                    size="sm"
                                    className="rounded-full"
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium whitespace-nowrap">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="rounded border px-2 py-1 text-sm focus:ring-1 focus:ring-primary focus:outline-hidden"
                            >
                                <option value="default">Default</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {filteredDestinations.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-lg text-muted-foreground">No destinations found matching your criteria.</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSearchTerm('');
                                    setActiveCategory(null);
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <>
                            <motion.div
                                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {filteredDestinations.slice(0, visibleCount).map((destination) => (
                                    <motion.div
                                        key={destination.id}
                                        className="group overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                                        variants={itemVariants}
                                    >
                                        <div className="relative h-60 overflow-hidden">
                                            <img
                                                src={destination.image}
                                                alt={destination.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 flex items-center">
                                                <MapPin className="mr-1 h-4 w-4 text-primary" />
                                                <span className="text-sm text-white">{destination.destination}</span>
                                            </div>
                                            <div className="absolute top-4 right-4 flex items-center rounded-full bg-black/30 px-2 py-1">
                                                <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                                <span className="text-sm text-white">{destination.rating}</span>
                                            </div>
                                            <div className="absolute top-4 left-4 rounded bg-primary/80 px-2 py-1 text-xs font-medium text-white">
                                                {destination.destination}
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="mb-2 text-xl font-semibold">{destination.name}</h3>
                                            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>
                                            <div className="my-3 flex flex-wrap gap-2">
                                                {destination.highlights.slice(0, 2).map((highlight: string, index: number) => (
                                                    <span key={index} className="rounded-full bg-secondary/10 px-2 py-1 text-xs text-secondary">
                                                        {highlight}
                                                    </span>
                                                ))}
                                                {destination.highlights.length > 2 && (
                                                    <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                                                        +{destination.highlights.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="font-medium text-primary">From {destination.price}</span>
                                                <Link href={`/destinations/${destination.id}`}>
                                                    <Button size="sm" className="rounded-full" variant="outline">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {visibleCount < filteredDestinations.length && (
                                <div className="mt-12 text-center">
                                    <Button onClick={handleLoadMore} variant="outline" className="rounded-full">
                                        Load More Destinations
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-muted py-16">
                <div className="container mx-auto px-4">
                    <div className="overflow-hidden rounded-2xl bg-card shadow-xl">
                        <div className="flex flex-col md:flex-row">
                            <div className="relative h-64 overflow-hidden md:h-auto md:w-1/2">
                                <img
                                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"
                                    alt="Travel Planning"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent md:hidden"></div>
                            </div>
                            <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Need Help Planning Your Trip?</h2>
                                <p className="mb-6 text-muted-foreground">
                                    Our travel experts can help you create the perfect itinerary tailored to your preferences, budget, and travel
                                    style.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button className="rounded-full">Contact an Expert</Button>
                                    <Button variant="outline" className="rounded-full">
                                        View Travel Guides
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
