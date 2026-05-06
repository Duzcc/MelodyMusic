<?php
// =============================================
// KẾT NỐI DATABASE
// CHỈ NHÓM TRƯỞNG SỬA FILE NÀY
// =============================================

// Dùng 127.0.0.1 thay vì localhost để tránh lỗi Unix socket trên macOS
define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'melodymusic');
define('DB_USER', 'root');
define('DB_PASS', '');

function getDBConnection(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8",
            DB_USER,
            DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    }
    return $pdo;
}
