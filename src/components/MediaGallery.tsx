import React, { useEffect, useRef, useState } from 'react';
import { Image, Play, Download, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInUp } from '../utils/animations';
import { MediaItem } from '../types';

const MediaGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      src: '/src/assets/cheek2.JPG',
      title: 'Our Little Parked Car conversations',
      description: 'My favorite because its just the two of us ❤️',
      thumbnail: '/src/assets/cheek2.JPG'
    },
    {
      id: '2',
      type: 'image',
      src: '/src/assets/cheekkiss1.JPG',
      title: 'Love to give you kisses',
      description: 'Every kiss is magic! 😘',
      thumbnail: '/src/assets/cheekkiss1.JPG'
    },
    {
      id: '3',
      type: 'video',
      src: '/src/assets/goofygitl.MP4',
      title: 'Your Unfiltered videos are the Best',
      description: 'I love when you send me these silly videos 😂',
      thumbnail: '/src/assets/SIII3316.JPG'
    },
    {
      id: '4',
      type: 'image',
      src: '/src/assets/hands1.JPG',
      title: 'When i hold your hand I feel complete',
      description: 'Everything feels better again and I love that feeling 🌟',
      thumbnail: '/src/assets/hands1.JPG'
    },
    {
      id: '5',
      type: 'image',
      src: '/src/assets/longlocks.JPG',
      title: 'Your beautiful smile makes my days brighter',
      description: 'Never stop smiling, my love! 😊',
      thumbnail: '/src/assets/longlocks.JPG'
    },
    {
      id: '6',
      type: 'video',
      src: '/src/assets/cute1.MP4',
      title: 'You are absolutely Beautiful',
      description: 'I can never find the right words to describe your beauty 😍',
      thumbnail: '/src/assets/SIII3316.JPG'
    }
  ];

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fadeInUp(entry.target as HTMLElement);
            }
          });
        },
        { threshold: 0.1 }
      );

      const mediaElements = sectionRef.current.querySelectorAll('.media-item');
      mediaElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  const openLightbox = (media: MediaItem, index: number) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + mediaItems.length) % mediaItems.length
      : (currentIndex + 1) % mediaItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedMedia(mediaItems[newIndex]);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4" ref={sectionRef}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Image size={16} />
              <span>Memory Gallery</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              My Favorites.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every picture and video i ever got from you or with you is my favorite, here are a few of the cutest ones 📸✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map((item, index) => (
              <div
                key={item.id}
                className="media-item opacity-0 transform translate-y-8 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(item, index)}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                          <Play className="text-white" size={24} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Heart decoration */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="text-red-400" size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Stats */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{mediaItems.length}</div>
                <div className="text-sm text-gray-600 mt-1">Memories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">∞</div>
                <div className="text-sm text-gray-600 mt-1">Love</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">365</div>
                <div className="text-sm text-gray-600 mt-1">Days of Joy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateMedia('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <button
              onClick={() => navigateMedia('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Media Content */}
            <div className="w-full h-full flex flex-col items-center justify-center">
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  className="max-w-full max-h-[80vh] rounded-lg"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              )}
              
              {/* Media Info */}
              <div className="mt-6 text-center max-w-2xl">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {selectedMedia.title}
                </h3>
                <p className="text-white/80 text-lg">
                  {selectedMedia.description}
                </p>
                <div className="flex items-center justify-center mt-4 space-x-4">
                  <span className="text-white/60 text-sm">
                    {currentIndex + 1} of {mediaItems.length}
                  </span>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors duration-200">
                    <Download size={16} className="text-white" />
                    <span className="text-white text-sm">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaGallery;