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
  const API_URL = 'http://localhost:8000/api';

  // Helper to fetch CSRF token
  const fetchCsrfToken = async () => {
    try {
      const res = await fetch(`${API_URL}/csrf-token`, {
        method: 'GET',
        credentials: 'include'
      });
      const text = await res.text();
      // Trước khi parse JSON, kiểm tra xem response có phải JSON không
      try {
        const data = JSON.parse(text);
        return data.csrf_token;
      } catch {
        console.error('Được phản hồi từ máy chủ nhưng không phải JSON:', text.substring(0, 200));
        return null;
      }
    } catch (err) {
      console.error('Không thể kết nối đến máy chủ BE. Hãy kiểm tra lại php -S localhost:8000 có đang chạy không.', err);
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

      const loginRes = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password: pass, csrf_token })
      });

      // Bắt buộc đọc dưới dạng text trước, phong ngừa PHP trả HTML lỗi
      const loginText = await loginRes.text();
      let data: any;
      try {
        data = JSON.parse(loginText);
      } catch {
        console.error('Server trả HTML thay vì JSON (có thể do lỗi PHP). Nội dung:', loginText.substring(0, 300));
        setIsLoading(false);
        return { success: false, error: 'Máy chủ gặp lỗi. Xem terminal PHP để biết chi tiết.' };
      }

      if (data.status === 'requires_2fa') {
        setIsLoading(false);
        return { success: true, requires2FA: true };
      }

      if (data.status === 'email_not_found' || data.status === 'error') {
        setIsLoading(false);
        return { success: false, error: data.message || 'Lỗi đăng nhập' };
      }

      setIsLoading(false);
      return { success: false, error: 'Phản hồi không xác định' };
    } catch (err: any) {
      setIsLoading(false);
      // Lỗi thực sự: không kết nối được tới localhost:8000
      const msg = err?.message || String(err);
      console.error('Lỗi fetch login:', msg);
      return { success: false, error: 'Không kết nối được Backend. Kiểm tra php -S localhost:8000 có chạy không.' };
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
