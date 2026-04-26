<?php

namespace App\Repositories;

use PDO;

class SecureRepository extends UserRepository
{
    // Decorator Pattern: Bọc truy vấn trong Prepared Statements để chống SQL Injection

    // AbstractRepository đã xử lý PDO cơ bản.
    // Người 3 thêm các hàm đặc thù cần bảo mật cao hơn tại đây.

    // TODO (Người 3): Thêm các hàm truy vấn nhạy cảm (VD: đổi mật khẩu, xóa tài khoản)
    // public function updatePassword(int $userId, string $hashedPassword): bool { ... }
}
