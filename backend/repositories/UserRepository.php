<?php
// =============================================
// USER REPOSITORY
// Kế thừa AbstractRepository (đã có findById,
// findByEmail bằng PDO Prepared Statement).
// Bổ sung thêm các hàm đặc thù của bảng users
// mà Abstract không có.
// =============================================

require_once __DIR__ . '/AbstractRepository.php';

class UserRepository extends AbstractRepository
{
    /**
     * Tạo tài khoản user mới.
     *
     * Quy trình:
     *  1. Kiểm tra email đã tồn tại chưa (tránh duplicate)
     *  2. Hash mật khẩu bằng bcrypt trước khi lưu DB
     *  3. Dùng Prepared Statement để chống SQL Injection
     *
     * @return bool  true = tạo thành công, false = email đã tồn tại
     */
    public function create(string $name, string $email, string $password): bool
    {
        // Bước 1: Kiểm tra email trùng lặp
        if ($this->findByEmail($email) !== null) {
            return false;
        }

        // Bước 2: Insert với password đã được hash bcrypt
        $stmt = $this->pdo->prepare(
            "INSERT INTO users (name, email, password)
             VALUES (:name, :email, :password)"
        );
        return $stmt->execute([
            'name'     => $name,
            'email'    => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
        ]);
    }

    /**
     * Xác minh mật khẩu người dùng nhập so với hash trong DB.
     * Dùng password_verify() — hàm chuẩn PHP, chống timing attack.
     *
     * @param string $inputPassword   Mật khẩu plain-text người dùng gõ vào
     * @param string $hashedPassword  Chuỗi bcrypt hash lấy từ cột password trong DB
     * @return bool
     */
    public function verifyPassword(string $inputPassword, string $hashedPassword): bool
    {
        return password_verify($inputPassword, $hashedPassword);
    }
}
