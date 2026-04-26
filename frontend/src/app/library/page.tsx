'use client';

import React from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { usePlayer } from '@/context/PlayerContext';
import Image from 'next/image';
import { Heart, Music4 } from 'lucide-react';
import Header from '@/components/layout/Header';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './library.module.css';

export default function LibraryPage() {
  const { likedSongs, customPlaylists } = useLibrary();
  const { playSong } = usePlayer();

  const handlePlayLiked = () => {
    if (likedSongs.length > 0) {
      playSong(likedSongs[0]); // Just plays the first one for now, context handles queue ideally
    }
  };

  return (
    <>
      <Header />
      <div className={`page-content ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Library</h1>
        </div>

        {/* Liked Songs Hero */}
        <MagneticButton>
          <div className={styles.likedCard} onClick={handlePlayLiked}>
            <Heart className={styles.likedIcon} size={64} fill="currentColor" />
            <div className={styles.likedContent}>
              <h2 className={styles.likedTitle}>Liked Songs</h2>
              <p className={styles.likedCount}>
                {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
              </p>
            </div>
          </div>
        </MagneticButton>

        <div className="section-header">
          <h2 className="section-title">Your Playlists</h2>
        </div>

        {customPlaylists.length > 0 ? (
          <div className={styles.grid}>
            {customPlaylists.map(playlist => (
              <div key={playlist.id} className={styles.playlistCard}>
                <div className={styles.coverWrap}>
                  <Image 
                    src={playlist.cover} 
                    alt={playlist.title} 
                    fill 
                    className={styles.cover} 
                    unoptimized 
                  />
                </div>
                <h3 className={styles.pTitle}>{playlist.title}</h3>
                <p className={styles.pMeta}>
                  {playlist.songCount} {playlist.songCount === 1 ? 'song' : 'songs'} • {playlist.mood}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Music4 size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
            <p className="text-big">No playlists yet</p>
            <p className="text-medium" style={{ marginTop: '8px' }}>Right click any song to create one.</p>
          </div>
        )}
      </div>
    </>
  );
}
