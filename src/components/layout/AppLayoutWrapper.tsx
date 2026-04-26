'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayer from '@/components/layout/MusicPlayer';
import NowPlayingSidebar from '@/components/layout/NowPlayingSidebar';
import MobileNav from '@/components/layout/MobileNav';

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // If we are on Auth pages, return raw full screen wrapper
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return (
      <main style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg-primary)' }}>
        {children}
      </main>
    );
  }

  // Otherwise, return standard Music App layout with Sidebars and Player
  return (
    <>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
        <NowPlayingSidebar />
      </div>
      <MusicPlayer />
      <MobileNav />
    </>
  );
}
