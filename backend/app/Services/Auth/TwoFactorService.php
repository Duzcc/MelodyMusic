<?php

namespace App\Services\Auth;

/**
 * Service xử lý xác thực 2 yếu tố (2FA)
 * Tính năng nâng cao: gửi OTP qua email hoặc Authenticator App
 */
class TwoFactorService
{
    /**
     * Sinh OTP ngẫu nhiên (6 chữ số) và lưu vào cache với TTL
     */
    public function generateOtp(int $userId): string
    {
        // TODO: Implement random_int(100000, 999999), cache with userId key
    }

    /**
     * Xác minh OTP người dùng nhập so với OTP trong cache
     */
    public function verifyOtp(int $userId, string $otp): bool
    {
        // TODO: Implement cache lookup và so sánh
    }

    /**
     * Gửi OTP qua email
     */
    public function sendOtpEmail(string $email, string $otp): void
    {
        // TODO: Implement gửi mail qua Laravel Mailable
    }
}
