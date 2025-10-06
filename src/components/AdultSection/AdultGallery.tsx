import React, { useState, useRef } from 'react';
import { Play, Heart, Siren as Fire, VolumeX, Volume2, Maximize, Pause, X } from 'lucide-react'
interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  title: string;
  category: 'intimate' | 'playful' | 'romantic' | 'explicit';
}

const AdultGallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample adult content - replace with your actual content
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Intimate Moment',
      category: 'intimate'
    },
    {
      id: '2',
      type: 'video',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Private Video',
      category: 'explicit'
    },
    {
      id: '3',
      type: 'image',
      src: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Playful Tease',
      category: 'playful'
    },
    {
      id: '4',
      type: 'image',
      src: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Romantic Evening',
      category: 'romantic'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🔥' },
    { id: 'intimate', name: 'Intimate', icon: '💋' },
    { id: 'playful', name: 'Playful', icon: '😈' },
    { id: 'romantic', name: 'Romantic', icon: '❤️' },
    { id: 'explicit', name: 'Explicit', icon: '🔞' }
  ];

  const filteredMedia = activeCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory);

  const openLightbox = (media: MediaItem) => {
    setSelectedMedia(media);
    if (media.type === 'video' && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Private Gallery
          </h1>
          <p className="text-red-300 text-xl">
            Our most intimate moments, for your eyes only 🔥
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-black/40 text-red-300 hover:bg-red-600/20 border border-red-500/30'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => openLightbox(item)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-red-600/80 rounded-full backdrop-blur-sm">
                      <Play className="text-white" size={32} fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-red-300 text-sm capitalize">{item.category}</span>
                    <div className="flex items-center space-x-2">
                      <Heart className="text-red-400" size={20} />
                      <Fire className="text-orange-400" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full max-h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-3 bg-red-600/20 hover:bg-red-600/40 rounded-full backdrop-blur-sm transition-colors duration-200"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Media Content */}
              <div className="w-full h-full flex flex-col items-center justify-center">
                {selectedMedia.type === 'image' ? (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    draggable={false}
                  />
                ) : (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={selectedMedia.src}
                      className="max-w-full max-h-[80vh] rounded-lg"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      draggable={false}
                    />
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={togglePlay}
                          className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-full transition-colors duration-200"
                        >
                          {isPlaying ? (
                            <Pause size={20} className="text-white" />
                          ) : (
                            <Play size={20} className="text-white ml-1" />
                          )}
                        </button>
                        
                        <button
                          onClick={toggleMute}
                          className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-full transition-colors duration-200"
                        >
                          {isMuted ? (
                            <VolumeX size={20} className="text-white" />
                          ) : (
                            <Volume2 size={20} className="text-white" />
                          )}
                        </button>
                      </div>

                      <button className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-full transition-colors duration-200">
                        <Maximize size={20} className="text-white" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Media Info */}
                <div className="mt-6 text-center max-w-2xl">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {selectedMedia.title}
                  </h3>
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-red-300 capitalize">{selectedMedia.category}</span>
                    <div className="flex items-center space-x-2">
                      <Heart className="text-red-400" size={20} fill="currentColor" />
                      <Fire className="text-orange-400" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdultGallery;