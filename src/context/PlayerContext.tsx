'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Song } from '@/lib/types';
import { useLibrary } from '@/context/LibraryContext';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  progress: number; // 0 to 100 percentage
  currentTime: number; // seconds
  duration: number; // seconds
  queue: Song[];
  showRightSidebar: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  setProgress: (p: number) => void;
  toggleRightSidebar: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  nextSong: () => void;
  prevSong: () => void;
  addToQueue: (song: Song) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const { addToHistory } = useLibrary();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fallback royalty-free track if song doesn't have one
  const getAudioUrl = (song: Song) => song.audioUrl || 'https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730ebb.mp3?filename=lofi-study-112191.mp3';

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (!audio.duration) return;
      setCurrentTime(audio.currentTime);
      setProgressState((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextSongRef.current();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    // Sync Dynamic Theme Color
    if (typeof window !== 'undefined' && currentSong?.color) {
      document.documentElement.style.setProperty('--accent-pink', currentSong.color);
      document.documentElement.style.setProperty('--accent-gradient', `linear-gradient(to right, ${currentSong.color}, #5500aa)`);
    }

    // Hydrate state from localStorage
    const savedVolume = localStorage.getItem('melodies-volume');
    if (savedVolume) {
       const v = Number(savedVolume);
       setVolumeState(v);
       audio.volume = v / 100;
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error(e));
    }
  }, [isPlaying, currentSong]);

  const playSong = useCallback((song: Song) => {
    if (!audioRef.current) return;
    
    // If clicking the same song already playing
    if (currentSong?.id === song.id) {
       togglePlay();
       return;
    }

    setCurrentSong(song);
    addToHistory(song); // Save to history
    audioRef.current.src = getAudioUrl(song);
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(e => console.error('Audio play error:', e)); // Handle browser autoplay policies
  }, [currentSong, addToHistory, togglePlay]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    setIsMuted(v === 0);
    if (audioRef.current) {
      audioRef.current.volume = v / 100;
    }
    localStorage.setItem('melodies-volume', v.toString());
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      setIsMuted(false);
      audioRef.current.volume = volume / 100;
    } else {
      setIsMuted(true);
      audioRef.current.volume = 0;
    }
  }, [isMuted, volume]);

  const setProgress = useCallback((p: number) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const newTime = (p / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgressState(p);
  }, []);

  const nextSong = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    
    // Repeat Logic for Audio end OR manual Next
    if (isRepeat && audioRef.current) {
      if (audioRef.current.currentTime >= audioRef.current.duration - 1) { // Normal playback ended
         audioRef.current.currentTime = 0;
         audioRef.current.play().catch(e => console.error(e));
         return;
      }
      // If forced next button clicked during repeat, behave normally or keep repeating? Usually it goes to next.
    }

    let nextIdx = 0;
    const idx = queue.findIndex(s => s.id === currentSong.id);

    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
      while(nextIdx === idx && queue.length > 1) {
         nextIdx = Math.floor(Math.random() * queue.length);
      }
    } else {
      nextIdx = (idx + 1) % queue.length;
    }
    
    const next = queue[nextIdx];
    if (next) playSong(next);
  }, [currentSong, queue, isShuffle, isRepeat, playSong]);

  // Keep a ref to nextSong for the 'ended' event listener to access latest closure
  const nextSongRef = useRef(nextSong);
  useEffect(() => {
    nextSongRef.current = nextSong;
  }, [nextSong]);

  // Hook OS Media Session metadata
  useEffect(() => {
    if ('mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album || 'Melodies',
        artwork: [
          { src: currentSong.cover, sizes: '512x512', type: 'image/jpeg' },
          { src: currentSong.cover, sizes: '256x256', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => { togglePlay(); });
      navigator.mediaSession.setActionHandler('pause', () => { togglePlay(); });
    }
  }, [currentSong, togglePlay]);

  const prevSong = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    
    // If playing for more than 3 seconds, previous goes to start of current song
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const idx = queue.findIndex(s => s.id === currentSong.id);
    const prev = queue[(idx - 1 + queue.length) % queue.length];
    if (prev) playSong(prev);
  }, [currentSong, queue, playSong]);

  // We assign next and prev separately to avoid cyclical hook dependencies
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('previoustrack', () => { prevSong(); });
      navigator.mediaSession.setActionHandler('nexttrack', () => { nextSong(); });
    }
  }, [nextSong, prevSong]);

  // Global Keyboard Shortcut for Spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault(); // Prevents page scrolling down
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay]);

  const addToQueue = useCallback((song: Song) => {
    setQueue(prev => [...prev, song]);
  }, []);

  // Initialize queue on mount with whatever is available (mocking queue)
  useEffect(() => {
    if (queue.length === 0) {
       import('@/lib/data').then(module => {
          setQueue(module.songs);
       });
    }
  }, [queue.length]);

  const toggleRightSidebar = useCallback(() => {
    setShowRightSidebar(prev => !prev);
  }, []);

  const toggleShuffle = useCallback(() => setIsShuffle(prev => !prev), []);
  const toggleRepeat = useCallback(() => setIsRepeat(prev => !prev), []);

  return (
    <PlayerContext.Provider value={{
      currentSong, isPlaying, volume, isMuted, isShuffle, isRepeat, progress, currentTime, duration, queue, showRightSidebar,
      playSong, togglePlay, setVolume, toggleMute, setProgress, nextSong, prevSong, addToQueue, toggleRightSidebar, toggleShuffle, toggleRepeat,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
