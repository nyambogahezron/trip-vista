import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { name, location, image, rating, price, category } = destination;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute top-4 right-4 bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
          ${price}
        </div>
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs font-medium px-2 py-1 rounded-full capitalize">
          {category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <button className="w-full text-primary-600 dark:text-primary-400 font-medium py-2 flex justify-center items-center hover:bg-primary-50 dark:hover:bg-gray-700 rounded-md transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;