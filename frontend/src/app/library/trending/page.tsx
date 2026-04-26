import Header from '@/components/layout/Header';
import SectionHeader from '@/components/ui/SectionHeader';
import SongRow from '@/components/ui/SongRow';
import { songs } from '@/lib/data';

export default function TrendingPage() {
  // Get only trending songs
  const trendingSongs = songs.filter(s => s.trending);

  return (
    <>
      <Header title="Trending Topics" />
      <div className="page-content" style={{ paddingTop: '24px' }}>
        <SectionHeader title="Global" accentTitle="Trending" />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {trendingSongs.map((song, index) => (
            <div key={`${song.id}-trending`} style={{ position: 'relative' }}>
              {index < 3 && (
                <div style={{ position: 'absolute', top: '16px', right: '160px', zIndex: 10, display: 'flex', gap: '4px', alignItems: 'center', color: 'var(--accent-pink)', fontSize: '12px', fontWeight: 600 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                  Trending Up
                </div>
              )}
              <SongRow song={song} index={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
