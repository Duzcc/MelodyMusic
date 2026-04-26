<?php
// =============================================
// MIDDLEWARE: CHỐNG BRUTE FORCE
// TODO (Người 4): Viết logic vào hàm handle()
// =============================================

class ThrottleLoginAttempts
{
    private const MAX_ATTEMPTS = 5;     // Số lần sai tối đa
    private const LOCK_MINUTES = 10;    // Khóa bao nhiêu phút

    public static function handle(): void
    {
        // TODO (Người 4): Viết logic đếm số lần đăng nhập sai theo IP
        // Gợi ý:
        // session_start();
        // $ip  = $_SERVER['REMOTE_ADDR'];
        // $key = 'login_fail_' . $ip;
        // $data = $_SESSION[$key] ?? ['count' => 0, 'until' => 0];
        //
        // if (time() < $data['until']) {
        //     http_response_code(429);
        //     echo json_encode(['message' => 'Tài khoản bị khóa. Thử lại sau.']);
        //     exit;
        // }
    }
}
