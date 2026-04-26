'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Artist } from '@/lib/types';
import styles from './ArtistCard.module.css';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artist/${artist.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          unoptimized
        />
      </div>
      <p className={styles.name}>{artist.name}</p>
    </Link>
  );
}
