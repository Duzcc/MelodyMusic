'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import ArtistCard from '@/components/ui/ArtistCard';
import { Artist } from '@/lib/types';

interface PopularArtistsProps {
  artists: Artist[];
}

export default function PopularArtists({ artists }: PopularArtistsProps) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <SectionHeader title="Popular" accentTitle="Artists" viewAllLink="/discover" />
      <div className="scroll-row">
        {artists.slice(0, 8).map((artist) => (
          <div key={artist.id} style={{ width: '130px', flexShrink: 0 }}>
            <ArtistCard artist={artist} />
          </div>
        ))}
      </div>
    </section>
  );
}
