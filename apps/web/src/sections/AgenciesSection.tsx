import React from 'react';
import { motion } from 'framer-motion';
import AgencyCard from '../components/AgencyCard';
import Button from '../components/Button';
import { agencies } from '../data/agencies';

const AgenciesSection: React.FC = () => {
  return (
    <section id="agencies" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Travel Agencies
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Partner with professional travel agencies that offer exceptional service and unforgettable experiences
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {agencies.map((agency, index) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outlined">
            View All Agencies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AgenciesSection;