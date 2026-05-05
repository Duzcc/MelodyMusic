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
    locked_until      DATETIME            NULL DEFAULT NULL,
    is_locked         TINYINT(1)          NOT NULL DEFAULT 0,
    created_at        DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Nếu bạn đã import schema cũ, chạy lệnh này để thêm cột locked_until:
-- ALTER TABLE users ADD COLUMN locked_until DATETIME NULL DEFAULT NULL AFTER login_fail_count;

CREATE TABLE IF NOT EXISTS login_attempts (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    ip_address     VARCHAR(45)  NOT NULL,
    email          VARCHAR(150) NOT NULL,
    attempted_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dữ liệu mẫu để test
-- Mật khẩu các user:
--   test@melody.com  → password
--   nam@melody.com   → melody123
--   admin@melody.com → admin2024
INSERT INTO users (name, email, password) VALUES
('Test User',  'test@melody.com',  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Nguyễn Nam', 'nam@melody.com',   '$2y$12$svNqLB2cz7TmIadnYDi9He1yigcAWv5iown/fBu6VDoU5XA648wsC'),
('Admin User', 'admin@melody.com', '$2y$12$8Fh8Wk.6f3U9UKESks1XS.h6Vu2eI0BI/jVWqLahOMXX1cKLKnq0m');
