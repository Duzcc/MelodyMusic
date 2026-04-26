'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Music2, Heart } from 'lucide-react';
import styles from './MobileNav.module.css';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/albums', label: 'Albums', icon: Music2 },
  { href: '/library/liked', label: 'Liked', icon: Heart },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.mobileNav}>
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <Icon size={22} className={styles.icon} strokeWidth={isActive ? 2.5 : 2} />
            <span className={styles.label}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
