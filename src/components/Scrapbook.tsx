import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Book, ChevronLeft, ChevronRight, Download, Heart, RotateCcw, Bookmark, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

interface ScrapbookPage {
  id: number;
  title: string;
  content: React.ReactNode;
  background: string;
}

const Scrapbook: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right');

  const pages: ScrapbookPage[] = [
    {
      id: 0,
      title: "Our Love Story",
      background: "bg-gradient-to-br from-pink-200 to-rose-200",
      content: (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-4xl md:text-6xl font-dancing text-gray-800 mb-4">
            Our Digital Scrapbook
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md">
            A collection of memories, moments, and love letters 
            preserved forever in our hearts
          </p>
          <div className="text-6xl mb-4">📖</div>
          <p className="text-sm text-gray-500">Click the arrows to turn pages</p>
        </div>
      )
    },
    {
      id: 1,
      title: "Photo Memories",
      background: "bg-gradient-to-br from-blue-100 to-indigo-200",
      content: (
        <div className="h-full p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Photo Memories</h2>
          <div className="grid grid-cols-2 gap-4 h-3/4">
            <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <img
                src="/src/assets/Baldbaby.JPG"
                alt="Memory 1"
                className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-200 p-2 rotate-12 shadow-lg">
                <p className="text-xs text-gray-700 font-handwriting">Little baby girl</p>
              </div>
            </div>
            <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="/src/assets/toungue out.JPG"
                alt="Memory 2"
                className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white"
              />
              <div className="absolute -top-2 -left-2 bg-pink-200 p-2 -rotate-12 shadow-lg">
                <p className="text-xs text-gray-700 font-handwriting">Absolutely amazing boyfriend🌟</p>
              </div>
            </div>
            <div className="relative transform rotate-1 hover:rotate-0 transition-transform duration-300 col-span-2">
              <img
                src="/src/assets/Smallgirl.JPG"
                alt="Memory 3"
                className="w-full h-24 object-cover rounded-lg shadow-lg border-4 border-white"
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-green-200 p-2 rotate-6 shadow-lg">
                <p className="text-xs text-gray-700 font-handwriting">Big Giant Head</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Love Notes Collection",
      background: "bg-gradient-to-br from-yellow-100 to-orange-200",
      content: (
        <div className="h-full p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Love Notes</h2>
          <div className="space-y-4 h-3/4 overflow-auto">
            <div className="bg-pink-100 p-4 rounded-lg transform -rotate-1 border-l-4 border-pink-400">
              <p className="text-gray-700 italic">"Your smile is my daily sunshine ☀️"</p>
              <p className="text-xs text-gray-500 mt-2">- June 15, 2025</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg transform rotate-2 border-l-4 border-purple-400">
              <p className="text-gray-700 italic">"Every day with you feels like a beautiful dream 💭"</p>
              <p className="text-xs text-gray-500 mt-2">- July 14, 2025</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg transform -rotate-2 border-l-4 border-blue-400">
              <p className="text-gray-700 italic">"You make ordinary moments extraordinary ✨"</p>
              <p className="text-xs text-gray-500 mt-2">- August 20, 2025</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg transform rotate-1 border-l-4 border-green-400">
              <p className="text-gray-700 italic">"Home is wherever you are 🏠❤️"</p>
              <p className="text-xs text-gray-500 mt-2">- July 25, 2025</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Your Journey",
      background: "bg-gradient-to-br from-purple-100 to-pink-200",
      content: (
        <div className="h-full p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Life Journey</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">☕</div>
              <div>
                <h3 className="font-bold text-gray-800">First Days on this eyth</h3>
                <p className="text-gray-600 text-sm">That little girl is all grown up now</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">💋</div>
              <div>
                <h3 className="font-bold text-gray-800">Cutest Smile in the universe</h3>
                <p className="text-gray-600 text-sm">Nobody in the universe has a better smile than you</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✈️</div>
              <div>
                <h3 className="font-bold text-gray-800">You had a crazy obsession with Hannah Montana</h3>
                <p className="text-gray-600 text-sm">Do you even listen to Miley Cyrus</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🏠</div>
              <div>
                <h3 className="font-bold text-gray-800">School Athlete Days</h3>
                <p className="text-gray-600 text-sm">I remeber you say you love to run around</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-4 rounded-lg mt-6">
              <p className="text-center text-gray-700 italic">
                "Every chapter of your life has led you to this beautiful moment with me, and I cherish every part of your journey."
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Future Dreams",
      background: "bg-gradient-to-br from-indigo-100 to-purple-200",
      content: (
        <div className="h-full p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Future Dreams</h2>
          <div className="space-y-8">
            <div className="bg-white/50 p-6 rounded-xl">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Travel the World</h3>
              <p className="text-gray-600">Exploring every corner of this planet</p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl">
              <div className="text-4xl mb-3">🏡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Build the perfect Dream Home</h3>
              <p className="text-gray-600">A cozy place filled with love, laughter, and memories</p>
            </div>
            <div className="bg-white/50 p-6 rounded-xl">
              <div className="text-4xl mb-3">👴👵</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Growing Old Together</h3>
              <p className="text-gray-600">Still holding hands when our hair turns gray</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Touch handling for mobile swipe gestures
 const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);
   const nextPage = useCallback(() => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('right');
      setTimeout(() => {
        setCurrentPage(prev => Math.min(prev + 1, pages.length - 1));
        setIsFlipping(false);
      }, 300);
    }
  }, [currentPage, isFlipping, pages.length]);

  const prevPage = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('left');
      setTimeout(() => {
        setCurrentPage(prev => Math.max(prev - 1, 0));
        setIsFlipping(false);
      }, 300);
    }
  }, [currentPage, isFlipping]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > 50;
    const isRightSwipe = distanceX < -50;
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);
    
    if (!isVerticalSwipe) {
      if (isLeftSwipe && currentPage < pages.length - 1) {
        nextPage();
      }
      if (isRightSwipe && currentPage > 0) {
        prevPage();
      }
    }
  }, [touchStart, touchEnd, currentPage, pages.length, nextPage, prevPage]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        prevPage();
      } else if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
        nextPage();
      } else if (e.key === 'Home') {
        setCurrentPage(0);
      } else if (e.key === 'End') {
        setCurrentPage(pages.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, pages.length, nextPage, prevPage]);

 useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current);
    }
  }, []);

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection(pageIndex > currentPage ? 'right' : 'left');
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsFlipping(false);
      }, 300);
    }
  };
  const toggleBookmark = () => {
    setBookmarks(prev => 
      prev.includes(currentPage) 
        ? prev.filter(p => p !== currentPage)
        : [...prev, currentPage]
    );
  };

  const resetToFirstPage = () => {
    goToPage(0);
  };

  const shareCurrentPage = () => {
    if (navigator.share) {
      navigator.share({
        title: `${pages[currentPage].title} - Little Memory Book`,
        text: 'Check out this beautiful page from your digital scrapbook!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Book size={16} />
            <span>Digital Scrapbook</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Your Memory Book
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turn the pages of your life story, from first moments to future dreams. 
            Each page holds a piece of you 📚💕
          </p>
        </div>

        {/* Scrapbook Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Enhanced Book Shadow with 3D effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg transform translate-x-3 translate-y-3 opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg transform translate-x-2 translate-y-2 opacity-20"></div>
          
          {/* Main Book */}
          <div 
            className="relative bg-amber-100 rounded-lg shadow-2xl border-4 border-amber-200 overflow-hidden cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Page Content */}
            <div className={`
              aspect-[4/3] ${pages[currentPage].background} 
              transition-all duration-300 transform-gpu
              ${isFlipping ? 
                `scale-95 ${flipDirection === 'right' ? 'rotate-y-12' : '-rotate-y-12'}` : 
                'scale-100 rotate-y-0'
              }
              ${isZoomed ? 'scale-110' : ''}
            `}>
              {pages[currentPage].content}
            </div>

            {/* Enhanced Navigation with better mobile support */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-2 md:left-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`p-3 md:p-4 rounded-full shadow-lg transition-all duration-200 touch-manipulation ${
                  currentPage === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-110 active:scale-95'
                }`}
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            
            <div className="absolute top-1/2 transform -translate-y-1/2 right-2 md:right-4">
              <button
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                className={`p-3 md:p-4 rounded-full shadow-lg transition-all duration-200 touch-manipulation ${
                  currentPage === pages.length - 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-110 active:scale-95'
                }`}
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            {/* Enhanced Page Indicator with thumbnails */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="text-xs md:text-sm text-gray-600 font-medium">
                  Page {currentPage + 1} of {pages.length}
                </span>
                <div className="flex space-x-1">
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 touch-manipulation ${
                        index === currentPage 
                          ? 'bg-pink-500 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400 active:scale-90'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bookmark indicator */}
            {bookmarks.includes(currentPage) && (
              <div className="absolute top-0 right-8 transform -translate-y-2">
                <Bookmark className="text-red-500 fill-current" size={24} />
              </div>
            )}
          </div>

          {/* Enhanced Controls */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            <button
              onClick={resetToFirstPage}
              className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-white hover:bg-gray-50 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation"
            >
              <RotateCcw size={16} className="md:w-5 md:h-5 text-gray-700" />
              <span className="text-gray-700 text-sm md:text-base">Reset</span>
            </button>

            <button
              onClick={toggleBookmark}
              className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation ${
                bookmarks.includes(currentPage)
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Bookmark size={16} className="md:w-5 md:h-5" fill={bookmarks.includes(currentPage) ? 'currentColor' : 'none'} />
              <span className="text-sm md:text-base">
                {bookmarks.includes(currentPage) ? 'Bookmarked' : 'Bookmark'}
              </span>
            </button>

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-white hover:bg-gray-50 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation"
            >
              {isZoomed ? <ZoomOut size={16} className="md:w-5 md:h-5 text-gray-700" /> : <ZoomIn size={16} className="md:w-5 md:h-5 text-gray-700" />}
              <span className="text-gray-700 text-sm md:text-base">{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
            </button>

            <button
              className="flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              onClick={() => window.print()}
            >
              <Download size={16} className="md:w-5 md:h-5 text-gray-700" />
              <span className="text-gray-700 text-sm md:text-base">Save PDF</span>
            </button>
            
            <button 
              onClick={shareCurrentPage}
              className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-blue-50 hover:bg-blue-100 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation"
            >
              <Share2 size={16} className="md:w-5 md:h-5 text-blue-600" />
              <span className="text-blue-700 text-sm md:text-base">Share</span>
            </button>

            <button className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-red-50 hover:bg-red-100 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation">
              <Heart size={16} className="md:w-5 md:h-5 text-red-500" fill="currentColor" />
              <span className="text-red-700 text-sm md:text-base">Favorite</span>
            </button>
          </div>
        </div>

        {/* Enhanced Scrapbook Stats */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{pages.length}</div>
              <div className="text-sm text-gray-600 mt-1">Pages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">∞</div>
              <div className="text-sm text-gray-600 mt-1">Memories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">1</div>
              <div className="text-sm text-gray-600 mt-1">Life Story</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{bookmarks.length}</div>
              <div className="text-sm text-gray-600 mt-1">Bookmarks</div>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mt-4">
            💡 Tip: Swipe left/right on mobile, use arrow keys on desktop, or tap page dots to navigate
          </p>
        </div>
      </div>
    </section>
  );
};

export default Scrapbook;