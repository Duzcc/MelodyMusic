'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import { artists } from '@/lib/data';
import Image from 'next/image';
import styles from '@/app/styles/grid.module.css';

export default function ArtistPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Verified Artists</h1>
          <p className={styles.subtitle}>Discover their top tracks</p>
        </div>

        <div className={styles.grid}>
          {artists.map((artist) => (
            <div key={artist.id} className={styles.card}>
              <div className={`${styles.imageWrapper} ${styles.circle}`}>
                <Image src={artist.image} alt={artist.name} fill className={styles.image} unoptimized />
              </div>
              <div className={styles.info} style={{ alignItems: 'center' }}>
                <h3 className={styles.cardTitle}>{artist.name}</h3>
                <p className={styles.cardSubtitle}>Artist</p>
                <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                  {artist.followers} Followers
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
