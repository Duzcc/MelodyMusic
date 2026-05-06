'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/styles/auth.module.css';

export default function LoginPage() {
  const { login, verifyOtp, isLoading } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !pass) {
      return setError('Vui lòng nhập đầy đủ thông tin');
    }

    const res = await login(email, pass);
    if (res.success && res.requires2FA) {
      setStep('otp');
    } else if (res.success) {
      router.push('/');
    } else {
      setError(res.error || 'Email hoặc mật khẩu không hợp lệ');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length < 6) {
      return setError('Mã OTP không hợp lệ');
    }

    const res = await verifyOtp(email, otp);
    if (res.success) {
      router.push('/');
    } else {
      setError(res.error || 'Mã OTP sai hoặc đã hết hạn');
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

        {step === 'login' ? (
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input 
                type="email" 
                className={styles.input} 
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Mật khẩu</label>
              <input 
                type="password" 
                className={styles.input} 
                placeholder="••••••••"
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleVerifyOtp}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Mã xác thực (OTP)</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Nhập 6 số OTP (Xem trong console backend)"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Đang xác thực...' : 'Xác nhận OTP'}
            </button>
            <button
              type="button"
              className={styles.submitBtn}
              style={{ marginTop: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={(e) => {
                e.preventDefault();
                setOtp('');
                setError('');
                setStep('login');
              }}
            >
              Quay lại
            </button>
          </form>
        )}

        <div className={styles.footer}>
          Don't have an account? 
          <Link href="/signup" className={styles.link}>Sign up for free</Link>
        </div>
      </div>
    </div>
  );
}
