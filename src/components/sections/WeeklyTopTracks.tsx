'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import SongRow from '@/components/ui/SongRow';
import { Song } from '@/lib/types';
import styles from './WeeklyTopTracks.module.css';

interface WeeklyTopTracksProps {
  songs: Song[];
}

export default function WeeklyTopTracks({ songs }: WeeklyTopTracksProps) {
  return (
    <section className={styles.section}>
      <SectionHeader title="Weekly Top" accentTitle="Track" viewAllLink="/albums" />
      <div className={styles.list}>
        {songs.slice(0, 5).map((song, index) => (
          <SongRow key={song.id} song={song} index={index + 1} />
        ))}
      </div>
    </section>
  );
}
