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
        // 1. Đọc Header Authorization (hỗ trợ cả Apache và Nginx)
        $headers = function_exists('apache_request_headers') ? apache_request_headers() : [];
        $authHeader = $headers['Authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        // Kiểm tra định dạng chuỗi "Bearer <token>"
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Truy cập bị từ chối: Thiếu hoặc sai định dạng Token.']);
            exit;
        }

        $token = $matches[1];

        // 2. Dùng JwtService để xác thực Token (do Phương viết)
        $jwtService = new JwtService();
        $payload = $jwtService->verifyToken($token);

        // 3. Nếu token sai, hết hạn hoặc bị sửa đổi
        if ($payload === false) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Truy cập bị từ chối: Token không hợp lệ hoặc đã hết hạn.']);
            exit;
        }

        // 4. Nếu thành công: Lưu thông tin payload (chứa user_id) vào $_REQUEST
        // Để Controller phía sau có thể dùng biến $_REQUEST['user'] biết ai đang gọi API
        $_REQUEST['user'] = $payload;
    }
}
