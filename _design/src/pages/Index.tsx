import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Globe, MapPin, Plane, Star, ThumbsUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { agencies } from '../data/agencies';
import { destinations } from '../data/destinations';

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
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
                {isVideoLoaded ? (
                    <div className="absolute inset-0 z-10 h-full w-full bg-background/30"></div>
                ) : (
                    <div className="absolute inset-0 z-10 h-full w-full bg-background"></div>
                )}

                <div className="absolute inset-0 h-full w-full">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`h-full w-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <source src="https://assets.mixkit.co/videos/5363/5363-720.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="z-20 container mx-auto px-4 text-center">
                    <motion.h1
                        className="mb-6 text-4xl font-bold text-white text-shadow-lg md:text-6xl lg:text-7xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Discover Your Next Adventure
                    </motion.h1>
                    <motion.p
                        className="mx-auto mb-8 max-w-3xl text-xl text-white text-shadow md:text-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Explore breathtaking destinations around the world with our expert guides and unforgettable experiences.
                    </motion.p>
                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link to="/destinations">
                            <Button
                                size="lg"
                                className="rounded-full bg-primary px-8 py-6 text-lg text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
                            >
                                Explore Destinations
                            </Button>
                        </Link>
                        <Link to="/agencies">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full border-white bg-white/20 px-8 py-6 text-lg text-white shadow-lg backdrop-blur-xs transition-transform hover:scale-105 hover:bg-white/30"
                            >
                                Find Tour Agencies
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="absolute right-0 bottom-8 left-0 z-20 flex animate-bounce justify-center">
                    <a
                        href="#featured-destinations"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-colors hover:bg-white/40"
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
            <section id="featured-destinations" className="bg-linear-to-b from-background to-muted py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mb-16 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={fadeInUp}
                    >
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Destinations</h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            Explore our handpicked selection of the world's most breathtaking locations
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        {destinations.slice(0, 4).map((destination) => (
                            <motion.div
                                key={destination.id}
                                className="group overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                                variants={fadeInUp}
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
                                        <span className="text-sm text-white">{destination.country}</span>
                                    </div>
                                    <div className="absolute top-4 right-4 flex items-center rounded-full bg-black/30 px-2 py-1">
                                        <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                        <span className="text-sm text-white">{destination.rating}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="mb-2 text-xl font-semibold">{destination.name}</h3>
                                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-primary">{destination.price}</span>
                                        <Link
                                            to={`/destinations/${destination.id}`}
                                            className="flex items-center text-sm font-medium text-foreground hover:text-primary"
                                        >
                                            View Details <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-12 text-center">
                        <Link to="/destinations">
                            <Button variant="outline" className="rounded-full">
                                View All Destinations <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-linear-to-br from-primary/5 to-background py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mb-16 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={fadeInUp}
                    >
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Travel With Us</h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            We provide unforgettable experiences with the highest standards of service and safety
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        <motion.div className="rounded-xl bg-card p-6 text-center shadow-md transition-all hover:shadow-lg" variants={fadeInUp}>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <Globe className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Global Expertise</h3>
                            <p className="text-muted-foreground">Local guides with deep knowledge of destinations around the world.</p>
                        </motion.div>

                        <motion.div className="rounded-xl bg-card p-6 text-center shadow-md transition-all hover:shadow-lg" variants={fadeInUp}>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <ThumbsUp className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Curated Experiences</h3>
                            <p className="text-muted-foreground">Unique itineraries designed to provide authentic cultural immersion.</p>
                        </motion.div>

                        <motion.div className="rounded-xl bg-card p-6 text-center shadow-md transition-all hover:shadow-lg" variants={fadeInUp}>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Personal Service</h3>
                            <p className="text-muted-foreground">Dedicated support team available 24/7 for all your travel needs.</p>
                        </motion.div>

                        <motion.div className="rounded-xl bg-card p-6 text-center shadow-md transition-all hover:shadow-lg" variants={fadeInUp}>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <Compass className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Adventure Options</h3>
                            <p className="text-muted-foreground">From relaxing retreats to adrenaline-pumping adventures for all types.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Tour Agencies */}
            <section className="bg-muted py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mb-16 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={fadeInUp}
                    >
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Top Tour Agencies</h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">Partner with the best tour agencies for your next adventure</p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 gap-8 md:grid-cols-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        {agencies.slice(0, 2).map((agency) => (
                            <motion.div
                                key={agency.id}
                                className="flex flex-col overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:shadow-xl md:flex-row"
                                variants={fadeInUp}
                            >
                                <div className="h-60 overflow-hidden md:h-auto md:w-2/5">
                                    <img src={agency.featuredImage} alt={agency.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-col p-6 md:w-3/5">
                                    <div className="mb-3 flex items-center">
                                        <h3 className="text-xl font-semibold">{agency.name}</h3>
                                        <div className="ml-auto flex items-center">
                                            <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                            <span className="text-sm font-medium">{agency.rating}</span>
                                            <span className="ml-1 text-xs text-muted-foreground">({agency.reviewCount})</span>
                                        </div>
                                    </div>

                                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{agency.description}</p>

                                    <div className="mt-auto mb-4 flex flex-wrap gap-2">
                                        {agency.specialties.slice(0, 3).map((specialty, index) => (
                                            <span key={index} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>

                                    <Link to={`/agencies/${agency.id}`} className="mt-auto self-start">
                                        <Button variant="outline" className="rounded-full text-sm">
                                            View Agency <ArrowRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-12 text-center">
                        <Link to="/agencies">
                            <Button variant="outline" className="rounded-full">
                                View All Agencies <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-primary py-20 text-white">
                <div className="absolute inset-0 z-10">
                    <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/50 opacity-90"></div>
                    <img
                        src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=2665&auto=format&fit=crop"
                        alt="Background"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="relative z-20 container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <motion.h2
                            className="mb-6 text-3xl font-bold md:text-5xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            Ready for Your Next Adventure?
                        </motion.h2>
                        <motion.p
                            className="mb-8 text-lg text-white/90 md:text-xl"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Join thousands of travelers who have experienced the world with TripVista. Your journey begins here.
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
                                    className="rounded-full bg-white px-8 py-6 text-lg text-primary shadow-lg transition-transform hover:scale-105 hover:bg-white/90"
                                >
                                    Start Planning Now <Plane className="ml-2 h-5 w-5" />
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
