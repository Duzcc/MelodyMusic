import Header from '@/components/layout/Header';
import SectionHeader from '@/components/ui/SectionHeader';
import { playlists } from '@/lib/data';
import Image from 'next/image';

export default function PlaylistsPage() {
  return (
    <>
      <Header title="My Playlists" />
      <div className="page-content" style={{ paddingTop: '24px' }}>
        <SectionHeader title="Your" accentTitle="Library" />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
          {playlists.map((pl) => (
            <div key={pl.id} className="card" style={{ padding: '20px', cursor: 'pointer' }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                <Image src={pl.cover} alt={pl.title} fill style={{ objectFit: 'cover' }} unoptimized />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{pl.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {pl.songCount} songs • {pl.mood}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
