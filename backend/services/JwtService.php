<?php
// =============================================
// JWT SERVICE
// TODO (Người 4): Viết logic xử lý vào đây
// =============================================

class JwtService
{
    private string $secretKey = 'MELODY_SECRET_KEY_2024'; // Đổi thành chuỗi bí mật thật

    //Hàm hỗ trợ: Mã hóa Base64 chuẩn an toàn cho URL (loại bỏ kí tự +, /, =)
    private function base64UrlEncode(string $data): string
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }
    public function generateToken(array $payload): string
    {
        // TODO (Người 4): Tạo token theo chuẩn header.payload.signature
        // Gợi ý:
        // $header  = base64_encode(json_encode(['alg'=>'HS256','typ'=>'JWT']));
        // $payload = base64_encode(json_encode($payload + ['exp' => time() + 3600]));
        // $sig     = hash_hmac('sha256', "$header.$payload", $this->secretKey);
        // return "$header.$payload.$sig";

        //1. Tạo header
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

        //2. Tạo Payload (Thêm thời gian hết hạn exp - mặc định sống 1 tiếng = 3600s)
        $payload['exp'] = time() +3600; 
        $payloadJson = json_encode($payload);

        //3. Mã hóa header và payload sang Base64Url
        $base64UrlHeader = $this->base64UrlEncode($header);
        $base64UrlPayload = $this->base64UrlEncode($payloadJson);

        //4. Tạo chữ ký bằng HMAC-SHA256
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secretKey, true);
        $base64UrlSignature = $this->base64UrlEncode($signature);

        //5. Nối lại thành JWT chuẩn
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public function verifyToken(string $token): array|false
    {
        // TODO (Người 4): Tách token, kiểm tra chữ ký và thời hạn

        //1. Tách chuỗi token thành 3 phần
        $parts = explode('.' , $token);
        if(count($parts) !== 3){
            return false; //Token không đúng định dạng
        }

        [$base64UrlHeader, $base64UrlPayload, $base64UrlSignature] = $parts;

        //2. Tính toán lại chữ ký dựa trên Header và Payload gửi lên
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secretKey, true);
        $expectedSignature = $this->base64UrlEncode($signature);

        //3. So sánh chữ ký (Dùng hash_equals để chống tấn công Timing Attack)
        if(!hash_equals($expectedSignature, $base64UrlSignature)){
            return false; //Chữ ký sai -> Token không hợp lệ hoặc đã bị sửa
        }

        //4. Giải mã payload để lấy dữ liệu User
        $base64Payload = str_replace(['-', '_'], ['+', '/'], $base64UrlPayload);
        $payload = json_decode(base64_decode($base64Payload), true);

        //5. Kiểm tra thời gian hết hạn
        if (isset($payload['exp']) && time() > $payload['exp']) {
            return false; //Token quá hạn
        }

        return $payload;
    }
}
