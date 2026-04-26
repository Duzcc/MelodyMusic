<?php
// =============================================
// TWO FACTOR CONTROLLER (C trong MVC)
// TODO (Người 5): Viết code vào hàm verify()
// =============================================

require_once __DIR__ . '/../core/BaseController.php';
require_once __DIR__ . '/../traits/Sanitizable.php';
require_once __DIR__ . '/../services/TwoFactorService.php';

class TwoFactorController extends BaseController
{
    use Sanitizable;

    // KHÔNG AI ĐƯỢC THÊM hoặc XÓA require_once ở trên

    public function verify(): void
    {
        // TODO (Người 5): Viết logic xác thực OTP tại đây
        // Các biến dùng sẵn:
        //   $body      = $this->getBody();                // Đọc JSON từ request
        //   $data      = $this->sanitizeData($body);      // Lọc dữ liệu (Trait)
        //   $twoFactor = new TwoFactorService();
        //   $email     = $data['email'] ?? '';
        //   $otp       = $data['otp']   ?? '';
        $this->json(['message' => 'TODO']);
    }
}
