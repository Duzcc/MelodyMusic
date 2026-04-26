<?php

namespace App\Repositories;

interface RepositoryInterface
{
    // Decorator Pattern
    public function findById(int $id): mixed;
}
