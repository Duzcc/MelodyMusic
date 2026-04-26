'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (email: string, pass: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from mocked LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('melodies-active-user');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Simulate network delay for luxury feel
    await new Promise(r => setTimeout(r, 800));
    
    const dbRaw = localStorage.getItem('melodies-users-db');
    const db: Record<string, any> = dbRaw ? JSON.parse(dbRaw) : {};
    
    if (db[email] && db[email].pass === pass) {
      const user = db[email].user;
      setCurrentUser(user);
      localStorage.setItem('melodies-active-user', JSON.stringify(user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, pass: string, name: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    const dbRaw = localStorage.getItem('melodies-users-db');
    const db: Record<string, any> = dbRaw ? JSON.parse(dbRaw) : {};

    if (db[email]) {
      setIsLoading(false);
      return false; // already exists
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name
    };

    db[email] = { user: newUser, pass };
    localStorage.setItem('melodies-users-db', JSON.stringify(db));
    
    // Auto login
    setCurrentUser(newUser);
    localStorage.setItem('melodies-active-user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('melodies-active-user');
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
