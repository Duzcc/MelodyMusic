<?php
// =============================================
// AUTH MIDDLEWARE (Bảo vệ Route)
// TODO: Viết logic kiểm tra JWT để bảo vệ các route cần đăng nhập
// =============================================

require_once __DIR__ . '/../services/JwtService.php';

class AuthMiddleware
{
    public static function handle(): void
    {
        // TODO:
        // 1. Đọc Header Authorization (Bearer Token)
        // 2. Dùng JwtService để xác thực Token
        // 3. Nếu token sai, hết hạn hoặc không có:
        //    http_response_code(401);
        //    echo json_encode(['message' => 'Unauthorized']);
        //    exit; // Chặn request tại đây
    }
}
