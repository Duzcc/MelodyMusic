'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Music2, Mic2, ListMusic, Heart, Clock, LogOut, Radio } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useRef, useEffect } from 'react';
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

      {/* Premium CTA */}
      <div className={styles.premiumBox}>
        <div className={styles.premiumGradient} />
        <p className={styles.premiumTitle}>Go Premium!</p>
        <p className={styles.premiumSub}>Get unlimited access to all songs</p>
        <Link href="/signup" className={styles.premiumBtn}>
          Sign Up
        </Link>
      </div>

    </aside>
  );
}

function UserDropdown({ name, onLogout }: { name: string; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        onClick={() => setOpen(prev => !prev)}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '10px 14px', borderRadius: '12px', cursor: 'pointer',
          background: open ? 'rgba(255,255,255,0.08)' : 'transparent',
          transition: 'background 0.2s',
        }}
      >
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
          background: 'var(--accent-gradient)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', fontSize: '15px',
        }}>
          {name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {name}
          </p>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Free Plan</p>
        </div>
      </div>

      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, right: 0,
          background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          <button
            onClick={() => { onLogout(); setOpen(false); }}
            style={{
              width: '100%', padding: '12px 16px', background: 'transparent',
              border: 'none', color: '#ff6b6b', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px',
              fontSize: '14px', fontWeight: '500',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,107,107,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
