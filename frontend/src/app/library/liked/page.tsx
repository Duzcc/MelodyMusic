import Header from '@/components/layout/Header';
import SectionHeader from '@/components/ui/SectionHeader';
import SongRow from '@/components/ui/SongRow';
import { songs } from '@/lib/data';

export default function LikedSongsPage() {
  // Mock liked songs data
  const likedSongs = songs.slice(0, 8).map(s => ({ ...s, isLiked: true }));

  return (
    <>
      <Header title="Liked Songs" />
      <div className="page-content" style={{ paddingTop: '24px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: '24px', 
          padding: '40px', 
          background: 'var(--accent-gradient)', 
          borderRadius: '16px',
          marginBottom: '40px',
          boxShadow: '0 10px 30px rgba(201,0,118,0.3)'
        }}>
          <div style={{ width: '160px', height: '160px', background: 'linear-gradient(135deg, #FF6B6B 0%, #C90076 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div style={{ color: 'white' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Playlist</p>
            <h1 style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1, marginBottom: '16px' }}>Liked Songs</h1>
            <p style={{ fontSize: '15px', fontWeight: 500, opacity: 0.9 }}>{likedSongs.length} songs that you marked with a heart</p>
          </div>
        </div>

        <SectionHeader title="Your Liked" accentTitle="Tracks" />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {likedSongs.map((song, index) => (
            <SongRow key={song.id} song={song} index={index + 1} />
          ))}
        </div>
      </div>
    </>
  );
}
