<?php
// =============================================
// KẾT NỐI DATABASE
// CHỈ NHÓM TRƯỞNG SỬA FILE NÀY
// =============================================

define('DB_HOST', 'localhost');
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
