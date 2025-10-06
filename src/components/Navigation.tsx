import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Heart, Image, Gamepad2, Gift, Calendar, Book, Settings as SettingsIcon, Volume2, VolumeX, Lock, Music } from 'lucide-react';
import Settings from './Settings';
import MusicPlayer from './MusicPlayer';
import { getSettings, saveSettings } from '../utils/localStorage';

interface NavigationProps {
  onAdultSectionToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onAdultSectionToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const settings = getSettings();
    if (settings.backgroundMusic) {
      setMusicPlaying(true);
      // You would initialize background music here
    }
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const toggleMusic = () => {
    const newState = !musicPlaying;
    setMusicPlaying(newState);
    saveSettings({ backgroundMusic: newState });
    // You would actually start/stop music here
  };

  const navItems = [
    { label: 'Home', icon: Home, id: 'hero' },
    { label: 'Love Notes', icon: Heart, id: 'love-notes' },
    { label: 'Gallery', icon: Image, id: 'gallery' },
    { label: 'Games', icon: Gamepad2, id: 'games' },
    { label: 'Surprises', icon: Gift, id: 'surprises' },
    { label: 'Timeline', icon: Calendar, id: 'timeline' },
    { label: 'Scrapbook', icon: Book, id: 'scrapbook' },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-white/50 backdrop-blur-sm'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-dancing">
                Birthday Love ✨
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Music Toggle */}
              <button
                onClick={toggleMusic}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  musicPlaying
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={musicPlaying ? 'Pause Music' : 'Play Music'}
              >
                {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>

              {/* Adult Section Access */}
              <button
                onClick={onAdultSectionToggle}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
                title="Private Section (18+)"
              >
                <Lock size={20} />
              </button>

              {/* Music Player Toggle */}
              <button
                onClick={() => setShowMusicPlayer(true)}
                className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all duration-200"
                title="Music Player"
              >
                <Music size={20} />
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
                title="Settings"
              >
                <SettingsIcon size={20} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                
                {/* Adult Section Access - Mobile */}
                <button
                  onClick={() => {
                    onAdultSectionToggle();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <Lock size={20} />
                  <span className="font-medium">Private Section (18+)</span>
                </button>
                
                {/* Music Player Access - Mobile */}
                <button
                  onClick={() => {
                    setShowMusicPlayer(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-purple-600 hover:bg-purple-50 transition-all duration-200"
                >
                  <Music size={20} />
                  <span className="font-medium">Music Player</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Action Button for Quick Settings (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden z-30">
        <button
          onClick={() => setShowSettings(true)}
          className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
        >
          <SettingsIcon size={24} />
        </button>
      </div>

      {/* Settings Modal */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      {/* Music Player Modal */}
      <MusicPlayer isOpen={showMusicPlayer} onClose={() => setShowMusicPlayer(false)} />
    </>
  );
};

export default Navigation;