import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, RotateCcw, Share2, Heart, Download, ArrowLeft, Clock, Eye } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  tags: string[];
  description: string;
  uploadDate: string;
}

interface AdultVideoPlayerProps {
  video: Video;
  relatedVideos: Video[];
  onVideoSelect: (video: Video) => void;
  onBack: () => void;
}

const AdultVideoPlayer: React.FC<AdultVideoPlayerProps> = ({ 
  video, 
  relatedVideos, 
  onVideoSelect, 
  onBack 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [video]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-red-500/30 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-red-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Gallery</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Eye size={16} />
              <span className="text-sm">{video.views} views</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{video.uploadDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div 
              className="relative bg-black rounded-lg overflow-hidden group"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={video.src}
                className="w-full aspect-video object-cover"
                poster={video.thumbnail}
                onClick={togglePlay}
              />

              {/* Video Controls Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                {/* Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="p-4 bg-red-600/80 hover:bg-red-600 rounded-full transition-colors duration-200"
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-300 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded">
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      
                      <button onClick={() => skipTime(-10)} className="p-2 hover:bg-white/20 rounded">
                        <SkipBack size={20} />
                      </button>
                      
                      <button onClick={() => skipTime(10)} className="p-2 hover:bg-white/20 rounded">
                        <SkipForward size={20} />
                      </button>

                      <div className="flex items-center space-x-2">
                        <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded">
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button onClick={() => videoRef.current && (videoRef.current.currentTime = 0)} className="p-2 hover:bg-white/20 rounded">
                        <RotateCcw size={20} />
                      </button>
                      
                      <button onClick={toggleFullscreen} className="p-2 hover:bg-white/20 rounded">
                        <Maximize size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-white mb-4">{video.title}</h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-red-400 font-medium">{video.category}</span>
                  <span className="text-gray-400">{video.views} views</span>
                  <span className="text-gray-400">{video.uploadDate}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isLiked ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                    <span>Like</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    <Download size={18} />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {video.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-sm hover:bg-red-600/30 cursor-pointer transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{video.description}</p>
              </div>
            </div>
          </div>

          {/* Related Videos Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-4">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <div
                  key={relatedVideo.id}
                  className="flex space-x-3 bg-gray-900 rounded-lg p-3 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                  onClick={() => onVideoSelect(relatedVideo)}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play size={16} className="text-white" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {relatedVideo.duration}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
                      {relatedVideo.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-1">{relatedVideo.category}</p>
                    <p className="text-gray-500 text-xs">{relatedVideo.views} views</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Categories */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {['Intimate', 'Passionate', 'Romantic', 'Playful', 'Explicit'].map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-4 py-2 bg-gray-900 hover:bg-red-600/20 text-gray-300 hover:text-red-300 rounded-lg transition-colors duration-200"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultVideoPlayer;