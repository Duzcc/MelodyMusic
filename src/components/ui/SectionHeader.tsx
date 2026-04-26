'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  accentTitle?: string;
  viewAllLink?: string;
}

export default function SectionHeader({ title, accentTitle, viewAllLink }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        {title} {accentTitle && <span className={styles.accent}>{accentTitle}</span>}
      </h2>
      {viewAllLink && (
        <Link href={viewAllLink} className={styles.viewAll}>
          View All <ChevronRight size={14} className={styles.icon} />
        </Link>
      )}
    </div>
  );
}
