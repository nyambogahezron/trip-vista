import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Clock, MapPin } from 'lucide-react';
import { Agency } from '../types';
import Button from './Button';

interface AgencyCardProps {
  agency: Agency;
}

const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  const { name, logo, description, rating, specialties, founded } = agency;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img 
            src={logo} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
            <div className="flex items-center space-x-1 bg-primary-50 dark:bg-primary-900 px-2 py-1 rounded-full">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="text-gray-800 dark:text-white font-medium">{rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">Est. {founded}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">{agency.tours.length} Tours</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {specialties.map((specialty, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          <div className="mt-auto">
            <Button 
              variant="outlined" 
              icon={<Users size={16} />}
              fullWidth
            >
              View Agency Profile
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgencyCard;