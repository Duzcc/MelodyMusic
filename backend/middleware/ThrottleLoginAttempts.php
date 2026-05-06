<?php
// =============================================
// MIDDLEWARE: CHỐNG BRUTE FORCE
// Progressive Lockout: Khóa lũy tiến theo số lần sai
// Key: IP + Email → Sai user này không ảnh hưởng user khác
// =============================================

require_once __DIR__ . '/../utils/LockoutPolicy.php';

class ThrottleLoginAttempts
{

    /**
     * Tạo session key theo cặp IP + Email.
     * Mỗi cặp có bộ đếm riêng → Sai user này không khóa user khác.
     */
    private static function buildKey(string $email = ''): string
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        return 'login_fail_' . $ip . ':' . strtolower(trim($email));
    }



    // Hàm 1: Đặt ở đầu Controller. Chặn luồng nếu đang bị khóa.
    public static function handle(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Đọc email từ request body (php://input có thể đọc nhiều lần trong PHP 8)
        $body  = json_decode(file_get_contents('php://input'), true) ?? [];
        $email = $body['email'] ?? '';

        $key  = self::buildKey($email);
        $data = $_SESSION[$key] ?? ['count' => 0, 'until' => 0, 'permanent' => false];

        // Kiểm tra khóa vĩnh viễn
        if (!empty($data['permanent'])) {
            http_response_code(429);
            header('Content-Type: application/json');
            echo json_encode([
                'status'  => 'error',
                'message' => 'Quá nhiều lần thử sai từ thiết bị này. Vui lòng liên hệ quản trị viên.'
            ]);
            exit;
        }

        // Kiểm tra khóa tạm thời
        if (time() < $data['until']) {
            $remainingMinutes = ceil(($data['until'] - time()) / 60);
            http_response_code(429);
            header('Content-Type: application/json');
            echo json_encode([
                'status'  => 'error',
                'message' => "Quá nhiều lần thử sai. Vui lòng thử lại sau {$remainingMinutes} phút."
            ]);
            exit;
        }
    }

    // Hàm 2: Gọi khi kiểm tra thấy mật khẩu KHÔNG ĐÚNG. Tăng bộ đếm và khóa.
    public static function recordFailedAttempt(string $email = ''): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $key  = self::buildKey($email);
        $data = $_SESSION[$key] ?? ['count' => 0, 'until' => 0, 'permanent' => false];

        // Nếu đang trong thời gian khóa thì không tăng thêm (tránh spam)
        if (time() < $data['until']) {
            return;
        }

        // Tăng số lần sai tích lũy
        $data['count']++;

        $lockDuration = LockoutPolicy::getLockDuration($data['count']);
        if ($lockDuration === -1) {
            $data['permanent'] = true;
            $data['until']     = PHP_INT_MAX;
        } elseif ($lockDuration !== null) {
            $data['until'] = time() + ($lockDuration * 60);
        }

        $_SESSION[$key] = $data;
    }

    // Hàm 3: Gọi khi đăng nhập THÀNH CÔNG — Xóa lịch sử của đúng email đó.
    public static function clear(string $email = ''): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $key = self::buildKey($email);
        if (isset($_SESSION[$key])) {
            unset($_SESSION[$key]);
        }
    }
}
