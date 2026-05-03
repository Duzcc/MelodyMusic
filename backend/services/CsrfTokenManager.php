<?php
// =============================================
// CSRF TOKEN MANAGER
// TODO (Người 1): Viết logic xử lý vào đây
// =============================================

class CsrfTokenManager
{
    public function generateToken(): string
    {
        // TODO (Người 1): Sinh chuỗi ngẫu nhiên và lưu vào session
        // Gợi ý: $token = bin2hex(random_bytes(32)); $_SESSION['csrf_token'] = $token;
         // đảm bảo session đã được start
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // tạo token ngẫu nhiên
        $token = bin2hex(random_bytes(32));

        // lưu vào session
        $_SESSION['csrf_token'] = $token;

        return $token;
    }

    public function validateToken(string $token): bool
    {
        // TODO (Người 1): So sánh token nhận được với token trong session
        // Gợi ý: return hash_equals($_SESSION['csrf_token'] ?? '', $token);
        // đảm bảo session đã được start
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // lấy token trong session
        $sessionToken = $_SESSION['csrf_token'] ?? '';

        // so sánh an toàn
        return hash_equals($sessionToken, $token);
    }
}
