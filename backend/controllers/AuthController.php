<?php
// =============================================
// AUTH CONTROLLER (C trong MVC)
// TODO (Người 1): Viết code vào hàm login()
// =============================================

require_once __DIR__ . '/../core/BaseController.php';
require_once __DIR__ . '/../traits/Sanitizable.php';
require_once __DIR__ . '/../services/CsrfTokenManager.php';
require_once __DIR__ . '/../services/JwtService.php';
require_once __DIR__ . '/../repositories/SecureRepository.php';
require_once __DIR__ . '/../middleware/ThrottleLoginAttempts.php';

class AuthController extends BaseController
{
    use Sanitizable;

    // KHÔNG AI ĐƯỢC THÊM hoặc XÓA require_once ở trên

    public function login(): void
    {
        // TODO (Người 1): Viết logic đăng nhập + kiểm tra CSRF tại đây
        // Người 4: Kiểm tra brute force được gọi từ middleware ThrottleLoginAttempts
        // Các biến dùng sẵn:
        //   $body       = $this->getBody();               // Đọc JSON từ request
        //   $data       = $this->sanitizeData($body);     // Lọc dữ liệu (Trait)
        //   $csrf       = new CsrfTokenManager();
        //   $jwt        = new JwtService();
        //   $repository = new SecureRepository();
        $this->json(['message' => 'TODO']);
    }
}
