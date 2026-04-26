<?php

namespace App\Repositories;

class UserRepository extends AbstractRepository
{
    // Kế thừa AbstractRepository và triển khai các hàm cụ thể của User
    public function findByEmail(string $email): mixed
    {
        // TODO: Tìm user theo email
        return null;
    }
}
