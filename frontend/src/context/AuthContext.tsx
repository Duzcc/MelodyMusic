'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  requires2FA?: boolean;
  error?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<AuthResponse>;
  verifyOtp: (email: string, otp: string) => Promise<AuthResponse>;
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

  // Base API URL
  const API_URL = 'http://localhost/melodymusic-api/api';

  // Helper to fetch CSRF token
  const fetchCsrfToken = async () => {
    try {
      const res = await fetch(`${API_URL}/csrf-token`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await res.json();
      return data.csrf_token;
    } catch (err) {
      console.error('Lỗi khi lấy CSRF Token:', err);
      return null;
    }
  };

  const login = async (email: string, pass: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const csrf_token = await fetchCsrfToken();
      if (!csrf_token) {
        setIsLoading(false);
        return { success: false, error: 'Không thể kết nối máy chủ an toàn' };
      }

      // Must include credentials so PHPSESSID cookie is sent/stored
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password: pass, csrf_token })
      });
      const data = await res.json();

      if (data.status === 'requires_2fa') {
        setIsLoading(false);
        return { success: true, requires2FA: true };
      }

      if (data.status === 'error') {
        setIsLoading(false);
        return { success: false, error: data.message || 'Lỗi đăng nhập' };
      }

      setIsLoading(false);
      return { success: false, error: 'Phản hồi không xác định' };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'Lỗi mạng' };
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      // Ở đây ta dùng CSRF cũ nếu còn sống, hoặc fetch cái mới
      const csrf_token = await fetchCsrfToken();

      const res = await fetch(`${API_URL}/2fa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp, csrf_token })
      });
      const data = await res.json();

      if (data.success) {
        // Lưu JWT token
        localStorage.setItem('melodies-jwt', data.token);
        
        // Giải mã JWT thủ công để lấy thông tin User (vì ta không dùng thư viện ngoài)
        try {
          const payloadBase64 = data.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
          const payloadJson = decodeURIComponent(atob(payloadBase64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const userData = JSON.parse(payloadJson);
          
          setCurrentUser({
            id: userData.id,
            email: userData.email,
            name: userData.name
          });
          localStorage.setItem('melodies-active-user', JSON.stringify(userData));
        } catch (e) {
          console.error('Không thể parse token', e);
        }

        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: data.message || 'OTP không hợp lệ' };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'Lỗi mạng' };
    }
  };

  const register = async (email: string, pass: string, name: string) => {
    setIsLoading(true);
    // TODO: Gọi API đăng ký khi Backend làm xong
    alert('Backend chưa hỗ trợ API Register');
    setIsLoading(false);
    return false;
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('melodies-active-user');
    localStorage.removeItem('melodies-jwt');
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ currentUser, login, verifyOtp, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
