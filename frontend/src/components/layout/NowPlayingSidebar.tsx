'use client';

import { usePlayer } from '@/context/PlayerContext';
import Image from 'next/image';
import { X, ExternalLink, ShieldCheck, UserPlus, Settings } from 'lucide-react';
import styles from './NowPlayingSidebar.module.css';

const mockFriends = [
  { id: 1, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', song: 'Lose Yourself', artist: 'Eminem', album: '8 Mile Soundtrack', time: '2 min' },
  { id: 2, name: 'Sarah Connor', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d', song: 'Bad Guy', artist: 'Billie Eilish', album: 'When We All Fall Asleep', time: '1 hr' },
  { id: 3, name: 'Michael Smith', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', song: 'Another Love', artist: 'Tom Odell', album: 'Long Way Down', time: '4 hr' },
  { id: 4, name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?u=a04258114e290263c1d', song: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', time: 'Yesterday' },
];

export default function NowPlayingSidebar() {
  const { showRightSidebar, toggleRightSidebar } = usePlayer();

  if (!showRightSidebar) return null;

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <p className={styles.title}>Friend Activity</p>
        <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)' }}>
          <UserPlus size={18} style={{cursor:'pointer'}} />
          <Settings size={18} style={{cursor:'pointer'}} />
          <button onClick={toggleRightSidebar} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className={styles.content} style={{ marginTop: '16px', gap: '24px' }}>
        {mockFriends.map((friend) => (
          <div key={friend.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ position: 'relative' }}>
              <Image src={friend.avatar} alt={friend.name} width={40} height={40} unoptimized style={{ borderRadius: '50%', objectFit: 'cover' }} />
              {friend.time === '2 min' && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: 'var(--accent-pink)', borderRadius: '50%', border: '2px solid var(--bg-secondary)' }} />
              )}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>{friend.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{friend.time}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '180px' }}>
                {friend.song} • {friend.artist}
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '180px' }}>
                ⊙ {friend.album}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px', marginTop: 'auto' }}>
        <button style={{ 
          width: '100%', padding: '12px', borderRadius: '24px', background: 'var(--accent-gradient)', 
          color: 'white', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer',
          marginBottom: '16px', boxShadow: '0 4px 12px rgba(201, 0, 118, 0.4)'
        }} onClick={() => window.location.href='/party'}>
          Start a Jam Session
        </button>
        <p>Go to Settings to connect with Facebook and see what your friends are listening to.</p>
      </div>
    </div>
  );
}
