<?php

namespace App\Services;

class TwoFactorService
{
    public function generateAndSendOtp(string $email): void
    {
        // TODO: Sinh OTP 6 số ngẫu nhiên và gửi mail
    }

    public function verifyOtp(string $email, string $otp): bool
    {
        // TODO: Kiểm tra OTP trong session/cache
        return false;
    }
}
