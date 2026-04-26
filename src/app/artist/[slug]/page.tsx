import Header from '@/components/layout/Header';
import SectionHeader from '@/components/ui/SectionHeader';
import SongRow from '@/components/ui/SongRow';
import AlbumCard from '@/components/ui/AlbumCard';
import { artists, songs, albums } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = artists.find(a => a.id === params.slug) || artists[0];
  
  if (!artist) {
    notFound();
  }

  const artistSongs = songs.filter(s => s.artistId === artist.id);
  // Fallback to all songs if none specifically for artist (for mock data sake)
  const displaySongs = artistSongs.length > 0 ? artistSongs : songs.slice(0, 5);
  
  const artistAlbums = albums.filter(a => a.artistId === artist.id);
  const displayAlbums = artistAlbums.length > 0 ? artistAlbums : albums.slice(0, 4);

  return (
    <>
      <Header title="Artist page" />
      <div className="page-content" style={{ paddingTop: '0' }}>
        
        {/* Artist Header */}
        <div style={{ 
          position: 'relative', 
          height: '350px', 
          width: 'calc(100% + 64px)', 
          marginLeft: '-32px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '40px 32px'
        }}>
          <Image 
            src={artist.image} 
            alt={artist.name} 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }} 
            unoptimized 
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, rgba(30,30,30,0.2) 100%)' }} />
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              {artist.verified && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--accent-blue)', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Verified Artist
                </div>
              )}
            </div>
            <h1 style={{ fontSize: '72px', fontWeight: 800, lineHeight: 1, marginBottom: '20px' }}>{artist.name}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              {artist.monthlyListeners} monthly listeners
            </p>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-primary" style={{ padding: '12px 32px' }}>Play</button>
              <button className="btn btn-secondary" style={{ padding: '12px 32px' }}>Follow</button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {/* Left Column: Popular Songs */}
          <div style={{ flex: 2 }}>
            <SectionHeader title="Popular" accentTitle="Songs" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {displaySongs.map((song, index) => (
                <SongRow key={song.id} song={song} index={index + 1} />
              ))}
            </div>
          </div>

          {/* Right Column: Artist's Albums */}
          <div style={{ flex: 1 }}>
            <SectionHeader title="Artist's" accentTitle="Albums" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              {displayAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
