<?php
// =============================================
// ABSTRACT REPOSITORY — Base truy vấn chung
// Đã implement sẵn findById, findByEmail bằng PDO
// Người 3 có thể override nếu cần
// =============================================

require_once __DIR__ . '/RepositoryInterface.php';

abstract class AbstractRepository implements RepositoryInterface
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = getDBConnection(); // Lấy connection từ config/database.php
    }

    public function findById(int $id): mixed
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_OBJ) ?: null;
    }

    public function findByEmail(string $email): mixed
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_OBJ) ?: null;
    }
}
