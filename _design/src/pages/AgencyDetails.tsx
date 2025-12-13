
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { agencies } from "../data/agencies";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Globe, Users, Calendar, Mail, Phone } from "lucide-react";

export default function AgencyDetails() {
  const { id } = useParams<{ id: string }>();
  const agency = agencies.find((a) => a.id === parseInt(id || "0"));

  if (!agency) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center grow text-center">
          <h1 className="text-3xl font-bold mb-4">Agency Not Found</h1>
          <p className="text-muted-foreground mb-6">The agency you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={agency.featuredImage} 
            alt={agency.name} 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <motion.div 
            className="flex flex-col items-center md:flex-row md:items-end gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background/80 shadow-lg">
              <img 
                src={agency.logo} 
                alt={`${agency.name} logo`} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-center md:text-left grow">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow mb-2">{agency.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/90">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1.5" />
                  <span className="font-medium">{agency.rating}</span>
                  <span className="text-white/70 text-sm ml-1">({agency.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-1.5" />
                  <a href={`https://${agency.website}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                    {agency.website}
                  </a>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1.5" />
                  <span>Since {agency.foundedYear}</span>
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
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: About & Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-semibold mb-4">About {agency.name}</h2>
                <p className="text-muted-foreground mb-6">{agency.description}</p>
                <p className="text-muted-foreground">
                  With over {new Date().getFullYear() - agency.foundedYear} years of experience in the travel industry, {agency.name} has been curating exceptional travel experiences across {agency.locations.length} destinations worldwide. Our team of expert travel consultants works tirelessly to create personalized itineraries that match your preferences, budget, and travel style.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Our Specialties</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agency.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center p-3 bg-muted rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
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
                className="bg-card rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Featured Tours</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg h-48">
                      <img 
                        src={`https://source.unsplash.com/random/300x200?travel,${index + 1}`} 
                        alt={`Tour ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/0 flex flex-col justify-end p-4">
                        <h3 className="text-white font-medium">
                          {agency.locations[index % agency.locations.length]} Adventure
                        </h3>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-white/90 text-sm">4.{8 - (index % 3)}</span>
                          </div>
                          <span className="text-white font-medium">$1,{800 - (index * 200)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="rounded-full">View All Tours</Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Traveler Reviews</h2>
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-muted overflow-hidden mr-3">
                            <img 
                              src={`https://i.pravatar.cc/150?img=${20 + index}`} 
                              alt="Reviewer" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">
                              {["Sarah Johnson", "Michael Chen", "Emily Davis"][index]}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {["United States", "Canada", "Australia"][index]}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 - (index % 2) ? "text-yellow-400" : "text-gray-300"}`}
                              fill={i < 5 - (index % 2) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {[
                          "Our trip was meticulously planned and executed flawlessly. The guides were knowledgeable and accommodating. Couldn't have asked for a better experience!",
                          "Great service and attention to detail. They helped us discover places we would have never found on our own.",
                          "Had an amazing adventure thanks to this agency. Will definitely book with them again for our next trip."
                        ][index]}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="rounded-full">See All {agency.reviewCount} Reviews</Button>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column: Contact & Location */}
            <div className="space-y-8">
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:info@${agency.website}`} className="text-primary hover:underline">
                        info@{agency.website}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p className="text-muted-foreground">
                        {agency.locations[0]}, with offices in {agency.locations.slice(1, 3).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">Destinations We Serve</h2>
                <div className="flex flex-wrap gap-2">
                  {agency.locations.map((location, index) => (
                    <span 
                      key={index} 
                      className="bg-muted px-3 py-1.5 rounded-full text-sm"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-primary/10 rounded-xl p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full -mr-8 -mt-8"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full -ml-16 -mb-16"></div>
                <h2 className="text-xl font-semibold mb-4 relative">Ready to Start Planning?</h2>
                <p className="text-muted-foreground mb-6 relative">
                  Contact us today and let our experts help you create your perfect journey.
                </p>
                <Button className="rounded-full w-full relative">
                  Get a Custom Itinerary
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
