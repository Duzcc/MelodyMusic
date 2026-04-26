<?php

namespace App\Repositories\Interfaces;

use App\Repositories\Interfaces\RepositoryInterface;

/**
 * Interface đặc thù cho User repository
 */
interface UserRepositoryInterface extends RepositoryInterface
{
    public function findByEmail(string $email): mixed;

    public function updatePassword(int $userId, string $hashedPassword): bool;

    public function recordLoginAttempt(string $email, string $ip, bool $success): void;

    public function getFailedAttemptsCount(string $email, int $minutes): int;
}
