'use client';

import Image from 'next/image';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useContextMenu } from '@/context/ContextMenuContext';
import { Song } from '@/lib/types';
import styles from './SongRow.module.css';

interface SongRowProps {
  song: Song;
  index: number;
}

export default function SongRow({ song, index }: SongRowProps) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const { openMenu } = useContextMenu();
  const isCurrent = currentSong?.id === song.id;

  return (
    <div 
      className={`${styles.row} ${isCurrent ? styles.activeRow : ''}`}
      onClick={() => playSong(song)}
      onContextMenu={(e) => openMenu(e, song)}
    >
      <div className={styles.leftInfo}>
        <div className={styles.indexBox}>
          {isCurrent && isPlaying ? (
            <div className={styles.playingAnim}>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </div>
          ) : (
            <span className={styles.index}>{String(index).padStart(2, '0')}</span>
          )}
          <button className={styles.playBtn} aria-label={`Play ${song.title}`}>
            <Play size={14} fill="currentColor" />
          </button>
        </div>
        
        <div className={`${styles.coverWrapper} skeleton-shimmer`}>
          <Image
            src={song.cover}
            alt={song.title}
            fill
            className={styles.cover}
            unoptimized
          />
        </div>
        
        <div className={styles.meta}>
          <p className={`${styles.title} ${isCurrent ? styles.activeTitle : ''}`}>{song.title}</p>
          <p className={styles.artist}>{song.artist}</p>
        </div>
      </div>

      <div className={styles.plays}>
        {song.plays ? `${(song.plays / 1000000).toFixed(1)}M Plays` : ''}
      </div>

      <div className={styles.actions}>
        <span className={styles.duration}>{song.duration}</span>
        <button className={styles.iconBtn} aria-label="Like">
          <Heart size={18} />
        </button>
        <button className={styles.iconBtn} aria-label="More">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
