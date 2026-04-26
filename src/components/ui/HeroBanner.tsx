'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import styles from './HeroBanner.module.css';

interface HeroBannerProps {
  artistName: string;
  image: string;
  badgeText: string;
}

export default function HeroBanner({ artistName, image, badgeText }: HeroBannerProps) {
  return (
    <div className={styles.banner}>
      {/* Background Gradient */}
      <div className={styles.bgGradient} />
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.badge}>{badgeText}</div>
        <h1 className={styles.title}>{artistName}</h1>
        <div className={styles.actions}>
          <button className={styles.playBtn}>
            <Play size={18} fill="currentColor" /> Play
          </button>
          <button className={styles.followBtn}>Follow</button>
        </div>
      </div>

      {/* Artist Image Content */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={artistName}
          fill
          unoptimized
          className={styles.image}
          priority
        />
        <div className={styles.fadeBottom} />
      </div>
    </div>
  );
}
