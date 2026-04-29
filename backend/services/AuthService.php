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
     * @param string $username
     * @param string $password
     * @return array
     */
    public function attemptLogin(string $username, string $password): array
    {
        // TODO (Người 1): 
        // 1. Dùng SecureRepository để tìm user theo username
        // 2. So sánh mật khẩu (password_verify)
        // 3. Nếu đúng, dùng JwtService tạo token
        // 4. Trả về mảng chứa trạng thái và token
        
        return [
            'status' => 'success',
            'token'  => 'jwt_token_here'
        ];
    }
}
