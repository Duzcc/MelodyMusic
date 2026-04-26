'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/styles/auth.module.css';

export default function SignupPage() {
  const { register, isLoading } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !pass) {
      return setError('Please fill all fields');
    }

    if (pass.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    const success = await register(email, pass, name);
    if (success) {
      router.push('/');
    } else {
      setError('Email is already registered!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} style={{ animationDelay: '-5s' }} />
      <div className={styles.card}>
        <div className={styles.logo}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="url(#gradAuth2)" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" fill="url(#gradAuth2)"/>
            <line x1="12" y1="2" x2="12" y2="8" stroke="url(#gradAuth2)" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="gradAuth2" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#4a9eff"/>
                <stop offset="100%" stopColor="#c90076"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <h1 className={styles.title}>Join Melodies</h1>
        <p className={styles.subtitle}>Sign up for free and feel the music</p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSignup}>
          <div className={styles.formGroup}>
            <label className={styles.label}>What should we call you?</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Your profile name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
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
            <label className={styles.label}>Create a password</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading} style={{marginTop: '24px'}}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account? 
          <Link href="/login" className={styles.link}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
