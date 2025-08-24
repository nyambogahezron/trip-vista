import React from 'react';
import { motion } from 'framer-motion';
import StatCounter from '../components/StatCounter';
import { statistics } from '../data/statistics';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statistics.map((stat, index) => (
            <StatCounter 
              key={stat.label} 
              stat={stat} 
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;