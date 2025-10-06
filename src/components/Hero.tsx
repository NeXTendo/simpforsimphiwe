import React, { useEffect, useRef, useState } from 'react';
import { Heart, Gift, Sparkles } from 'lucide-react';
import { triggerHeartConfetti, fadeInUp, floatingAnimation } from '../utils/animations';
import VideoModal from './VideoModal';

interface HeroProps {
  name: string;
}

const Hero: React.FC<HeroProps> = ({ name }) => {
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      fadeInUp(heroRef.current);
    }
    
    // Start floating animation for hearts
    setTimeout(() => {
      floatingAnimation('.floating-heart');
    }, 1000);
  }, []);

  const handleOpenGift = () => {
    triggerHeartConfetti();
    setShowVideo(true);
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 overflow-hidden">
        {/* Floating Hearts Background */}
        <div ref={heartsRef} className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Heart
              key={i}
              className={`floating-heart absolute text-white/20 animate-bounce`}
              size={Math.random() * 30 + 20}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Sparkle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-yellow-300/40 animate-pulse"
              size={Math.random() * 25 + 15}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div
          ref={heroRef}
          className="relative z-10 flex items-center justify-center min-h-screen p-4"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-dancing">
                Happy Birthday
              </h1>
              <h2 className="text-4xl md:text-6xl text-pink-200 mb-6 font-satisfy">
                {name} 💖
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Today I Celebrate my Girrl's birthday, this month is all about you fr, the most amazing person in the world.
                Hope you like it! 🎉🎂
              </p>
            </div>

            <button
              onClick={handleOpenGift}
              className="group relative px-12 py-6 bg-white text-pink-600 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3">
                <Gift className="group-hover:rotate-12 transition-transform duration-300" size={28} />
                <span>Open Your Gift</span>
                <Heart className="group-hover:scale-125 transition-transform duration-300 text-red-500" size={24} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            <div className="mt-16 flex justify-center space-x-8 text-white/70">
              <div className="text-center">
                <div className="text-3xl font-bold">♥</div>
                <div className="text-sm mt-2">Made with Love</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm mt-2">Forever Yours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">⭐</div>
                <div className="text-sm mt-2">You're my Star</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="text-center">
            <div className="text-sm mb-2">Scroll for more stuffs</div>
            <div className="w-1 h-8 bg-white/40 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <VideoModal onClose={() => setShowVideo(false)} />
      )}
    </>
  );
};

export default Hero;