<?php
// =============================================
// TWO FACTOR SERVICE (OTP)
// TODO (Người 5): Viết logic xử lý vào đây
// =============================================

class TwoFactorService
{
    public function generateAndSendOtp(string $email): void
    {
        // TODO (Người 5): Sinh mã 6 số và lưu vào session kèm thời hạn 5 phút
        // Gợi ý:
        // $otp = strval(random_int(100000, 999999));
        // $_SESSION['otp'][$email] = ['code' => $otp, 'expires' => time() + 300];
        // Sau đó gửi email chứa $otp tới người dùng
    }

    public function verifyOtp(string $email, string $otp): bool
    {
        // TODO (Người 5): Kiểm tra OTP trong session có khớp và còn hạn không
        // Gợi ý:
        // $stored = $_SESSION['otp'][$email] ?? null;
        // if (!$stored || time() > $stored['expires']) return false;
        // return hash_equals($stored['code'], $otp);
        return false;
    }
}
