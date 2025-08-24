import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import { reviews } from '../data/reviews';

const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const visibleReviews = reviews.slice(currentIndex, currentIndex + (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1));
  
  const navigatePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const navigateNext = () => {
    setCurrentIndex(prev => Math.min(reviews.length - 1, prev + 1));
  };

  return (
    <section id="reviews" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Travelers Say
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Real experiences shared by travelers who explored the world with us
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 -ml-4 lg:-ml-6">
            <button 
              onClick={navigatePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 -mr-4 lg:-mr-6">
            <button 
              onClick={navigateNext}
              disabled={currentIndex >= reviews.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Reviews Carousel */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(reviews.length / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === Math.floor(currentIndex / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))
                    ? 'bg-primary-600 dark:bg-primary-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;