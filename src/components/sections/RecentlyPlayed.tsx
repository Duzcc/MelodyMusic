'use client';

import React from 'react';
import { useLibrary } from '@/context/LibraryContext';
import SongCard from '@/components/ui/SongCard';

export default function RecentlyPlayed() {
  const { recentHistory } = useLibrary();

  if (!recentHistory || recentHistory.length === 0) return null;

  return (
    <section style={{ marginBottom: '40px' }}>
      <div className="section-header">
        <h2 className="section-title">
          Recently <span className="accent">Played</span>
        </h2>
      </div>
      <div className="scroll-row">
        {recentHistory.map((song, idx) => (
          <div key={`recent-${song.id}-${idx}`} style={{ minWidth: '180px' }}>
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </section>
  );
}
