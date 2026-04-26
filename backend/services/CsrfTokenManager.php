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
        return '';
    }

    public function validateToken(string $token): bool
    {
        // TODO (Người 1): So sánh token nhận được với token trong session
        // Gợi ý: return hash_equals($_SESSION['csrf_token'] ?? '', $token);
        return false;
    }
}
