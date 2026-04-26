<?php

namespace App\Auth\Strategies;

use App\Contracts\AuthStrategyInterface;
use App\Services\Auth\JwtService;

/**
 * Strategy Pattern: Tự động refresh JWT session
 * Dùng khi access token hết hạn nhưng refresh token còn hiệu lực
 */
class JwtRefreshStrategy implements AuthStrategyInterface
{
    public function __construct(
        private JwtService $jwtService
    ) {}

    public function authenticate(array $credentials): mixed
    {
        // TODO:
        // 1. Lấy refresh_token từ credentials
        // 2. Gọi $this->jwtService->refresh($credentials['refresh_token'])
        // 3. Trả về payload User từ token mới
    }

    public function supports(array $credentials): bool
    {
        return isset($credentials['refresh_token']);
    }
}
