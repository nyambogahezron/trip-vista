import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import Button from '../components/Button';
import { destinations } from '../data/destinations';
import { Destination } from '../types';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'beach', label: 'Beaches' },
  { value: 'mountain', label: 'Mountains' },
  { value: 'city', label: 'Cities' },
  { value: 'countryside', label: 'Countryside' },
  { value: 'historic', label: 'Historic' },
];

const DestinationsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filteredDestinations: Destination[] = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="destinations" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Popular Destinations
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover breathtaking locations around the world, from pristine beaches to historic landmarks
          </motion.p>
        </div>
        
        {/* Category Filter (Desktop) */}
        <div className="hidden md:flex justify-center mb-10">
          <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category.value
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outlined"
            icon={<Filter size={16} />}
            className="mx-auto"
          >
            Filter Destinations
          </Button>
          
          {isFilterOpen && (
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setActiveCategory(category.value);
                    setIsFilterOpen(false);
                  }}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeCategory === category.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
        
        {/* Destinations Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredDestinations.map((destination) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
            />
          ))}
        </motion.div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button variant="primary">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;