'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, Menu, X, Play } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { songs, artists, albums } from '@/lib/data';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}

export default function Header({ title, showSearch = true }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const { playSong } = usePlayer();
  const router = useRouter();

  // Basic search logic
  const searchResults = {
    songs: songs.filter(s => s.title.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 3),
    artists: artists.filter(a => a.name.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 2),
    albums: albums.filter(a => a.title.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 2),
  };

  const hasResults = searchResults.songs.length > 0 || searchResults.artists.length > 0 || searchResults.albums.length > 0;

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      {/* Left: mobile menu btn + page title */}
      <div className={styles.left}>
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {title && <h1 className={styles.pageTitle}>{title}</h1>}
      </div>

      {/* Center: Search bar */}
      {showSearch && (
        <div className={styles.searchWrapper} ref={searchRef}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            value={searchValue}
            onChange={e => {
              setSearchValue(e.target.value);
              setShowResults(e.target.value.length > 0);
            }}
            onFocus={() => { if(searchValue.length > 0) setShowResults(true); }}
            placeholder="Search songs, artists, albums..."
            className={styles.searchInput}
            aria-label="Search music"
          />
          
          {/* Search Dropdown */}
          {showResults && (
            <div className={styles.searchResults}>
              {searchValue && !hasResults && (
                <div className={styles.noResults}>No results found for "{searchValue}"</div>
              )}
              
              {hasResults && (
                <>
                  {searchResults.songs.length > 0 && (
                    <div className={styles.searchSection}>
                      <p className={styles.searchLabel}>Songs</p>
                      {searchResults.songs.map(song => (
                        <div key={song.id} className={styles.searchItem} onClick={() => { playSong(song); setShowResults(false); }}>
                          <span className={styles.searchItemTitle}>{song.title}</span>
                          <span className={styles.searchItemSub}>{song.artist}</span>
                          <button className={styles.searchPlayBtn}><Play size={14}/></button>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.artists.length > 0 && (
                     <div className={styles.searchSection}>
                      <p className={styles.searchLabel}>Artists</p>
                      {searchResults.artists.map(artist => (
                        <div key={artist.id} className={styles.searchItem} onClick={() => { router.push(`/artist/${artist.id}`); setShowResults(false); }}>
                          <span className={styles.searchItemTitle}>{artist.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Right: Actions */}
      <div className={styles.actions}>
        <Link href="/signup" className={styles.premiumBtn}>
          Premium
        </Link>
        <button className={styles.notifBtn} aria-label="Notifications">
          <Bell size={18} />
          <span className={styles.notifDot} />
        </button>
        <div className={styles.avatar}>
          <div className={styles.avatarImg}>
            <span>U</span>
          </div>
          <ChevronDown size={14} className={styles.avatarChevron} />
        </div>
      </div>
    </header>
  );
}
