<?php

namespace App\Auth\Strategies;

use App\Contracts\AuthStrategyInterface;
use App\Services\Auth\TwoFactorService;

/**
 * Strategy Pattern: Xác thực bằng OTP (One-Time Password)
 * Dùng khi user chọn đăng nhập qua 2FA hoặc passwordless
 */
class OtpStrategy implements AuthStrategyInterface
{
    public function __construct(
        private TwoFactorService $tfService
    ) {}

    public function authenticate(array $credentials): mixed
    {
        // TODO:
        // 1. Lấy userId từ credentials
        // 2. Gọi $this->tfService->verifyOtp($userId, $credentials['otp'])
        // 3. Nếu đúng, load và trả về User, ngược lại throw exception
    }

    public function supports(array $credentials): bool
    {
        return isset($credentials['otp']) && isset($credentials['user_id']);
    }
}
