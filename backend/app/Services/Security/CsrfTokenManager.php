<?php

namespace App\Services\Security;

/**
 * Yêu cầu OOP: CsrfTokenManager
 * Sinh và xác minh CSRF token để bảo vệ form submission
 */
class CsrfTokenManager
{
    /**
     * Sinh ra một CSRF token ngẫu nhiên và lưu vào session
     */
    public function generateToken(): string
    {
        // TODO: Implement
    }

    /**
     * Xác minh token từ request so với token trong session
     */
    public function validateToken(string $token): bool
    {
        // TODO: Implement
    }
}
