import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Statistic } from '../types';

interface StatCounterProps {
  stat: Statistic;
  delay?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ stat, delay = 0 }) => {
  const { label, value, suffix } = stat;
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px 0px" });
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(value * progress);
        
        setCount(currentCount);
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
      
      return () => clearInterval(counter);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={countRef}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <h3 className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400">
        {isInView ? count : 0}{suffix}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{label}</p>
    </motion.div>
  );
};

export default StatCounter;