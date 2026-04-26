<?php

namespace App\Contracts;

/**
 * Contract tổng quát cho hệ thống Auth
 */
interface AuthContract
{
    public function login(array $credentials): array;
    public function register(array $data): array;
    public function logout(string $token): void;
    public function me(string $token): mixed;
    public function refresh(string $token): array;
}
