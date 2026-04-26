'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useContextMenu } from '@/context/ContextMenuContext';
import { Song } from '@/lib/types';
import styles from './SongCard.module.css';

interface SongCardProps {
  song: Song;
  index?: number; // Optional index for lists
}

export default function SongCard({ song, index }: SongCardProps) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const { openMenu } = useContextMenu();
  const isCurrent = currentSong?.id === song.id;

  return (
    <div className={styles.card} onClick={() => playSong(song)} onContextMenu={(e) => openMenu(e, song)}>
      <div className={styles.coverWrapper}>
        <Image
          src={song.cover}
          alt={song.title}
          fill
          className={styles.cover}
          unoptimized
        />
        <div className={`${styles.overlay} ${isCurrent && isPlaying ? styles.activeOverlay : ''}`}>
          <button
            className={styles.playBtn}
            onClick={(e) => {
              e.stopPropagation();
              playSong(song);
            }}
            aria-label={`Play ${song.title}`}
          >
            <Play size={20} fill="currentColor" />
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={`${styles.title} ${isCurrent ? styles.activeTitle : ''}`}>
          {song.title}
        </h3>
        <p className={styles.artist}>{song.artist}</p>
      </div>
    </div>
  );
}
