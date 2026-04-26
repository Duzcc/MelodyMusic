'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Song, Playlist } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export interface ExtendedPlaylist extends Playlist {
  songIds: string[];
}

interface LibraryContextType {
  customPlaylists: ExtendedPlaylist[];
  likedSongs: Song[];
  recentHistory: Song[];
  createPlaylist: (name: string) => void;
  addToPlaylist: (playlistId: string, song: Song) => void;
  toggleLike: (song: Song) => void;
  isLiked: (songId: string) => boolean;
  addToHistory: (song: Song) => void;
}

const LibraryContext = createContext<LibraryContextType | null>(null);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [customPlaylists, setCustomPlaylists] = useState<ExtendedPlaylist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [recentHistory, setRecentHistory] = useState<Song[]>([]);

  const { currentUser } = useAuth();
  
  // Prefix keys based on current user
  const prefix = currentUser ? `-${currentUser.id}` : '';

  useEffect(() => {
    // Clear state before hydrating to prevent crossover when user switches
    setCustomPlaylists([]);
    setLikedSongs([]);
    setRecentHistory([]);

    const savedPlaylists = localStorage.getItem(`melodies-playlists${prefix}`);
    const savedLikes = localStorage.getItem(`melodies-likes${prefix}`);
    const savedHistory = localStorage.getItem(`melodies-history${prefix}`);
    
    if (savedPlaylists) setCustomPlaylists(JSON.parse(savedPlaylists));
    if (savedLikes) setLikedSongs(JSON.parse(savedLikes));
    if (savedHistory) setRecentHistory(JSON.parse(savedHistory));
  }, [prefix, currentUser]);

  const savePlaylists = useCallback((p: ExtendedPlaylist[]) => {
    setCustomPlaylists(p);
    localStorage.setItem(`melodies-playlists${prefix}`, JSON.stringify(p));
  }, [prefix]);

  const saveLikes = useCallback((s: Song[]) => {
    setLikedSongs(s);
    localStorage.setItem(`melodies-likes${prefix}`, JSON.stringify(s));
  }, [prefix]);

  const saveHistory = useCallback((h: Song[]) => {
    setRecentHistory(h);
    localStorage.setItem(`melodies-history${prefix}`, JSON.stringify(h));
  }, [prefix]);

  const addToHistory = useCallback((song: Song) => {
    setRecentHistory(prev => {
      // Remove generic duplicates
      const filtered = prev.filter(s => s.id !== song.id);
      // add latest to top
      const newHistory = [song, ...filtered].slice(0, 15); // store up to 15
      saveHistory(newHistory);
      return newHistory;
    });
  }, []);

  const createPlaylist = useCallback((title: string) => {
    if (!currentUser) return alert('Please login to create playlists!');
    const newPlaylist: ExtendedPlaylist = {
      id: `custom-${Date.now()}`,
      title,
      description: `Created by ${currentUser.name}`,
      cover: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=200&auto=format&fit=crop', // generic custom cover
      songCount: 0,
      mood: 'Custom',
      songIds: [],
    };
    savePlaylists([...customPlaylists, newPlaylist]);
  }, [customPlaylists, currentUser, savePlaylists]);

  const addToPlaylist = useCallback((playlistId: string, song: Song) => {
    const updated = customPlaylists.map(p => {
      if (p.id === playlistId && !p.songIds.includes(song.id)) {
        return { ...p, songCount: p.songCount + 1, songIds: [...p.songIds, song.id] };
      }
      return p;
    });
    savePlaylists(updated);
    alert(`Added "${song.title}" to playlist!`);
  }, [customPlaylists, savePlaylists]);

  const toggleLike = useCallback((song: Song) => {
    if (!currentUser) return alert('Please login to like songs!');
    const exists = likedSongs.find(s => s.id === song.id);
    if (exists) {
      saveLikes(likedSongs.filter(s => s.id !== song.id));
    } else {
      saveLikes([...likedSongs, song]);
    }
  }, [likedSongs, saveLikes, currentUser]);

  const isLiked = useCallback((songId: string) => {
    return likedSongs.some(s => s.id === songId);
  }, [likedSongs]);

  return (
    <LibraryContext.Provider value={{
      customPlaylists, likedSongs, recentHistory, createPlaylist, addToPlaylist, toggleLike, isLiked, addToHistory
    }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider');
  return ctx;
}
