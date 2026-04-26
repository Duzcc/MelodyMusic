<?php

namespace App\Repositories\Interfaces;

/**
 * Yêu cầu OOP: RepositoryInterface (Decorator Pattern)
 * Interface cơ sở cho tất cả Repository trong hệ thống
 */
interface RepositoryInterface
{
    public function findById(int $id): mixed;

    public function findAll(): array;

    public function create(array $data): mixed;

    public function update(int $id, array $data): bool;

    public function delete(int $id): bool;
}
