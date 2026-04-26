<?php

namespace App\Decorators;

use App\Repositories\Interfaces\RepositoryInterface;
use PDO;

/**
 * Yêu cầu OOP: SecureRepository - Decorator Pattern
 * Bọc (wrap) các queries trong prepared statements để chống SQL Injection
 */
class SecureRepository implements RepositoryInterface
{
    public function __construct(
        private RepositoryInterface $wrapped, // Repository được bọc bên trong
        private PDO $pdo,
    ) {}

    public function findById(int $id): mixed
    {
        // TODO: Dùng prepared statement thay vì gọi thẳng $this->wrapped->findById()
        // $stmt = $this->pdo->prepare("SELECT * FROM ... WHERE id = ?");
        // $stmt->execute([$id]);
    }

    public function findAll(): array
    {
        // TODO: Delegate và validate output
        return $this->wrapped->findAll();
    }

    public function create(array $data): mixed
    {
        // TODO: Validate và sanitize trước khi gọi wrapped
        return $this->wrapped->create($data);
    }

    public function update(int $id, array $data): bool
    {
        // TODO: Validate trước khi gọi wrapped
        return $this->wrapped->update($id, $data);
    }

    public function delete(int $id): bool
    {
        // TODO: Log hành động xoá
        return $this->wrapped->delete($id);
    }
}
