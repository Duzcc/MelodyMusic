import type { Metadata } from 'next';
import '@/styles/globals.css';
import { PlayerProvider } from '@/context/PlayerContext';
import { ContextMenuProvider } from '@/context/ContextMenuContext';
import { LibraryProvider } from '@/context/LibraryContext';
import { AuthProvider } from '@/context/AuthContext';
import AppLayoutWrapper from '@/components/layout/AppLayoutWrapper';

export const metadata: Metadata = {
  title: 'Melodies | Premium Music Streaming',
  description: 'Immersive dark-themed music streaming experience',
  manifest: '/manifest.json',
  themeColor: '#c90076',
  keywords: 'music, streaming, songs, artists, albums, melodies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LibraryProvider>
            <PlayerProvider>
              <ContextMenuProvider>
                <AppLayoutWrapper>
                  {children}
                </AppLayoutWrapper>
              </ContextMenuProvider>
            </PlayerProvider>
          </LibraryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
