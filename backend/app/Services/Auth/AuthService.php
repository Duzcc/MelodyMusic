<?php

namespace App\Services\Auth;

use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Security\CsrfTokenManager;
use App\Services\Auth\JwtService;

/**
 * Service xử lý toàn bộ logic xác thực: login, register, logout
 */
class AuthService
{
    public function __construct(
        private UserRepositoryInterface $userRepo,
        private CsrfTokenManager        $csrfManager,
        private JwtService               $jwtService,
    ) {}

    public function login(string $email, string $password): array
    {
        // TODO: Xác minh credentials, sinh JWT, trả về token
    }

    public function register(array $data): array
    {
        // TODO: Hash password, tạo user, sinh JWT
    }

    public function logout(string $token): void
    {
        // TODO: Blacklist token hoặc xoá session
    }
}
