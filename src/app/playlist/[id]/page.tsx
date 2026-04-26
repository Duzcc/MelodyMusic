import Header from '@/components/layout/Header';
import Image from 'next/image';
import { Play } from 'lucide-react';
import styles from './playlist.module.css';
import SongRow from '@/components/ui/SongRow';
import { useLibrary } from '@/context/LibraryContext';
import { usePlayer } from '@/context/PlayerContext';
import { notFound } from 'next/navigation';
import { songs as mockSongs } from '@/lib/data';

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const { customPlaylists } = useLibrary();
  const { playSong } = usePlayer();
  
  const playlist = customPlaylists.find(p => p.id === params.id);
  
  if (!playlist) {
    return notFound();
  }

  // Hydrate actual songs from IDs
  // If the mock DB lacks the ID for some reason, we fallback.
  // We can just find songs from mock data that match the ids.
  const playlistSongs = playlist.songIds.map(id => mockSongs.find(s => s.id === id)).filter(Boolean) as typeof mockSongs;

  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0]); 
      // If we implemented setQueue in Context, we would queue all here.
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.bgBlur} style={{ backgroundImage: `url(${playlist.cover})` }} />
          <div className={styles.heroContent}>
            <div className={styles.coverWrapper}>
              <Image src={playlist.cover} alt={playlist.title} fill className={styles.cover} unoptimized />
            </div>
            <div className={styles.meta}>
              <p className={styles.type}>PUBLIC PLAYLIST</p>
              <h1 className={styles.title}>{playlist.title}</h1>
              <p className={styles.description}>{playlist.description}</p>
              <div className={styles.stats}>
                <span className={styles.author}>You</span> • 
                <span>{playlist.songCount} songs</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.actions}>
            <button className={styles.playBtn} onClick={handlePlayAll} aria-label="Play all">
              <Play size={24} fill="currentColor" />
            </button>
          </div>

          <div className={styles.trackList}>
            <div className={styles.listHeader}>
              <span>#</span>
              <span>Title</span>
              <span>Plays</span>
              <span><Clock size={16} /></span>
            </div>
            
            {playlistSongs.length > 0 ? (
              <div className={styles.songs}>
                {playlistSongs.map((song, i) => (
                  <SongRow key={song.id} song={song} index={i + 1} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>This playlist is currently empty.</p>
                <p style={{fontSize: '14px', color: 'var(--text-muted)'}}>Right click any song to add it here!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

import { Clock } from 'lucide-react';
