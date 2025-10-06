import React, { useState, useEffect } from 'react';
import AdultLayout from './AdultLayout';
import AdultNavigation from './AdultNavigation';
import AdultGallery from './AdultGallery';
import AdultMessages from './AdultMessages';
import AdultCategories from './AdultCategories';
import AdultSearch from './AdultSearch';

interface AdultMainProps {
  onExit: () => void;
}

const AdultMain: React.FC<AdultMainProps> = ({ onExit }) => {
  const [activeSection, setActiveSection] = useState('gallery');

  // Clear any cached data when entering adult section
  useEffect(() => {
    // Disable browser cache for this session
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });
    }
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'gallery':
        return <AdultGallery />;
      case 'categories':
        return <AdultCategories />;
      case 'search':
        return <AdultSearch />;
      case 'messages':
        return <AdultMessages />;
      case 'videos':
        return <AdultGallery />;
      case 'timeline':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Private Timeline</h2>
              <p className="text-red-300">Coming soon... 🔥</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Private Settings</h2>
              <p className="text-red-300">Customize your experience... ⚙️</p>
            </div>
          </div>
        );
      default:
        return <AdultGallery />;
    }
  };

  return (
    <AdultLayout onExit={onExit}>
      <AdultNavigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      {renderSection()}
    </AdultLayout>
  );
};

export default AdultMain;