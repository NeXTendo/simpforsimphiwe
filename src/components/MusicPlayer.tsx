import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Music, Heart, Download } from 'lucide-react';

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration: string;
  cover?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isOpen, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Sample playlist - replace with your actual music files
  const playlist: Track[] = [
    {
      id: '1',
      title: 'Our Song',
      artist: 'Love Collection',
      src: '/music/girl in red - we fell in love in october.mp3',
      duration: '3:45',
      cover: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Birthday Serenade',
      artist: 'Romantic Melodies',
      src: '/music/birthday-serenade.mp3',
      duration: '4:12',
      cover: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'Forever Yours',
      artist: 'Love Ballads',
      src: '/music/forever-yours.mp3',
      duration: '3:28',
      cover: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      title: 'Dancing in Love',
      artist: 'Sweet Harmonies',
      src: '/music/dancing-in-love.mp3',
      duration: '3:56',
      cover: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];
const nextTrack = useCallback(() => {
  if (isShuffled) {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    setCurrentTrack(randomIndex);
  } else {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  }
  setIsPlaying(false);
}, [isShuffled, playlist.length]);

useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const updateTime = () => setCurrentTime(audio.currentTime);
  const updateDuration = () => setDuration(audio.duration);
  const handleEnded = () => {
    if (isRepeating) {
      audio.currentTime = 0;
      audio.play();
    } else {
      nextTrack();
    }
  };

  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('loadedmetadata', updateDuration);
  audio.addEventListener('ended', handleEnded);

  return () => {
    audio.removeEventListener('timeupdate', updateTime);
    audio.removeEventListener('loadedmetadata', updateDuration);
    audio.removeEventListener('ended', handleEnded);
  };
}, [currentTrack, isRepeating, nextTrack]);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  const currentSong = playlist[currentTrack];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Music className="text-pink-400" size={24} />
            <h2 className="text-xl font-bold text-white">Music Player</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Current Track Display */}
        <div className="p-6 text-center">
          <div className="relative mb-6">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-48 h-48 mx-auto rounded-2xl shadow-lg object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">{currentSong.title}</h3>
          <p className="text-pink-300 mb-4">{currentSong.artist}</p>

          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-white/70 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isShuffled ? 'bg-pink-600 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <Shuffle size={20} />
            </button>

            <button
              onClick={prevTrack}
              className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <SkipBack size={24} />
            </button>

            <button
              onClick={togglePlay}
              className="p-4 bg-pink-600 hover:bg-pink-700 rounded-full text-white transition-colors duration-200"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>

            <button
              onClick={nextTrack}
              className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <SkipForward size={24} />
            </button>

            <button
              onClick={() => setIsRepeating(!isRepeating)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isRepeating ? 'bg-pink-600 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <Repeat size={20} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3 mb-6">
            <button onClick={toggleMute} className="text-white/70 hover:text-white">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white/70 text-sm w-8">{Math.round((isMuted ? 0 : volume) * 100)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isLiked ? 'bg-red-600 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Playlist */}
        <div className="border-t border-white/10 max-h-64 overflow-y-auto">
          <div className="p-4">
            <h4 className="text-white font-semibold mb-3">Playlist</h4>
            <div className="space-y-2">
              {playlist.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    index === currentTrack
                      ? 'bg-pink-600/30 border border-pink-500/50'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium text-sm">{track.title}</p>
                    <p className="text-white/60 text-xs">{track.artist}</p>
                  </div>
                  <span className="text-white/60 text-xs">{track.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={currentSong.src}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;