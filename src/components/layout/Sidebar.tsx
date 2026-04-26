'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Music2, Mic2, ListMusic, Heart, Clock, TrendingUp, LogOut, Radio } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './Sidebar.module.css';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Compass },
  { href: '/party', label: 'Party Hub', icon: Radio },
  { href: '/albums', label: 'Albums', icon: Music2 },
  { href: '/artist', label: 'Artists', icon: Mic2 },
];

const libraryLinks = [
  { href: '/library', label: 'Your Library', icon: ListMusic },
  { href: '/library#liked', label: 'Liked Songs', icon: Heart },
  { href: '/', label: 'Recently Played', icon: Clock },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="url(#grad)" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" fill="url(#grad)"/>
            <line x1="12" y1="2" x2="12" y2="8" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#c90076"/>
                <stop offset="100%" stopColor="#7b2ff7"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className={styles.logoText}>Melodies</span>
      </div>

      {/* Main Nav */}
      <nav className={styles.nav}>
        <p className={styles.navLabel}>Menu</p>
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
            {pathname === href && <span className={styles.activeIndicator} />}
          </Link>
        ))}
      </nav>

      {/* Library */}
      <nav className={styles.nav}>
        <p className={styles.navLabel}>Library</p>
        {libraryLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Profile or Premium CTA */}
      {currentUser ? (
        <div className={styles.premiumBox} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div style={{flex: 1, overflow: 'hidden'}}>
              <p style={{fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{currentUser.name}</p>
              <p style={{fontSize: '11px', color: 'var(--text-secondary)'}}>Free Plan</p>
            </div>
          </div>
          <button onClick={logout} className={styles.premiumBtn} style={{background: 'rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', marginTop: '4px'}}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      ) : (
        <div className={styles.premiumBox}>
          <div className={styles.premiumGradient} />
          <p className={styles.premiumTitle}>Go Premium!</p>
          <p className={styles.premiumSub}>Get unlimited access to all songs</p>
          <Link href="/signup" className={styles.premiumBtn}>
            Sign Up
          </Link>
          <Link href="/login" style={{display: 'block', textAlign: 'center', fontSize: '13px', marginTop: '12px', color: 'var(--text-secondary)'}}>
            Already have an account? <span style={{color: 'white', fontWeight: 'bold'}}>Log in</span>
          </Link>
        </div>
      )}
    </aside>
  );
}
