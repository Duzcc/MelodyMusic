<?php

namespace App\Services\Auth;

/**
 * Service sinh, ký và xác minh JWT token
 * Phục vụ quản lý phiên đăng nhập nâng cao (yêu cầu tính năng nâng cao)
 */
class JwtService
{
    public function __construct(
        private string $secret,
        private int    $ttl, // time-to-live in minutes
    ) {}

    /**
     * Sinh JWT token từ payload user
     */
    public function generate(array $payload): string
    {
        // TODO: Implement header.payload.signature
    }

    /**
     * Xác minh và decode JWT token
     */
    public function verify(string $token): array
    {
        // TODO: Implement - throw exception nếu invalid/expired
    }

    /**
     * Refresh token (gia hạn thời gian sống)
     */
    public function refresh(string $token): string
    {
        // TODO: Implement
    }
}
