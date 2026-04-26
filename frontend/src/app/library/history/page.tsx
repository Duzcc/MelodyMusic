import Header from '@/components/layout/Header';
import SectionHeader from '@/components/ui/SectionHeader';
import SongRow from '@/components/ui/SongRow';
import { songs } from '@/lib/data';

export default function HistoryPage() {
  // Mock history data
  const historySongs = [...songs].reverse().slice(0, 10);

  return (
    <>
      <Header title="Recently Played" />
      <div className="page-content" style={{ paddingTop: '24px' }}>
        <SectionHeader title="Listening" accentTitle="History" />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {historySongs.map((song, index) => (
            <div key={`${song.id}-history`} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '80px', flexShrink: 0, fontSize: '11px', color: 'var(--text-muted)' }}>
                {Math.floor(Math.random() * 24) + 1} hours ago
              </div>
              <div style={{ flex: 1 }}>
                <SongRow song={song} index={index + 1} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
