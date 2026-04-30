<?php
// =============================================
// TWO FACTOR SERVICE (OTP)
// Người 5: Xử lý logic OTP
// =============================================

class TwoFactorService
{
    private const OTP_EXPIRY = 300; // 5 phút

    public function generateAndSendOtp(string $email): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // 1. Sinh OTP 6 số
        $otp = strval(random_int(100000, 999999));

        // 2. Lưu vào session kèm thời hạn
        $_SESSION['otp'][$email] = [
            'code' => $otp,
            'expires' => time() + self::OTP_EXPIRY
        ];

        // 3. Gửi OTP (demo: log ra để test)
        error_log("OTP for $email: $otp");

        // Nếu muốn gửi mail thật:
        // mail($email, "Your OTP Code", "Your OTP is: $otp");
    }

    public function verifyOtp(string $email, string $otp): bool
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // 1. Lấy OTP đã lưu
        $stored = $_SESSION['otp'][$email] ?? null;

        // 2. Kiểm tra tồn tại
        if (!$stored) {
            return false;
        }

        // 3. Kiểm tra hết hạn
        if (time() > $stored['expires']) {
            unset($_SESSION['otp'][$email]); // dọn session
            return false;
        }

        // 4. So sánh an toàn
        $isValid = hash_equals($stored['code'], $otp);

        // 5. Nếu đúng → xóa OTP (tránh dùng lại)
        if ($isValid) {
            unset($_SESSION['otp'][$email]);
        }

        return $isValid;
    }
}