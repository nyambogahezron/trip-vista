import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { destinations } from '../data/destinations';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, User, ChevronRight } from 'lucide-react';

export default function DestinationDetails() {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find(d => d.id === parseInt(id || '0'));

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center flex-grow text-center">
          <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The destination you're looking for doesn't exist or has been
            removed.
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate some fake itinerary data
  const itinerary = [
    {
      day: 'Day 1',
      title: 'Arrival & Welcome',
      description:
        'Arrive at your destination, meet your guide, and settle into your accommodation. Evening welcome dinner with local cuisine.',
    },
    {
      day: 'Day 2',
      title: `Explore ${destination.name}`,
      description: `Guided tour of ${destination.name}'s main attractions. Lunch at a local restaurant followed by free time to explore on your own.`,
    },
    {
      day: 'Day 3',
      title: 'Cultural Experience',
      description:
        'Immerse yourself in local culture with hands-on activities and interactions with local artisans and families.',
    },
    {
      day: 'Day 4',
      title: 'Nature & Adventure',
      description: `Experience the natural beauty of ${destination.name} with your choice of hiking, snorkeling, or wildlife watching.`,
    },
    {
      day: 'Day 5',
      title: 'Departure',
      description:
        'Final breakfast, souvenir shopping, and transfer to airport for departure.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="h-[80vh] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
        </div>

        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-20">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span className="text-white/90 text-lg">
                {destination.country}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {destination.name}
            </h1>
            <div className="flex items-center mb-6">
              <div className="flex mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                    fill={
                      i < Math.floor(destination.rating)
                        ? 'currentColor'
                        : 'none'
                    }
                  />
                ))}
                <span className="text-white ml-2">{destination.rating}</span>
              </div>
              <span className="text-white/70">|</span>
              <span className="text-white/70 ml-4">{destination.category}</span>
            </div>
            <p className="text-white/90 text-lg mb-8">
              {destination.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full">
                View Tour Packages
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-white border-white hover:bg-white/10"
              >
                Save to Wishlist
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  About {destination.name}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {destination.name} is a mesmerizing destination located in the
                  heart of {destination.country}. Known for its breathtaking
                  beauty and rich cultural heritage, it offers visitors an
                  unforgettable experience. The region is famous for its
                  stunning landscapes, delicious cuisine, and warm hospitality.
                </p>
                <p className="text-muted-foreground">
                  Visitors to {destination.name} can enjoy a wide range of
                  activities, from exploring ancient landmarks to indulging in
                  outdoor adventures. The local culture is vibrant and
                  welcoming, making it easy to immerse yourself in authentic
                  experiences. Whether you're seeking relaxation, adventure, or
                  cultural enrichment,
                  {destination.name} has something special to offer every
                  traveler.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Activities & Experiences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="bg-card shadow-md rounded-xl overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={`https://source.unsplash.com/random/600x400?${activity.toLowerCase()},travel`}
                          alt={activity}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold mb-2">
                          {activity}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Experience the thrill and beauty of {activity} in the
                          stunning surroundings of {destination.name}.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Sample Itinerary</h2>
                <div className="space-y-4">
                  {itinerary.map((item, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-primary pl-4 pb-6 relative"
                    >
                      {index !== itinerary.length - 1 && (
                        <div className="absolute bottom-0 left-[-8px] w-3 h-3 rounded-full bg-primary"></div>
                      )}
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                        {item.day}
                      </span>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-4">Traveler Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={`https://source.unsplash.com/random/300x300?${destination.name.toLowerCase()},travel,${index}`}
                        alt={`${destination.name} photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="rounded-full">
                    View Gallery
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Booking & Info */}
            <div className="space-y-8">
              <motion.div
                className="bg-card rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-4">Tour Package</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Starting from</span>
                    <span className="text-xl font-bold text-primary">
                      {destination.price}
                    </span>
                  </div>
                  <div className="h-px bg-border"></div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">5-7 Days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">Group Size</p>
                      <p className="text-sm text-muted-foreground">
                        Max 12 people
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {destination.name}, {destination.country}
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="w-full rounded-full">Book Now</Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  No payment required to reserve - pay later
                </p>
              </motion.div>

              <motion.div
                className="bg-card rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Weather & Climate
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Best time to visit</span>
                    <span className="font-medium">Mar-Jun, Sep-Nov</span>
                  </div>
                  <div className="h-px bg-border"></div>
                  <div>
                    <p className="font-medium mb-2">Average Temperatures</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-muted p-2 rounded">
                        <p>Summer: 25-32°C</p>
                      </div>
                      <div className="bg-muted p-2 rounded">
                        <p>Winter: 15-22°C</p>
                      </div>
                      <div className="bg-muted p-2 rounded">
                        <p>Spring: 18-25°C</p>
                      </div>
                      <div className="bg-muted p-2 rounded">
                        <p>Fall: 17-24°C</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-muted rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Related Destinations
                </h2>
                <div className="space-y-3">
                  {destinations
                    .filter(
                      d =>
                        d.id !== destination.id &&
                        d.category === destination.category
                    )
                    .slice(0, 3)
                    .map(relatedDest => (
                      <div
                        key={relatedDest.id}
                        className="flex items-center bg-card rounded-lg overflow-hidden"
                      >
                        <div className="w-20 h-20">
                          <img
                            src={relatedDest.image}
                            alt={relatedDest.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 flex-grow">
                          <h3 className="font-medium">{relatedDest.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {relatedDest.country}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground mr-3" />
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Explore {destination.name}?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Book your trip with our trusted travel partners and get the
                  best deals on accommodations, transportation, and guided
                  tours.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full">Find Tour Packages</Button>
                  <Button variant="outline" className="rounded-full">
                    Contact a Travel Expert
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src={`https://source.unsplash.com/random/800x600?${destination.name.toLowerCase()},scenic`}
                  alt={`${destination.name} landscape`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
