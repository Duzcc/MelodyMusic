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
        // 0. Chống Brute Force cho OTP (Ngăn chặn spam thử mã OTP)
        require_once __DIR__ . '/../middleware/ThrottleLoginAttempts.php';
        ThrottleLoginAttempts::handle();

        // 1. Lấy dữ liệu từ request
        $body = $this->getBody();
        $data = $this->sanitizeData($body);

        // 1.5. Kiểm tra CSRF (Bảo vệ form nhập OTP)
        require_once __DIR__ . '/../services/CsrfTokenManager.php';
        $csrf = new CsrfTokenManager();
        if (!isset($data['csrf_token']) || !$csrf->validateToken($data['csrf_token'])) {
            $this->json([
                'success' => false,
                'message' => 'CSRF token không hợp lệ'
            ], 403);
            return;
        }

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
            // Ghi nhận 1 lần sai để chống Brute Force
            ThrottleLoginAttempts::recordFailedAttempt();

            $this->json([
                'success' => false,
                'message' => 'OTP không hợp lệ hoặc đã hết hạn'
            ], 401);
            return;
        }

        // OTP đúng -> Xóa lịch sử Brute Force
        ThrottleLoginAttempts::clear();

        // 4. Thành công → đánh dấu đã xác thực 2FA
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION['2fa_verified'][$email] = true;

        // 5. Tạo JWT Token
        require_once __DIR__ . '/../repositories/SecureRepository.php';
        require_once __DIR__ . '/../services/JwtService.php';
        
        $repo = new SecureRepository();
        $user = $repo->findByEmail($email);
        
        $jwtService = new JwtService();
        $token = $jwtService->generateToken($user);

        // 6. Trả kết quả kèm Token
        $this->json([
            'success' => true,
            'message' => 'Xác thực 2FA thành công',
            'token'   => $token
        ]);
    }
}