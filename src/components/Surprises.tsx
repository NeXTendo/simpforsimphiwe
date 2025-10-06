import React, { useEffect, useRef, useState } from 'react';
import { Gift, Star, Sparkles, Lock, Unlock } from 'lucide-react';
import { fadeInUp, triggerConfetti, typewriterEffect } from '../utils/animations';
import { getSettings, addHiddenTreasure } from '../utils/localStorage';

interface HiddenTreasure {
  id: string;
  icon: string;
  title: string;
  message: string;
  unlocked: boolean;
}

const Surprises: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const [secretCode, setSecretCode] = useState('');
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [treasures, setTreasures] = useState<HiddenTreasure[]>([
    {
      id: 'treasure-1',
      icon: '💎',
      title: 'Hidden Gem',
      message: 'You are the rarest gem in my life, more precious than any diamond! ✨',
      unlocked: false
    },
    {
      id: 'treasure-2',
      icon: '🌟',
      title: 'Shooting Star',
      message: 'Every wish I make on a shooting star is about our future together! 🌠',
      unlocked: false
    },
    {
      id: 'treasure-3',
      icon: '🎭',
      title: 'Secret',
      message: 'Here\'s a secret: I genuinely cant function if we dont talk🎪',
      unlocked: false
    },
    {
      id: 'treasure-4',
      icon: '📜',
      title: 'Ancient Scroll',
      message: 'If love were written in the stars, our story would be the brightest constellation! 📖✨',
      unlocked: false
    }
  ]);

  const secretMessages = [
    "Every morning I wake up grateful that you exist in this world... 🌅",
    "Your laugh is my favorite sound in the entire universe... 😊",
    "I keep a mental collection of all your cute expressions... 💭",
    "Sometimes I just look at you and can't believe you're real... ✨",
    "You make ordinary Tuesday afternoons feel like magic... 🌟"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current);
    }

    // Load unlocked treasures from localStorage
    const settings = getSettings();
    setTreasures(prev => prev.map(treasure => ({
      ...treasure,
      unlocked: settings.hiddenTreasuresFound.includes(treasure.id)
    })));

    // Easter egg: Konami code listener
    let konamiCode = '';
    const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      konamiCode += e.code;
      if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
      }
      
      if (konamiCode === konamiSequence) {
        triggerConfetti({ particleCount: 200, spread: 90 });
        setShowSecretMessage(true);
        konamiCode = '';
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    // Rotate secret messages
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % secretMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [secretMessages.length]);

  useEffect(() => {
    if (typewriterRef.current && showSecretMessage) {
      typewriterEffect(
        typewriterRef.current,
        "🎉 Congratulations! You found the secret code! Here's an extra special message: You are absolutely amazing and I'm so lucky to have you in my life! 💖✨"
      );
    }
  }, [showSecretMessage]);

  const unlockTreasure = (treasureId: string) => {
    setTreasures(prev => prev.map(treasure => 
      treasure.id === treasureId 
        ? { ...treasure, unlocked: true }
        : treasure
    ));
    
    addHiddenTreasure(treasureId);
    triggerConfetti({ particleCount: 50, spread: 60 });
  };

  const handleSecretCodeSubmit = () => {
    if (secretCode.toLowerCase() === 'forever') {
      setShowSecretMessage(true);
      triggerConfetti({ particleCount: 100, spread: 70 });
      setSecretCode('');
    } else {
      alert('Not quite right! Hint: It starts with "f" and describes how long our love will last... 💕');
    }
  };

  const generateRandomSurprise = () => {
    const surprises = [
      "Fun fact: You've smiled approximately 10,000 times since I've known you! 😊",
      "My favorite laugh is when you snort a little - it's adorable! 😂",
      "You voice is my favorite song 🎵",
      "Do you think i can lift you on my shoulders🤔",
      "I love when you're passionate about stuff ✨"
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    alert(randomSurprise);
    triggerConfetti({ particleCount: 30, spread: 45 });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Gift size={16} />
            <span>Hidden Surprises</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Treasure Hunt & Surprises
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Click around to discover hidden treasures, enter secret codes, 
            and unlock special surprises made just for you! 🎁✨
          </p>
        </div>

        {/* Rotating Secret Messages */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💭 Random Sweet Thought</h3>
            <p className="text-gray-700 text-lg italic min-h-[2rem] transition-all duration-500">
              {secretMessages[currentMessageIndex]}
            </p>
          </div>
        </div>

        {/* Hidden Treasures */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Hidden Treasures to Discover
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {treasures.map((treasure) => (
              <div
                key={treasure.id}
                className={`
                  bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer
                  ${treasure.unlocked 
                    ? 'ring-2 ring-green-400 shadow-green-100' 
                    : 'hover:shadow-xl hover:scale-105'
                  }
                `}
                onClick={() => !treasure.unlocked && unlockTreasure(treasure.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{treasure.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {treasure.title}
                  </h4>
                  
                  {treasure.unlocked ? (
                    <div>
                      <div className="flex items-center justify-center mb-3">
                        <Unlock className="text-green-500 mr-2" size={20} />
                        <span className="text-green-600 font-medium">Unlocked!</span>
                      </div>
                      <p className="text-gray-600 bg-green-50 p-4 rounded-xl">
                        {treasure.message}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center mb-3">
                        <Lock className="text-gray-400 mr-2" size={20} />
                        <span className="text-gray-500">Click to unlock!</span>
                      </div>
                      <p className="text-gray-400">
                        Mysterious treasure waiting to be discovered...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secret Code Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            🔐 Secret Code Challenge
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Enter the secret word that describes how long our love will last:
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex space-x-4">
              <input
                type="text"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Enter secret code..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSecretCodeSubmit()}
              />
              <button
                onClick={handleSecretCodeSubmit}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors duration-200"
              >
                Unlock
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Hint: It starts with "f" and rhymes with "however"
            </p>
          </div>
        </div>

        {/* Random Surprise Generator */}
        <div className="text-center mb-16">
          <button
            onClick={generateRandomSurprise}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <Sparkles size={24} />
              <span>Generate Random Surprise</span>
              <Star size={24} />
            </div>
          </button>
          <p className="text-gray-600 mt-4">Click for a random sweet surprise! 🎲</p>
        </div>

        {/* Konami Code Easter Egg Message */}
        {showSecretMessage && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎊 Secret Message Unlocked!
            </h3>
            <div 
              ref={typewriterRef}
              className="text-lg text-gray-700 min-h-[3rem]"
            ></div>
          </div>
        )}

        {/* Easter Egg Hint */}
        <div className="text-center">
          <div className="inline-block bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              🎮 <strong>Pro tip:</strong> Try the code (↑↑↓↓←→←→BA) for an extra surprise!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Surprises;