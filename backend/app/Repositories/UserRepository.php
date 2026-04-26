<?php

namespace App\Repositories;

use PDO;

class UserRepository extends AbstractRepository
{
    // Người 3 chỉ override 2 hàm này nếu cần logic riêng
    // AbstractRepository đã implement findById() và findByEmail() sẵn rồi

    // TODO (Người 3): Nếu muốn ghi đè, override findByEmail() tại đây
    // public function findByEmail(string $email): mixed { ... }
}
