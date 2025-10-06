import React, { useState } from 'react';
import { Image, Video, MessageCircle, Calendar, Settings, Menu, X, Grid2x2 as Grid, Search } from 'lucide-react';

interface AdultNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdultNavigation: React.FC<AdultNavigationProps> = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'gallery', name: 'Gallery', icon: Image },
    { id: 'videos', name: 'Videos', icon: Video },
    { id: 'categories', name: 'Categories', icon: Grid },
    { id: 'search', name: 'Search', icon: Search },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'timeline', name: 'Timeline', icon: Calendar },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed left-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-black/60 backdrop-blur-md border border-red-500/30 rounded-2xl p-4">
          <div className="space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-red-300 hover:bg-red-600/20 hover:text-white'
                }`}
                title={item.name}
              >
                <item.icon size={24} />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 left-6 z-50 p-4 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-colors duration-200"
        >
          {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
            <div className="absolute bottom-20 left-6 right-6">
              <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsOpen(false);
                      }}
                      className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-red-600 text-white'
                          : 'text-red-300 hover:bg-red-600/20 hover:text-white'
                      }`}
                    >
                      <item.icon size={24} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdultNavigation;