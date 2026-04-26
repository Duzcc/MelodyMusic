<?php
// =============================================
// JWT SERVICE
// TODO (Người 4): Viết logic xử lý vào đây
// =============================================

class JwtService
{
    private string $secretKey = 'MELODY_SECRET_KEY_2024'; // Đổi thành chuỗi bí mật thật

    public function generateToken(array $payload): string
    {
        // TODO (Người 4): Tạo token theo chuẩn header.payload.signature
        // Gợi ý:
        // $header  = base64_encode(json_encode(['alg'=>'HS256','typ'=>'JWT']));
        // $payload = base64_encode(json_encode($payload + ['exp' => time() + 3600]));
        // $sig     = hash_hmac('sha256', "$header.$payload", $this->secretKey);
        // return "$header.$payload.$sig";
        return '';
    }

    public function verifyToken(string $token): array|false
    {
        // TODO (Người 4): Tách token, kiểm tra chữ ký và thời hạn
        return false;
    }
}
