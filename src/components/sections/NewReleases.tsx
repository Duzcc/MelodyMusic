'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import AlbumCard from '@/components/ui/AlbumCard';
import { Album } from '@/lib/types';
import styles from './NewReleases.module.css';

interface NewReleasesProps {
  albums: Album[];
}

export default function NewReleases({ albums }: NewReleasesProps) {
  return (
    <section className={styles.section}>
      <SectionHeader title="New Release" accentTitle="Songs" viewAllLink="/albums" />
      <div className={styles.grid}>
        {albums.slice(0, 6).map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
}
