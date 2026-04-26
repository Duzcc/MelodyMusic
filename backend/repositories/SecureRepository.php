<?php
// =============================================
// SECURE REPOSITORY — Decorator Pattern
// Bọc UserRepository, thêm bảo mật SQL Injection
// TODO (Người 3): Viết code vào đây
// =============================================

class SecureRepository extends UserRepository
{
    // Kế thừa UserRepository → AbstractRepository → có $this->pdo sẵn

    // TODO (Người 3): Ghi đè các hàm cần bảo mật cao hơn
    // Ví dụ: Cập nhật mật khẩu, xóa tài khoản...

    // public function updatePassword(int $userId, string $hashedPassword): bool
    // {
    //     $stmt = $this->pdo->prepare("UPDATE users SET password = :pass WHERE id = :id");
    //     return $stmt->execute(['pass' => $hashedPassword, 'id' => $userId]);
    // }
}
