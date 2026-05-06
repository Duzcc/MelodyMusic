<?php
// =============================================
// MIDDLEWARE: CHỐNG BRUTE FORCE
// Progressive Lockout: Khóa lũy tiến theo số lần sai
// Key: IP + Email → Sai user này không ảnh hưởng user khác
// =============================================

class ThrottleLoginAttempts
{
    // Bảng khóa dần (số lần sai tích lũy => phút khóa)
    private const LOCK_TIERS = [
        5  => 5,    // Sai 5 lần  → khóa 5 phút
        10 => 10,   // Sai 10 lần → khóa 10 phút
        15 => 15,   // Sai 15 lần → khóa 15 phút
        20 => 30,   // Sai 20 lần → khóa 30 phút
    ];
    private const PERMANENT_THRESHOLD = 25; // Sai 25+ lần → khóa hẳn

    /**
     * Tạo session key theo cặp IP + Email.
     * Mỗi cặp có bộ đếm riêng → Sai user này không khóa user khác.
     */
    private static function buildKey(string $email = ''): string
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        return 'login_fail_' . $ip . ':' . strtolower(trim($email));
    }

    /**
     * Xác định thời gian khóa dựa trên số lần sai tích lũy.
     */
    private static function getLockDuration(int $count): ?int
    {
        if ($count >= self::PERMANENT_THRESHOLD) {
            return -1;
        }
        $tiers = self::LOCK_TIERS;
        krsort($tiers);
        foreach ($tiers as $threshold => $minutes) {
            if ($count >= $threshold) {
                return $minutes;
            }
        }
        return null;
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

        $lockDuration = self::getLockDuration($data['count']);
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
