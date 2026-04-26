<?php

namespace App\Auth\Strategies;

use App\Contracts\AuthStrategyInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

/**
 * Strategy Pattern: Xác thực bằng email + password
 */
class PasswordStrategy implements AuthStrategyInterface
{
    public function __construct(
        private UserRepositoryInterface $userRepo
    ) {}

    public function authenticate(array $credentials): mixed
    {
        // TODO:
        // 1. Tìm user theo email: $this->userRepo->findByEmail($credentials['email'])
        // 2. Kiểm tra Hash::check($credentials['password'], $user->password)
        // 3. Nếu đúng trả về $user, ngược lại throw AuthException::invalidCredentials()
    }

    public function supports(array $credentials): bool
    {
        return isset($credentials['email']) && isset($credentials['password']);
    }
}
