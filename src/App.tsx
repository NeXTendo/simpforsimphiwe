import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import AdultSection from './components/AdultSection';
import Hero from './components/Hero';
import LoveNotes from './components/LoveNotes';
import MediaGallery from './components/MediaGallery';
import MiniGames from './components/MiniGames';
import Surprises from './components/Surprises';
import Timeline from './components/Timeline';
import Scrapbook from './components/Scrapbook';
import { getSettings } from './utils/localStorage';

function App() {
  const [showAdultSection, setShowAdultSection] = React.useState(false);
  const herName = "My Nana"; // Customize this name

  useEffect(() => {
    // Apply theme on app load
    const settings = getSettings();
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Apply reduce motion setting
    if (settings.reduceMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    }

    // Add custom CSS variables for theme
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.style.setProperty('--bg-primary', '#1f2937');
      root.style.setProperty('--bg-secondary', '#374151');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#d1d5db');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f9fafb');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#6b7280');
    }

    // Prevent right-click on images (optional protection)
    const handleRightClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleRightClick);
    return () => document.removeEventListener('contextmenu', handleRightClick);
  }, []);

  if (showAdultSection) {
    return <AdultSection onExit={() => setShowAdultSection(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onAdultSectionToggle={() => setShowAdultSection(true)} />
      
      <main>
        <section id="hero">
          <Hero name={herName} />
        </section>
        
        <section id="love-notes">
          <LoveNotes />
        </section>
        
        <section id="gallery">
          <MediaGallery />
        </section>
        
        <section id="games">
          <MiniGames />
        </section>
        
        <section id="surprises">
          <Surprises />
        </section>
        
        <section id="timeline">
          <Timeline />
        </section>
        
        <section id="scrapbook">
          <Scrapbook />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-100 to-purple-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-dancing">
              Happy Birthday, {herName}! 🎉
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thank you for being the most amazing person in my life. 
              Every day with you is a gift, and I can't wait to celebrate 
              many more birthdays together. You deserve all the happiness 
              in the world! 💖✨
            </p>
          </div>

          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">∞</div>
              <div className="text-sm text-gray-600">Love</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">365</div>
              <div className="text-sm text-gray-600">Days of Joy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">1</div>
              <div className="text-sm text-gray-600">Amazing You</div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8">
            <p className="text-gray-500 text-sm">
              Made with 💖 and countless hours of love • {new Date().getFullYear()}
            </p>
            <div className="flex justify-center space-x-4 mt-4 text-2xl">
              <span className="animate-bounce">🎂</span>
              <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎈</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎁</span>
              <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>✨</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💕</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;