<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\AbstractRepository;
use App\Repositories\Interfaces\UserRepositoryInterface;

/**
 * Triển khai UserRepositoryInterface sử dụng Eloquent ORM
 * Kế thừa AbstractRepository để tái sử dụng logic CRUD chung
 */
class UserRepository extends AbstractRepository implements UserRepositoryInterface
{
    /**
     * Khai báo Model tương ứng (bắt buộc từ AbstractRepository)
     */
    protected function getModel(): string
    {
        return User::class;
    }
    public function findById(int $id): mixed
    {
        // TODO: return User::find($id);
    }

    public function findByEmail(string $email): mixed
    {
        // TODO: return User::where('email', $email)->first();
    }

    public function findAll(): array
    {
        // TODO: return User::all()->toArray();
    }

    public function create(array $data): mixed
    {
        // TODO: return User::create($data);
    }

    public function update(int $id, array $data): bool
    {
        // TODO: return User::where('id', $id)->update($data);
    }

    public function delete(int $id): bool
    {
        // TODO: return User::destroy($id);
    }

    public function updatePassword(int $userId, string $hashedPassword): bool
    {
        // TODO: Implement
    }

    public function recordLoginAttempt(string $email, string $ip, bool $success): void
    {
        // TODO: Ghi vào bảng login_attempts
    }

    public function getFailedAttemptsCount(string $email, int $minutes): int
    {
        // TODO: Đếm lần thất bại trong khoảng $minutes phút gần đây
    }
}
