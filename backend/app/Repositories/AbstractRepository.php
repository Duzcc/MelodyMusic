<?php

namespace App\Repositories;

use PDO;

abstract class AbstractRepository implements RepositoryInterface
{
    protected PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function findById(int $id): mixed
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_OBJ) ?: null;
    }

    public function findByEmail(string $email): mixed
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_OBJ) ?: null;
    }
}
