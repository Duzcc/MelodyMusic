<?php
// =============================================
// USER REPOSITORY
// Kế thừa AbstractRepository, thêm các hàm
// đặc thù liên quan đến bảng users
// =============================================

require_once __DIR__ . '/AbstractRepository.php';

class UserRepository extends AbstractRepository
{
    /**
     * Tìm user theo email (Override từ AbstractRepository)
     * Dùng Prepared Statement để chống SQL Injection
     */
    public function findByEmail(string $email): mixed
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM users WHERE email = :email LIMIT 1"
        );
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_OBJ) ?: null;
    }

    /**
     * Tạo user mới trong database
     */
    public function create(string $name, string $email, string $password): bool
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)"
        );
        return $stmt->execute([
            'name'     => $name,
            'email'    => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
        ]);
    }

    /**
     * Kiểm tra mật khẩu người dùng nhập có khớp với hash trong DB không
     */
    public function verifyPassword(string $inputPassword, string $hashedPassword): bool
    {
        return password_verify($inputPassword, $hashedPassword);
    }
}
