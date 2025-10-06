import React, { useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

interface VideoModalProps {
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  useEffect(() => {
    if (modalRef.current) {
      fadeInUp(modalRef.current);
    }
    
    // Auto-play video when modal opens
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div
        ref={modalRef}
        className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors duration-200"
        >
          <X size={24} className="text-gray-700" />
        </button>

        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            poster="/src/assets/toungue out.JPG"
          >
            <source
              src="/src/assets/edit1.MP4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
              >
                {isPlaying ? (
                  <Pause size={20} className="text-white" />
                ) : (
                  <Play size={20} className="text-white ml-1" />
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-white" />
                ) : (
                  <Volume2 size={20} className="text-white" />
                )}
              </button>
            </div>

            <div className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
              A Special Day Just For You 💕
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Your Birthday is the biggest event! 🎉
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Happy Birthday my baby🎂✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;