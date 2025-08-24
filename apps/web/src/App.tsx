import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DestinationsSection from './sections/DestinationsSection';
import AgenciesSection from './sections/AgenciesSection';
import ReviewsSection from './sections/ReviewsSection';
import StatsSection from './sections/StatsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <Hero />
      <DestinationsSection />
      <StatsSection />
      <AgenciesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;