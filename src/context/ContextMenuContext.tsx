'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song } from '@/lib/types';
import { usePlayer } from '@/context/PlayerContext';
import { useLibrary } from '@/context/LibraryContext';
import { Heart, PlusCircle, ListPlus, Radio, UserSquare2, Share2, FolderPlus } from 'lucide-react';

interface MenuPosition {
  x: number;
  y: number;
}

interface ContextMenuContextType {
  openMenu: (e: React.MouseEvent, song: Song) => void;
  closeMenu: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

export function ContextMenuProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const [song, setSong] = useState<Song | null>(null);
  const { addToQueue } = usePlayer();
  const { toggleLike, isLiked, customPlaylists, createPlaylist, addToPlaylist } = useLibrary();
  const [showPlaylists, setShowPlaylists] = useState(false);

  const openMenu = (e: React.MouseEvent, targetSong: Song) => {
    e.preventDefault(); // prevent default browser menu
    
    // Check if right click area is far right, make sure it opens inwards
    const x = e.clientX > window.innerWidth - 200 ? e.clientX - 200 : e.clientX;
    const y = e.clientY > window.innerHeight - 300 ? e.clientY - 300 : e.clientY;
    
    setPosition({ x, y });
    setSong(targetSong);
  };

  const closeMenu = () => {
    setPosition(null);
    setSong(null);
    setShowPlaylists(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClick = () => closeMenu();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <ContextMenuContext.Provider value={{ openMenu, closeMenu }}>
      {children}
      
      {position && song && (
        <div 
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            background: 'rgba(25, 25, 30, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
            padding: '8px 0',
            width: '220px',
            zIndex: 9999, // Super high to always be on top
            display: 'flex',
            flexDirection: 'column',
            animation: 'scaleIn 0.15s ease-out',
            transformOrigin: 'top left',
          }}
          onClick={(e) => e.stopPropagation()} // Keep menu open if clicking inside it
        >
          {/* Song Info visual in menu */}
          <div style={{ padding: '8px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '8px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{song.artist}</p>
          </div>

          <MenuItem icon={<ListPlus size={16} />} text="Add to queue" onClick={() => { addToQueue(song); closeMenu(); }} />
          <MenuItem 
            icon={<Heart size={16} fill={isLiked(song.id) ? 'var(--accent-pink)' : 'none'} color={isLiked(song.id) ? 'var(--accent-pink)' : 'currentColor'} />} 
            text={isLiked(song.id) ? 'Remove from Liked' : 'Save to Liked Songs'} 
            onClick={() => { toggleLike(song); closeMenu(); }} 
          />
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '8px 0' }} />
          
          {showPlaylists ? (
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '4px 0', margin: '4px 0', borderLeft: '2px solid var(--accent-pink)' }}>
              <MenuItem icon={<FolderPlus size={14} />} text="Create New Playlist" onClick={() => {
                const name = prompt('Enter playlist name:');
                if (name) {
                  createPlaylist(name);
                  closeMenu();
                }
              }} />
              {customPlaylists.map(p => (
                <MenuItem key={p.id} icon={<PlusCircle size={14} />} text={`Add to ${p.title}`} onClick={() => { addToPlaylist(p.id, song); closeMenu(); }} />
              ))}
            </div>
          ) : (
            <MenuItem icon={<PlusCircle size={16} />} text="Add to playlist" onClick={(e) => {
              e.stopPropagation();
              setShowPlaylists(true);
            }} />
          )}

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '8px 0' }} />
          <MenuItem icon={<UserSquare2 size={16} />} text="Go to artist" onClick={closeMenu} />
          <MenuItem icon={<Share2 size={16} />} text="Share" onClick={closeMenu} />
        </div>
      )}
    </ContextMenuContext.Provider>
  );
}

function MenuItem({ icon, text, onClick }: { icon: ReactNode, text: string, onClick: (e: React.MouseEvent) => void }) {
  return (
    <button 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '10px 16px',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-primary)',
        fontSize: '13px',
        fontWeight: 500,
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ color: 'var(--text-secondary)' }}>{icon}</span>
      {text}
    </button>
  );
}

export function useContextMenu() {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error('useContextMenu must be used within ContextMenuProvider');
  return ctx;
}
