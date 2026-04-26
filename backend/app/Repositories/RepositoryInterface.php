<?php

namespace App\Repositories;

interface RepositoryInterface
{
    // Đã chốt cứng signature, mọi người phải tuân theo
    public function findById(int $id): mixed;
    public function findByEmail(string $email): mixed;
}
