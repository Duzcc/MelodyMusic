<?php
// =============================================
// TWO FACTOR CONTROLLER (C trong MVC)
// Người 5: OTP 2FA
// =============================================

require_once __DIR__ . '/../core/BaseController.php';
require_once __DIR__ . '/../traits/Sanitizable.php';
require_once __DIR__ . '/../services/TwoFactorService.php';

class TwoFactorController extends BaseController
{
    use Sanitizable;

    // KHÔNG AI ĐƯỢC THÊM hoặc XÓA require_once ở trên

    /**
     * Xác thực OTP (2FA)
     * Endpoint: POST /verify-otp (tuỳ route)
     */
    public function verify(): void
    {
        // 1. Lấy dữ liệu từ request
        $body = $this->getBody();
        $data = $this->sanitizeData($body);

        $email = $data['email'] ?? '';
        $otp   = $data['otp']   ?? '';

        // 2. Validate input
        if (empty($email) || empty($otp)) {
            $this->json([
                'success' => false,
                'message' => 'Email và OTP không được để trống'
            ], 400);
            return;
        }

        // 3. Gọi service kiểm tra OTP
        $twoFactor = new TwoFactorService();
        $isValid = $twoFactor->verifyOtp($email, $otp);

        if (!$isValid) {
            $this->json([
                'success' => false,
                'message' => 'OTP không hợp lệ hoặc đã hết hạn'
            ], 401);
            return;
        }

        // 4. Thành công → đánh dấu đã xác thực 2FA
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION['2fa_verified'][$email] = true;

        // 5. Trả kết quả
        $this->json([
            'success' => true,
            'message' => 'Xác thực 2FA thành công'
        ]);
    }
}