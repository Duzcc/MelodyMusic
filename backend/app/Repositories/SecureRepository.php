<?php

namespace App\Repositories;

use PDO;

class SecureRepository implements RepositoryInterface
{
    // Wraps queries trong prepared statements
    public function __construct(private PDO $pdo)
    {
    }

    public function findById(int $id): mixed
    {
        // TODO: Use $this->pdo->prepare() to prevent SQL Injection
        return null;
    }
}
