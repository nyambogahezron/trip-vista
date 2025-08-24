import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { destinations } from '../data/destinations';
import { agencies } from '../data/agencies';
import {
  Globe,
  Compass,
  Users,
  MapPin,
  Star,
  ArrowRight,
  ThumbsUp,
  MapPinned,
  TreePalm,
  Plane,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Index() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', () => {
          setIsVideoLoaded(true);
        });
      }
    };
  }, []);

  // Animated variants for motion components
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {isVideoLoaded ? (
          <div className="absolute inset-0 w-full h-full bg-black/30 z-10"></div>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-black z-10"></div>
        )}

        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className={`object-cover w-full h-full transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/683436675/rendition/1080p/file.mp4?loc=external"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="container mx-auto px-4 z-20 text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow-lg mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white text-shadow mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Explore breathtaking destinations around the world with our expert
            guides and unforgettable experiences.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/destinations">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-transform hover:scale-105"
              >
                Explore Destinations
              </Button>
            </Link>
            <Link to="/agencies">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 backdrop-blur-sm border-white hover:bg-white/30 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-transform hover:scale-105"
              >
                Find Tour Agencies
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center animate-bounce">
          <a
            href="#featured-destinations"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
            aria-label="Scroll down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Featured Destinations */}
      <section
        id="featured-destinations"
        className="py-20 bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Destinations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of the world's most breathtaking
              locations
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {destinations.slice(0, 4).map(destination => (
              <motion.div
                key={destination.id}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                variants={fadeInUp}
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
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">
                      {destination.price}
                    </span>
                    <Link
                      to={`/destinations/${destination.id}`}
                      className="text-sm font-medium text-foreground hover:text-primary flex items-center"
                    >
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/destinations">
              <Button variant="outline" className="rounded-full">
                View All Destinations <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Travel With Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide unforgettable experiences with the highest standards of
              service and safety
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Expertise</h3>
              <p className="text-muted-foreground">
                Local guides with deep knowledge of destinations around the
                world.
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Curated Experiences
              </h3>
              <p className="text-muted-foreground">
                Unique itineraries designed to provide authentic cultural
                immersion.
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Service</h3>
              <p className="text-muted-foreground">
                Dedicated support team available 24/7 for all your travel needs.
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adventure Options</h3>
              <p className="text-muted-foreground">
                From relaxing retreats to adrenaline-pumping adventures for all
                types.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Tour Agencies */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top Tour Agencies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Partner with the best tour agencies for your next adventure
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {agencies.slice(0, 2).map(agency => (
              <motion.div
                key={agency.id}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col md:flex-row"
                variants={fadeInUp}
              >
                <div className="md:w-2/5 h-60 md:h-auto overflow-hidden">
                  <img
                    src={agency.featuredImage}
                    alt={agency.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-3/5 flex flex-col">
                  <div className="flex items-center mb-3">
                    <h3 className="text-xl font-semibold">{agency.name}</h3>
                    <div className="ml-auto flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">
                        {agency.rating}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({agency.reviewCount})
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {agency.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {agency.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/agencies/${agency.id}`}
                    className="self-start mt-auto"
                  >
                    <Button variant="outline" className="text-sm rounded-full">
                      View Agency <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/agencies">
              <Button variant="outline" className="rounded-full">
                View All Agencies <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-90"></div>
          <img
            src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=2665&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready for Your Next Adventure?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl mb-8 text-white/90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of travelers who have experienced the world with
              ExploreX. Your journey begins here.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/destinations">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  Start Planning Now <Plane className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
