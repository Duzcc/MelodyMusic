'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Album } from '@/lib/types';
import styles from './AlbumCard.module.css';

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link href={`/albums/${album.id}`} className={styles.card}>
      <div className={styles.coverWrapper}>
        <Image
          src={album.cover}
          alt={album.title}
          fill
          unoptimized
          className={styles.cover}
        />
        <div className={styles.overlay}>
          <p className={styles.year}>{album.year}</p>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{album.title}</h3>
        <p className={styles.artist}>{album.artist}</p>
      </div>
    </Link>
  );
}
