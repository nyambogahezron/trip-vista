import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { destinations } from '../data/destinations';
import { Star, MapPin, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

type CategoryFilter = string | null;
type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(null);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = Array.from(
    new Set(destinations.map(dest => dest.category))
  );

  // Filter and sort destinations
  const filteredDestinations = destinations
    .filter(dest => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !activeCategory || dest.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return (
          parseFloat(a.price.replace(/[^0-9.-]+/g, '')) -
          parseFloat(b.price.replace(/[^0-9.-]+/g, ''))
        );
      } else if (sortBy === 'price-high') {
        return (
          parseFloat(b.price.replace(/[^0-9.-]+/g, '')) -
          parseFloat(a.price.replace(/[^0-9.-]+/g, ''))
        );
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return a.id - b.id; // default sort by id
    });

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Destinations
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our handpicked selection of the world's most breathtaking
              locations and start planning your next adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search destinations or countries..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
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
              {categories.map(category => (
                <Button
                  key={category}
                  variant={
                    activeCategory === category ? 'secondary' : 'outline'
                  }
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="text-sm border rounded py-1 px-2 focus:outline-none focus:ring-1 focus:ring-primary"
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
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No destinations found matching your criteria.
              </p>
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
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredDestinations
                  .slice(0, visibleCount)
                  .map(destination => (
                    <motion.div
                      key={destination.id}
                      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                      variants={itemVariants}
                    >
                      <div className="h-60 overflow-hidden relative">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 flex items-center">
                          <MapPin className="w-4 h-4 text-primary mr-1" />
                          <span className="text-white text-sm">
                            {destination.country}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 flex items-center bg-black/30 rounded-full px-2 py-1">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-white text-sm">
                            {destination.rating}
                          </span>
                        </div>
                        <div className="absolute top-4 left-4 bg-primary/80 text-white text-xs font-medium px-2 py-1 rounded">
                          {destination.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold mb-2">
                          {destination.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {destination.description}
                        </p>
                        <div className="flex flex-wrap gap-2 my-3">
                          {destination.activities
                            .slice(0, 2)
                            .map((activity, index) => (
                              <span
                                key={index}
                                className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full"
                              >
                                {activity}
                              </span>
                            ))}
                          {destination.activities.length > 2 && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              +{destination.activities.length - 2}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-primary font-medium">
                            From {destination.price}
                          </span>
                          <Link to={`/destinations/${destination.id}`}>
                            <Button
                              size="sm"
                              className="rounded-full"
                              variant="outline"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>

              {visibleCount < filteredDestinations.length && (
                <div className="text-center mt-12">
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    className="rounded-full"
                  >
                    Load More Destinations
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"
                  alt="Travel Planning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden"></div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need Help Planning Your Trip?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our travel experts can help you create the perfect itinerary
                  tailored to your preferences, budget, and travel style.
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

      <Footer />
    </div>
  );
}
