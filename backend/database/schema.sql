-- =============================================
-- DATABASE SCHEMA
-- Chạy file này trong phpMyAdmin / MySQL CLI
-- =============================================

CREATE DATABASE IF NOT EXISTS melodymusic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE melodymusic;

CREATE TABLE IF NOT EXISTS users (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    name              VARCHAR(100)        NOT NULL,
    email             VARCHAR(150)        NOT NULL UNIQUE,
    password          VARCHAR(255)        NOT NULL,
    otp               VARCHAR(6)          NULL,
    otp_expires       DATETIME            NULL,
    login_fail_count  INT                 NOT NULL DEFAULT 0,
    is_locked         TINYINT(1)          NOT NULL DEFAULT 0,
    created_at        DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS login_attempts (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    ip_address     VARCHAR(45)  NOT NULL,
    email          VARCHAR(150) NOT NULL,
    attempted_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dữ liệu mẫu để test (password = '123456')
INSERT INTO users (name, email, password) VALUES
('Test User', 'test@melody.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
