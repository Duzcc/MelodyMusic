'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import SongCard from '@/components/ui/SongCard';
import { Song } from '@/lib/types';

interface TrendingSongsProps {
  songs: Song[];
}

export default function TrendingSongs({ songs }: TrendingSongsProps) {
  const trending = songs.filter(s => s.trending).slice(0, 6);
  
  return (
    <section style={{ marginBottom: '40px' }}>
      <SectionHeader title="Trending" accentTitle="Songs" viewAllLink="/discover" />
      <div className="grid-songs">
        {trending.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
}
