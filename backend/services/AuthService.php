<?php
// =============================================
// AUTH SERVICE (Tách logic nghiệp vụ)
// TODO (Người 1): Viết logic đăng nhập vào đây
// =============================================

require_once __DIR__ . '/../repositories/SecureRepository.php';
require_once __DIR__ . '/../services/JwtService.php';

class AuthService
{
    /**
     * @param string $email
     * @param string $password
     * @return array
     */
    public function attemptLogin(string $email, string $password): array
    {
        // TODO (Người 1): 
        // 1. Dùng SecureRepository để tìm user theo email
        // 2. So sánh mật khẩu (password_verify)
        // 3. Nếu đúng, dùng JwtService tạo token
        // 4. Trả về mảng chứa trạng thái và token
    $repo = new SecureRepository();

    // 1. Tìm user theo email
    $user = $repo->findByEmail($email);

    if (!$user) {
        return [
            'status' => 'error',
            'message' => 'Email không tồn tại'
        ];
    }

    // 2. Kiểm tra mật khẩu
    if (!password_verify($password, $user['password'])) {
        return [
            'status' => 'error',
            'message' => 'Sai mật khẩu'
        ];
    }

    // 3. Đúng mật khẩu -> Sinh và gửi OTP
    require_once __DIR__ . '/../services/TwoFactorService.php';
    $twoFactorService = new TwoFactorService();
    $twoFactorService->generateAndSendOtp($email);

    return [
        'status' => 'requires_2fa',
        'message' => 'Vui lòng kiểm tra OTP để hoàn tất đăng nhập',
        'email'  => $email
    ];
    }
}
