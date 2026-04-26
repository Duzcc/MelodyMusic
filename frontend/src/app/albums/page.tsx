'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import { albums } from '@/lib/data';
import Image from 'next/image';
import { Play } from 'lucide-react';
import styles from '@/app/styles/grid.module.css';

export default function AlbumsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Explore Albums</h1>
          <p className={styles.subtitle}>The hottest albums out right now</p>
        </div>

        <div className={styles.grid}>
          {albums.map((album) => (
            <div key={album.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image src={album.cover} alt={album.title} fill className={styles.image} unoptimized />
                <button className={styles.playBtn} onClick={(e) => e.stopPropagation()}>
                  <Play size={20} fill="currentColor" />
                </button>
              </div>
              <div className={styles.info}>
                <h3 className={styles.cardTitle}>{album.title}</h3>
                <p className={styles.cardSubtitle}>{album.year} • {album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
