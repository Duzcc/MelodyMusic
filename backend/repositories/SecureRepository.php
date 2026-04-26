<?php
// =============================================
// SECURE REPOSITORY — Decorator Pattern
// Bọc thêm lớp bảo mật cao hơn UserRepository
// Các hàm nhạy cảm (đổi pass, khóa tài khoản)
// đều được thực thi tại đây bằng PDO thuần
// =============================================

require_once __DIR__ . '/UserRepository.php';

class SecureRepository extends UserRepository
{
    // Kế thừa $this->pdo từ AbstractRepository
    // Kế thừa tất cả hàm từ UserRepository

    /**
     * Decorator Pattern: Bọc hàm findByEmail() thêm bước
     * kiểm tra tài khoản có bị khóa trước khi trả về kết quả
     */
    public function findByEmail(string $email): mixed
    {
        // Gọi hàm gốc từ UserRepository (PDO Prepared Statement)
        $user = parent::findByEmail($email);

        // Thêm logic bảo mật: Kiểm tra tài khoản bị khóa
        if ($user && $user->is_locked) {
            return null; // Trả về null nếu tài khoản bị khóa
        }

        return $user;
    }

    /**
     * Cập nhật mật khẩu người dùng (dùng Prepared Statement)
     */
    public function updatePassword(int $userId, string $newPassword): bool
    {
        $stmt = $this->pdo->prepare(
            "UPDATE users SET password = :password WHERE id = :id"
        );
        return $stmt->execute([
            'password' => password_hash($newPassword, PASSWORD_BCRYPT),
            'id'       => $userId,
        ]);
    }

    /**
     * Ghi nhận số lần đăng nhập sai và khóa nếu quá 5 lần
     */
    public function recordLoginFailure(string $email): void
    {
        // Tăng số lần đăng nhập sai
        $stmt = $this->pdo->prepare(
            "UPDATE users
             SET login_fail_count = login_fail_count + 1,
                 is_locked = IF(login_fail_count + 1 >= 5, 1, 0)
             WHERE email = :email"
        );
        $stmt->execute(['email' => $email]);

        // Ghi vào bảng login_attempts
        $stmt = $this->pdo->prepare(
            "INSERT INTO login_attempts (ip_address, email)
             VALUES (:ip, :email)"
        );
        $stmt->execute([
            'ip'    => $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0',
            'email' => $email,
        ]);
    }

    /**
     * Đặt lại số lần sai về 0 sau khi đăng nhập thành công
     */
    public function resetLoginFailures(string $email): void
    {
        $stmt = $this->pdo->prepare(
            "UPDATE users
             SET login_fail_count = 0, is_locked = 0
             WHERE email = :email"
        );
        $stmt->execute(['email' => $email]);
    }
}
