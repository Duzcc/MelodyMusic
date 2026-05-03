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
require_once __DIR__ . '/../services/AuthService.php';

class AuthController extends BaseController
{
    use Sanitizable;

    // KHÔNG AI ĐƯỢC THÊM hoặc XÓA require_once ở trên (Ngoại trừ Lead)

    public function login(): void
    {
        // TODO (Người 1): Viết logic nhận Request và gọi AuthService tại đây
        // Người 4: Kiểm tra brute force được gọi từ middleware ThrottleLoginAttempts
        // Các biến dùng sẵn:
        //   $body        = $this->getBody();               // Đọc JSON từ request
        //   $data        = $this->sanitizeData($body);     // Lọc dữ liệu (Trait)
        //   $csrf        = new CsrfTokenManager();
        //   $authService = new AuthService();              // Gọi Service xử lý nghiệp vụ
    // 1. Lấy dữ liệu từ request
    $body = $this->getBody();

    // 2. Làm sạch dữ liệu
    $data = $this->sanitizeData($body);

    // 3. Kiểm tra dữ liệu đầu vào
    if (!isset($data['email']) || !isset($data['password']) || !isset($data['csrf_token'])) {
        $this->json([
            'success' => false,
            'message' => 'Thiếu dữ liệu'
        ]);
        return;
    }

    // 4. Kiểm tra CSRF
    $csrf = new CsrfTokenManager();
    if (!$csrf->validateToken($data['csrf_token'])) {
        $this->json([
            'success' => false,
            'message' => 'CSRF token không hợp lệ'
        ]);
        return;
    }

    // 5. Gọi AuthService để login
    $authService = new AuthService();
    $result = $authService->attemptLogin(
        $data['email'],
        $data['password']
    );

    // 6. Trả kết quả về client
    $this->json($result);
    }
}

