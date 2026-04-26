'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Maximize2, Mic2 } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import AudioVisualizer from '@/components/ui/AudioVisualizer';
import { songs } from '@/lib/data';
import styles from './music.module.css';

// LRC Parser helper
const parseLRC = (lrcStr: string) => {
  const lines = lrcStr.split('\n');
  const result: { time: number; text: string }[] = [];
  
  const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
  lines.forEach(line => {
    const match = timeReg.exec(line);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseInt(match[2]);
      const ms = parseInt(match[3]);
      const timeInSec = min * 60 + sec + (ms / 1000);
      const text = line.replace(timeReg, '').trim();
      result.push({ time: timeInSec, text });
    } else if (line.trim() !== '') {
      // Just a string payload without time
      result.push({ time: 0, text: line.trim() });
    }
  });
  return result;
};

export default function MusicLyricsPage({ params }: { params: { id: string } }) {
  const { isPlaying, togglePlay, nextSong, prevSong, isShuffle, toggleShuffle, isRepeat, toggleRepeat, currentTime, duration } = usePlayer();
  const song = songs.find(s => s.id === params.id) || songs[0];
  const [activeLine, setActiveLine] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const parsedLyrics = song.lyrics ? parseLRC(song.lyrics) : [];

  // Sync Karaoke Engine
  useEffect(() => {
    if (parsedLyrics.length > 0) {
      // Find the active line based on currentTime
      let nextLineIndex = parsedLyrics.findIndex(line => line.time > currentTime);
      if (nextLineIndex === -1) nextLineIndex = parsedLyrics.length; // End of song
      
      const currentIdx = Math.max(0, nextLineIndex - 1);
      
      if (currentIdx !== activeLine) {
        setActiveLine(currentIdx);
        // Scroll magic
        const lineEl = document.getElementById(`lyric-line-${currentIdx}`);
        if (lineEl && scrollRef.current) {
          lineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [currentTime, parsedLyrics, activeLine]);
  
  if (!song) {
    notFound();
  }

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      {/* Background Layer: Render Canvas Video or Fallback to Cover Blur */}
      {song.canvasUrl ? (
        <video 
          className={styles.canvasVideo}
          src={song.canvasUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div 
          className={styles.bgBlur} 
          style={{ backgroundImage: `url(${song.cover})` }}
        />
      )}
      <div className={styles.bgOverlay} />

      <div className={styles.content}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <button className="btn btn-icon"><Maximize2 size={18} /></button>
          <div className={styles.playingFrom}>
            <p className={styles.playingSubtitle}>PLAYING FROM ALBUM</p>
            <p className={styles.playingTitle}>{song.album}</p>
          </div>
          <button className="btn btn-icon"><Mic2 size={18} /></button>
        </div>

        <div className={styles.mainLayout}>
          {/* Left Column: Artwork and Controls */}
          <div className={styles.leftCol}>
            <div className={styles.artworkWrapper}>
              <Image src={song.cover} alt={song.title} fill className={styles.artwork} unoptimized priority />
            </div>

            <div className={styles.trackInfo}>
              <div className={styles.infoText}>
                <h1 className={styles.songTitle}>{song.title}</h1>
                <p className={styles.songArtist}>{song.artist}</p>
              </div>
              <button className={styles.likeBtn}><Heart size={24} /></button>
            </div>

            {/* Dynamic Waveform Visualizer */}
            <div className={styles.waveform}>
              <AudioVisualizer />
            </div>
            
            <div className={styles.timeRow}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 0)}</span>
            </div>

            <div className={styles.controls}>
              <button className={`${styles.ctrlBtn} ${isShuffle ? styles.active : ''}`} onClick={toggleShuffle}><Shuffle size={20} /></button>
              <button className={styles.ctrlBtn} onClick={prevSong}><SkipBack size={24} /></button>
              <button className={styles.playCenterBtn} onClick={togglePlay}>
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              <button className={styles.ctrlBtn} onClick={nextSong}><SkipForward size={24} /></button>
              <button className={`${styles.ctrlBtn} ${isRepeat ? styles.active : ''}`} onClick={toggleRepeat}><Repeat size={20} /></button>
            </div>
          </div>

          {/* Right Column: Lyrics */}
          <div className={styles.rightCol}>
            <div className={styles.lyricsCard}>
              <div className={styles.lyricsHeader}>Lyrics</div>
              <div className={styles.lyricsScroll} ref={scrollRef}>
                {parsedLyrics.length > 0 ? (
                  parsedLyrics.map((line, idx) => (
                    <p 
                      key={idx}
                      id={`lyric-line-${idx}`} 
                      className={`${styles.lyricLine} ${idx === activeLine ? styles.lyricActive : ''}`}
                    >
                      {line.text}
                    </p>
                  ))
                ) : (
                  <p className={styles.lyricLine}>{song.lyrics || "No lyrics available for this song."}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
