import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-screen relative overflow-hidden">
      {/* Video or Image Background */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center z-0">
        {/* Video would be inserted here in a production setting */}
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
              icon={<MapPin size={20} />}
            >
              Explore Destinations
            </Button>
            <Button 
              variant="outlined" 
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/20"
            >
              View Tour Packages
            </Button>
          </div>
        </motion.div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;