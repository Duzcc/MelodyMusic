'use client';

import React, { useEffect, useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';

export default function AudioVisualizer() {
  const { isPlaying } = usePlayer();
  const [bars, setBars] = useState<number[]>(Array(40).fill(10));

  useEffect(() => {
    let animationId: number;

    const pulse = () => {
      if (isPlaying) {
        // Generate random heights resembling frequencies
        setBars(prev => prev.map(() => Math.random() * 80 + 10));
      } else {
        // Settle down beautifully
        setBars(prev => prev.map((h) => Math.max(10, h * 0.85)));
      }
      animationId = requestAnimationFrame(() => {
        setTimeout(pulse, 100); // 10 fps for that retro feel
      });
    };

    pulse();

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100px', width: '100%', gap: '4px' }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: '100%',
            height: `${h}%`,
            background: i % 2 === 0 ? 'var(--accent-pink)' : 'var(--accent-gradient-end, rgba(255,255,255,0.8))',
            borderRadius: '4px',
            transition: 'height 0.15s ease-in-out',
            opacity: isPlaying ? 0.8 : 0.2,
          }}
        />
      ))}
    </div>
  );
}
