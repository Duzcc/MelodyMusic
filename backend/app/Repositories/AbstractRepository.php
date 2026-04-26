<?php

namespace App\Repositories;

abstract class AbstractRepository implements RepositoryInterface
{
    // Cung cấp các hàm dùng chung cho các Model
    public function findById(int $id): mixed
    {
        // TODO: Base implementation
        return null;
    }

    // Các hàm chung khác có thể định nghĩa ở đây
}
