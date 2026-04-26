'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, VolumeX, Heart, ListMusic, Maximize2, UserSquare2, ListVideo
} from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './MusicPlayer.module.css';

export default function MusicPlayer() {
  const {
    currentSong, isPlaying, volume, isMuted, isShuffle, isRepeat, progress,
    currentTime, duration, queue,
    togglePlay, setVolume, toggleMute, setProgress, nextSong, prevSong,
    showRightSidebar, toggleRightSidebar, toggleShuffle, toggleRepeat
  } = usePlayer();
  const [showQueue, setShowQueue] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // No longer faking progress here; PlayerContext handles it via Audio element
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, pct)));
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.player}>
      {/* Song Info */}
      <div className={styles.songInfo}>
        {currentSong ? (
          <>
            <div className={styles.cover}>
              <Image
                src={currentSong.cover}
                alt={currentSong.title}
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
            <div className={styles.meta}>
              <p className={styles.songTitle}>{currentSong.title}</p>
              <p className={styles.songArtist}>{currentSong.artist}</p>
            </div>
            <button
              className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
              onClick={() => setIsLiked(!isLiked)}
              aria-label="Like song"
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </>
        ) : (
          <div className={styles.noSong}>
            <div className={styles.coverPlaceholder}>
              <ListMusic size={20} />
            </div>
            <div className={styles.meta}>
              <p className={styles.songTitle}>No song playing</p>
              <p className={styles.songArtist}>Select a song to play</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlBtns}>
          <button
            className={`${styles.ctrlBtn} ${isShuffle ? styles.active : ''}`}
            onClick={toggleShuffle}
            aria-label="Shuffle"
          >
            <Shuffle size={16} />
          </button>
          <button className={styles.ctrlBtn} onClick={prevSong} aria-label="Previous">
            <SkipBack size={18} />
          </button>
          <MagneticButton>
            <button
              className={styles.playBtn}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
          </MagneticButton>
          <button className={styles.ctrlBtn} onClick={nextSong} aria-label="Next">
            <SkipForward size={18} />
          </button>
          <button
            className={`${styles.ctrlBtn} ${isRepeat ? styles.active : ''}`}
            onClick={toggleRepeat}
            aria-label="Repeat"
          >
            <Repeat size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressRow}>
          <span className={styles.time}>
            {formatTime(currentTime)}
          </span>
          <div
            className={styles.progressBar}
            ref={progressRef}
            onClick={handleProgressClick}
            role="slider"
            aria-label="Song progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.progressFill} style={{ width: `${progress}%` }}>
              <div className={styles.progressThumb} />
            </div>
          </div>
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Extra */}
      <div className={styles.extras}>
        <button 
          className={`${styles.ctrlBtn} ${showQueue ? styles.active : ''}`}
          onClick={() => setShowQueue(!showQueue)}
          aria-label="Queue"
        >
          <ListVideo size={16} />
        </button>
        <button
          className={styles.ctrlBtn}
          onClick={toggleMute}
          aria-label="Toggle mute"
        >
          {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <div className={styles.volumeBar}>
          <input
            type="range"
            min={0}
            max={100}
            value={isMuted ? 0 : volume}
            onChange={e => setVolume(Number(e.target.value))}
            className={styles.volumeSlider}
            aria-label="Volume"
          />
        </div>
        <button 
          className={styles.ctrlBtn} 
          onClick={toggleRightSidebar}
          aria-label="Now Playing View"
        >
          <UserSquare2 size={16} color={showRightSidebar ? 'var(--accent-pink)' : 'currentColor'} />
        </button>
        <button className={styles.ctrlBtn} aria-label="Fullscreen">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Up Next / Queue UI */}
      {showQueue && (
        <div className={styles.queuePanel}>
          <div className={styles.queueHeader}>
            <h3 className={styles.queueTitle}>Queue</h3>
          </div>
          <div className={styles.queueList}>
            {currentSong && (
              <>
                <h4 className={styles.queueSubtitle}>Now Playing</h4>
                <div className={`${styles.queueItem} ${styles.active}`}>
                  <Image src={currentSong.cover} alt={currentSong.title} width={40} height={40} className={styles.queueItemCover} unoptimized />
                  <div style={{flex: 1}}>
                    <p className={styles.queueItemTitle}>{currentSong.title}</p>
                    <p className={styles.queueItemArtist}>{currentSong.artist}</p>
                  </div>
                </div>
              </>
            )}
            <h4 className={styles.queueSubtitle}>Up Next</h4>
            {queue.map((song, i) => (
               <div key={`queue-${i}`} className={styles.queueItem} >
                 <Image src={song.cover} alt={song.title} width={40} height={40} className={styles.queueItemCover} unoptimized />
                 <div style={{flex: 1}}>
                   <p className={styles.queueItemTitle}>{song.title}</p>
                   <p className={styles.queueItemArtist}>{song.artist}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
