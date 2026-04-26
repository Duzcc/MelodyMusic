'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import { usePlayer } from '@/context/PlayerContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Radio, Users, CheckCircle2, Send, Link as LinkIcon } from 'lucide-react';
import styles from './party.module.css';

const MOCK_LISTENERS = [
  { id: 2, name: 'Alex J.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 3, name: 'Sarah C.', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
  { id: 4, name: 'Mike T.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
];

const INITIAL_MESSAGES = [
  { id: 1, userId: 2, name: 'Alex J.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', text: 'This track is fire 🔥' },
  { id: 2, userId: 3, name: 'Sarah C.', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d', text: 'Turn it up!!' },
];

export default function PartyPage() {
  const { currentSong } = usePlayer();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMsg, setInputMsg] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg = {
      id: Date.now(),
      userId: 1, // self
      name: currentUser?.name || 'You (Host)',
      avatar: 'https://i.pravatar.cc/150?u=host',
      text: inputMsg
    };
    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');
  };

  const copyLink = () => {
    alert("Session Link Copied!");
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        
        <div className={styles.leftCol}>
          <h1 className={styles.pageTitle}>
            Jam Session <span className={styles.liveBadge}>Live</span>
          </h1>

          <div className={styles.playerCard}>
            {currentSong ? (
              <>
                <Image src={currentSong.cover} alt={currentSong.title} width={180} height={180} className={styles.cover} unoptimized />
                <div className={styles.songInfo}>
                  <p className={styles.sectionTitle}>NOW PLAYING</p>
                  <h2 className={styles.title}>{currentSong.title}</h2>
                  <p className={styles.artist}>{currentSong.artist}</p>
                  <div className={styles.syncStatus}>
                    <CheckCircle2 size={16} /> Syncing audio to 3 listeners...
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.songInfo}>
                <h2 className={styles.title}>Silence is playing</h2>
                <p className={styles.artist}>Play a track to sync with your party.</p>
              </div>
            )}
          </div>

          <div className={styles.listenersCard}>
            <p className={styles.sectionTitle}><Users size={16} style={{display:'inline', marginRight: 8}}/> Listeners in Room (4)</p>
            <div className={styles.avatarGroup}>
              <div className={styles.avatarItem}>
                <Image src="https://i.pravatar.cc/150?u=host" alt="You" width={56} height={56} className={`${styles.avatar} ${styles.avatarHost}`} unoptimized />
                <span className={styles.avatarName}>You (Host)</span>
              </div>
              {MOCK_LISTENERS.map(l => (
                <div key={l.id} className={styles.avatarItem}>
                  <Image src={l.avatar} alt={l.name} width={56} height={56} className={styles.avatar} unoptimized />
                  <span className={styles.avatarName}>{l.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.hostCard}>
            <h3 className={styles.hostTitle}>Invite Friends</h3>
            <p style={{fontSize: 12, color: 'rgba(255,255,255,0.8)'}}>Scan QR or share code to join</p>
            <div className={styles.qrMock}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=melodies-party" alt="QR" className={styles.qrImg} />
            </div>
            <p className={styles.keyCode}>J-8492</p>
            <button className={styles.copyBtn} onClick={copyLink}>
              <LinkIcon size={14} style={{display:'inline', marginRight: 8}}/> Copy Link
            </button>
          </div>

          <div className={styles.chatCard}>
            <div className={styles.chatHeader}>Party Chat</div>
            <div className={styles.chatMessages} ref={chatRef}>
              {messages.map(m => (
                <div key={m.id} className={`${styles.message} ${m.userId === 1 ? styles.self : ''}`}>
                  {m.userId !== 1 && <Image src={m.avatar} alt="avatar" width={32} height={32} className={styles.msgAvatar} unoptimized />}
                  <div>
                    <p className={styles.msgName}>{m.name}</p>
                    <p className={styles.msgText}>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form className={styles.chatInputBox} onSubmit={handleSend}>
              <input 
                type="text" 
                className={styles.chatInput} 
                placeholder="Say something..." 
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
              />
              <button type="submit" className={styles.sendBtn}><Send size={16} /></button>
            </form>
          </div>
        </div>

      </main>
    </>
  );
}
