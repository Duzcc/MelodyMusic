'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/layout/Header';
import { Search } from 'lucide-react';
import { songs, artists, genres } from '@/lib/data';
import { Song } from '@/lib/types';
import SongRow from '@/components/ui/SongRow';
import styles from './search.module.css';
import Image from 'next/image';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Fetch iTunes Data
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=15`);
        const data = await res.json();
        
        const mappedSongs: Song[] = data.results.map((item: any) => ({
          id: `itunes-${item.trackId}`,
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName,
          duration: `${Math.floor(item.trackTimeMillis / 60000)}:${Math.floor((item.trackTimeMillis % 60000) / 1000).toString().padStart(2, '0')}`,
          cover: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : 'https://picsum.photos/300/300',
          audioUrl: item.previewUrl, // 30s preview audio
          genre: item.primaryGenreName,
          plays: Math.floor(Math.random() * 5000000) // fake plays for UI
        }));
        setResults(mappedSongs);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(timer);
  }, [query]);

  // 2. Identify "Top Result"
  const topResult = useMemo(() => {
    if (results.length === 0) return null;
    return results[0]; 
  }, [results]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        
        {/* Search Bar */}
        <div className={styles.header}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={24} />
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="What do you want to listen to?"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Results / Discovery State */}
        {query ? (
          <div className={styles.resultsArea}>
            {topResult && (
              <div className={styles.topResultCol}>
                <h2 className={styles.sectionTitle}>Top result</h2>
                <div className={styles.topCard} onClick={() => {}} /* Ideally routes to play song */>
                  <div className={styles.topCover}>
                    <Image src={topResult.cover} alt={topResult.title} fill className={styles.topCover} style={{position: 'static'}} unoptimized />
                  </div>
                  <div>
                    <h3 className={styles.topTitle}>{topResult.title}</h3>
                    <span className={styles.topBadge}>{topResult.artist} • Song</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className={styles.songsCol}>
              <h2 className={styles.sectionTitle}>Songs {isLoading && <span style={{fontSize: 14, color: 'var(--text-secondary)'}}>(Searching...)</span>}</h2>
              <div className={styles.songList}>
                {results.slice(0, 5).map((s, i) => (
                  <SongRow key={s.id} song={s} index={i+1} />
                ))}
                {results.length === 0 && !isLoading && <p style={{color: 'var(--text-secondary)'}}>No songs found for "{query}"</p>}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className={styles.sectionTitle}>Browse all</h2>
            <div className={styles.genresGrid}>
              {genres.map(g => (
                <div key={g.id} className={styles.genreCard} style={{ backgroundColor: g.color }}>
                  <h3 className={styles.genreTitle}>{g.name}</h3>
                  <img src={g.image} alt={g.name} className={styles.genreImg} />
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </>
  );
}
