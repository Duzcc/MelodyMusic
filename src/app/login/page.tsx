'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/styles/auth.module.css';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !pass) {
      return setError('Please fill all fields');
    }

    const success = await login(email, pass);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.card}>
        <div className={styles.logo}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="url(#gradAuth)" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" fill="url(#gradAuth)"/>
            <line x1="12" y1="2" x2="12" y2="8" stroke="url(#gradAuth)" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="gradAuth" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#c90076"/>
                <stop offset="100%" stopColor="#7b2ff7"/>
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.logoText}>Melodies</span>
        </div>
        
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to access your library</p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email address</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className={styles.footer}>
          Don't have an account? 
          <Link href="/signup" className={styles.link}>Sign up for free</Link>
        </div>
      </div>
    </div>
  );
}
