<?php
// =============================================
// MIDDLEWARE: CHỐNG BRUTE FORCE
// Progressive Lockout: Khóa lử tiến theo số lần sai
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
     * Xác định thời gian khóa dựa trên số lần sai tích lũy.
     * Trả về NULL nếu chưa đến ngưỡng nào.
     * Trả về -1 nếu đến ngưỡng khóa vĩnh viễn.
     */
    private static function getLockDuration(int $count): ?int
    {
        if ($count >= self::PERMANENT_THRESHOLD) {
            return -1; // Khóa vĩnh viễn (session)
        }
        // Duyệt từ ngưỡng cao xuống thấp
        $tiers = self::LOCK_TIERS;
        krsort($tiers);
        foreach ($tiers as $threshold => $minutes) {
            if ($count >= $threshold) {
                return $minutes;
            }
        }
        return null; // Chưa đến ngưỡng khóa
    }

    // Hàm 1: Đặt ở đầu Controller. Chặn luồng nếu đang bị khóa.
    public static function handle(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $ip  = $_SERVER['REMOTE_ADDR'];
        $key = 'login_fail_' . $ip;
        $data = $_SESSION[$key] ?? ['count' => 0, 'until' => 0, 'permanent' => false];

        // Kiểm tra khóa vĩnh viễn
        if (!empty($data['permanent'])) {
            http_response_code(429);
            header('Content-Type: application/json');
            echo json_encode([
                'status'  => 'error',
                'message' => 'IP của bạn đã bị khóa vĩnh viễn do đăng nhập sai quá nhiều lần. Liên hệ quản trị viên.'
            ]);
            exit;
        }

        // Kiểm tra khóa tạm thời
        if (time() < $data['until']) {
            $remainingSeconds = $data['until'] - time();
            $remainingMinutes = ceil($remainingSeconds / 60);
            http_response_code(429);
            header('Content-Type: application/json');
            echo json_encode([
                'status'  => 'error',
                'message' => "Tài khoản tạm thời bị khóa do đăng nhập sai nhiều lần. Vui lòng thử lại sau {$remainingMinutes} phút."
            ]);
            exit;
        }
    }

    // Hàm 2: Gọi khi kiểm tra thấy mật khẩu KHÔNG ĐÚNG. Tăng bộ đếm và khóa.
    public static function recordFailedAttempt(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $ip  = $_SERVER['REMOTE_ADDR'];
        $key = 'login_fail_' . $ip;
        $data = $_SESSION[$key] ?? ['count' => 0, 'until' => 0, 'permanent' => false];

        // Nếu đang trong thời gian bị khóa thì không tăng thêm (tránh spam)
        if (time() < $data['until']) {
            return;
        }

        // Tăng số lần sai tích lũy (không reset sau mỗi đợt khóa)
        $data['count']++;

        // Xác định thời gian khóa mới
        $lockDuration = self::getLockDuration($data['count']);
        if ($lockDuration === -1) {
            // Khóa vĩnh viễn
            $data['permanent'] = true;
            $data['until']     = PHP_INT_MAX;
        } elseif ($lockDuration !== null) {
            // Khóa tạm thời theo bảng tiến
            $data['until'] = time() + ($lockDuration * 60);
        }

        $_SESSION[$key] = $data;
    }

    // Hàm 3: Gọi khi đăng nhập THÀNH CÔNG — Xóa hoàn toàn lịch sử
    public static function clear(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $ip  = $_SERVER['REMOTE_ADDR'];
        $key = 'login_fail_' . $ip;
        if (isset($_SESSION[$key])) {
            unset($_SESSION[$key]);
        }
    }
}
