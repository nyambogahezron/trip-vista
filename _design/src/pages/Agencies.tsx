
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { agencies } from "../data/agencies";
import { Star, Search, Globe, Users, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Agencies() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgencies = agencies.filter((agency) => {
    return (
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.locations.some(location => location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      agency.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-linear-to-r from-secondary/20 to-primary/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Trusted Tour Agencies</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with expert agencies who will create your perfect travel experience with local knowledge and personalized service.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search agencies by name, specialty or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>
      
      {/* Agencies List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredAgencies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No agencies found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredAgencies.map((agency) => (
                <motion.div 
                  key={agency.id}
                  className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all"
                  variants={itemVariants}
                >
                  <div className="md:flex">
                    <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                      <img 
                        src={agency.featuredImage} 
                        alt={agency.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 right-0 p-4 bg-linear-to-b from-black/70 to-transparent">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                            <img 
                              src={agency.logo} 
                              alt={`${agency.name} logo`} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="ml-auto bg-black/30 rounded-full px-3 py-1 flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-white text-sm">{agency.rating}</span>
                            <span className="text-white/70 text-xs ml-1">({agency.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-3/5">
                      <h2 className="text-2xl font-bold mb-3">{agency.name}</h2>
                      <p className="text-muted-foreground mb-4">{agency.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {agency.specialties.map((specialty, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                          <a href={`https://${agency.website}`} className="text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            {agency.website}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">Founded {agency.foundedYear}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium flex items-center">
                          <MapPinned className="h-4 w-4 mr-1" /> Operations in:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {agency.locations.map((location, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {agency.reviewCount} traveler reviews
                        </span>
                        <Link to={`/agencies/${agency.id}`}>
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
      </section>
      
      {/* Become an Agency Partner */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                  alt="Agency Partner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Are You a Tour Agency?</h2>
                <p className="text-muted-foreground mb-6">
                  Partner with ExploreX and connect with thousands of travelers looking for their next adventure. Showcase your unique tours and grow your business.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full">
                    Become a Partner
                  </Button>
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
