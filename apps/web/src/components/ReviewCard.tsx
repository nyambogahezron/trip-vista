import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { name, avatar, rating, date, comment } = review;

  // Generate rating stars
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      size={18} 
      className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
    />
  ));

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">{name}</h3>
          <div className="flex mt-1">{stars}</div>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        "{comment}"
      </p>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3 mt-2">
        {date}
      </div>
    </motion.div>
  );
};

export default ReviewCard;