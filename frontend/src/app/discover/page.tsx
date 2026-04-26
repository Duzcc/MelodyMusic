import Header from '@/components/layout/Header';
import SectionHeader from '@/components/ui/SectionHeader';
import ArtistCard from '@/components/ui/ArtistCard';
import AlbumCard from '@/components/ui/AlbumCard';
import { artists, genres, playlists, albums } from '@/lib/data';
import Image from 'next/image';

export default function DiscoverPage() {
  return (
    <>
      <Header title="Discover page" />
      <div className="page-content" style={{ paddingTop: '24px' }}>
        
        {/* Genres */}
        <section style={{ marginBottom: '40px' }}>
          <SectionHeader title="Music" accentTitle="genres" viewAllLink="/" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {genres.map((genre) => (
              <div 
                key={genre.id}
                style={{ 
                  position: 'relative', 
                  aspectRatio: '3/2', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  cursor: 'pointer' 
                }}
              >
                <Image src={genre.image} alt={genre.name} fill style={{ objectFit: 'cover' }} unoptimized />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
                <h3 style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '18px', fontWeight: 700, color: 'white' }}>
                  {genre.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Mood Playlists */}
        <section style={{ marginBottom: '40px' }}>
          <SectionHeader title="Mood" accentTitle="Playlist's" viewAllLink="/" />
          <div className="grid-albums">
            {playlists.map((pl) => (
              <div key={pl.id} className="card" style={{ padding: '16px' }}>
                <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                  <Image src={pl.cover} alt={pl.title} fill style={{ objectFit: 'cover' }} unoptimized />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{pl.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{pl.songCount} Songs</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Artists */}
        <section style={{ marginBottom: '40px' }}>
          <SectionHeader title="Popular" accentTitle="Artists" viewAllLink="/" />
          <div className="grid-artists">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
        
        {/* New Albums */}
        <section style={{ marginBottom: '40px' }}>
          <SectionHeader title="New" accentTitle="Albums" viewAllLink="/albums" />
          <div className="grid-albums">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
