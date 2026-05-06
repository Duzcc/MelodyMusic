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
//   recordLoginFailure()  → Progressive Lockout: Khóa lũy tiến 5/10/15/30 phút
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
     * Ghi nhận một lần đăng nhập thất bại và áp dụng khóa lũy tiến.
     * - 5 lần sai  → khóa 5 phút  (cột locked_until)
     * - 10 lần sai → khóa 10 phút
     * - 15 lần sai → khóa 15 phút
     * - 20 lần sai → khóa 30 phút
     * - 25+ lần   → khóa hẳn (is_locked = 1)
     */
    public function recordLoginFailure(string $email): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return;
        }

        // Lấy số lần sai hiện tại
        $user = parent::findByEmail($email);
        if (!$user) return;

        require_once __DIR__ . '/../utils/LockoutPolicy.php';
        
        $newCount = $user->login_fail_count + 1;
        $lockedUntil = null;
        $isLocked = 0;

        $duration = LockoutPolicy::getLockDuration($newCount);

        if ($duration === -1) {
            $isLocked = 1;
        } elseif ($duration !== null) {
            $lockedUntil = date('Y-m-d H:i:s', time() + $duration * 60);
        }

        // Cập nhật DB
        $stmt = $this->pdo->prepare(
            'UPDATE users
             SET login_fail_count = :count,
                 locked_until     = :until,
                 is_locked        = :locked
             WHERE email = :email'
        );
        $stmt->execute([
            ':count'  => $newCount,
            ':until'  => $lockedUntil,
            ':locked' => $isLocked,
            ':email'  => $email,
        ]);

        // Lưu lịch sử vào bảng login_attempts để audit
        $stmt = $this->pdo->prepare(
            'INSERT INTO login_attempts (ip_address, email) VALUES (:ip, :email)'
        );
        $stmt->execute([
            ':ip'    => $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0',
            ':email' => $email,
        ]);
    }

    /**
     * Reset bộ đếm về 0 sau khi đăng nhập thành công.
     * Mở khóa tài khoản nếu đang bị khóa (cả tạm thời và vĩnh viễn).
     */
    public function resetLoginFailures(string $email): void
    {
        $stmt = $this->pdo->prepare(
            'UPDATE users
             SET login_fail_count = 0,
                 locked_until     = NULL,
                 is_locked        = 0
             WHERE email = :email'
        );
        $stmt->execute([':email' => $email]);
    }
}
