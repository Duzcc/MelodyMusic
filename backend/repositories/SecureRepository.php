<?php
// =============================================
// SECURE REPOSITORY — Decorator Pattern
//
// Decorator Pattern: Lớp này KHÔNG viết lại từ đầu
// mà BỌC THÊM logic bảo mật lên trên UserRepository.
//
// Cụ thể những gì được "bọc thêm":
//   findById()            → Validate id > 0 trước khi chạy SQL
//   findByEmail()         → Validate email format trước khi chạy SQL
//   updatePassword()      → Đổi mật khẩu an toàn (bcrypt + PDO)
//   recordLoginFailure()  → Ghi log thất bại + tự khóa sau 5 lần sai
//   resetLoginFailures()  → Reset bộ đếm sau khi đăng nhập thành công
//
// Tất cả câu lệnh SQL đều dùng PDO Prepared Statements
// với tham số đặt tên (:param) để chống SQL Injection.
// =============================================

require_once __DIR__ . '/UserRepository.php';

class SecureRepository extends UserRepository
{
    // Kế thừa toàn bộ từ chuỗi:
    //   AbstractRepository → UserRepository → SecureRepository
    // Bao gồm: $this->pdo, findById(), findByEmail(),
    //          create(), verifyPassword()

    // ─────────────────────────────────────────────
    // DECORATOR: Override các hàm gốc để bọc thêm lớp bảo mật
    // ─────────────────────────────────────────────

    /**
     * Override findById() — Thêm bước kiểm tra id hợp lệ
     * trước khi cho phép chạy câu lệnh SELECT.
     */
    public function findById(int $id): mixed
    {
        // Bảo mật thêm: id phải là số dương
        if ($id <= 0) {
            return null;
        }

        // Gọi hàm gốc từ AbstractRepository (PDO Prepared Statement)
        return parent::findById($id);
    }

    /**
     * Override findByEmail() — Thêm bước validate format email
     * trước khi cho phép chạy câu lệnh SELECT.
     * Chặn các chuỗi độc hại không đúng định dạng email ngay từ đầu.
     */
    public function findByEmail(string $email): mixed
    {
        // Bảo mật thêm: email phải đúng định dạng abc@domain.com
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return null;
        }

        // Gọi hàm gốc từ AbstractRepository (PDO Prepared Statement)
        // Caller kiểm tra $user->is_locked để biết tài khoản có bị khóa không
        return parent::findByEmail($email);
    }

    // ─────────────────────────────────────────────
    // Các hàm bảo mật mới, UserRepository không có
    // ─────────────────────────────────────────────

    /**
     * Cập nhật mật khẩu an toàn:
     *  - Hash bcrypt trước khi lưu
     *  - Dùng Prepared Statement để chống SQL Injection
     */
    public function updatePassword(int $userId, string $newPassword): bool
    {
        $stmt = $this->pdo->prepare(
            "UPDATE users
             SET password = :password
             WHERE id = :id"
        );
        return $stmt->execute([
            'password' => password_hash($newPassword, PASSWORD_BCRYPT),
            'id'       => $userId,
        ]);
    }

    /**
     * Ghi nhận một lần đăng nhập thất bại:
     *  1. Tăng login_fail_count lên 1
     *  2. Tự động khóa tài khoản (is_locked = 1) nếu đạt 5 lần sai
     *  3. Lưu bản ghi vào bảng login_attempts (IP + email + thời gian)
     */
    public function recordLoginFailure(string $email): void
    {
        // Tăng bộ đếm và tự khóa khi đủ ngưỡng 5 lần
        $stmt = $this->pdo->prepare(
            "UPDATE users
             SET login_fail_count = login_fail_count + 1,
                 is_locked        = IF(login_fail_count + 1 >= 5, 1, 0)
             WHERE email = :email"
        );
        $stmt->execute(['email' => $email]);

        // Lưu lịch sử vào bảng login_attempts để audit sau
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
     * Reset bộ đếm về 0 sau khi đăng nhập thành công.
     * Mở khóa tài khoản nếu đang bị khóa.
     */
    public function resetLoginFailures(string $email): void
    {
        $stmt = $this->pdo->prepare(
            "UPDATE users
             SET login_fail_count = 0,
                 is_locked        = 0
             WHERE email = :email"
        );
        $stmt->execute(['email' => $email]);
    }
}
