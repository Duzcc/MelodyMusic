<?php
// =============================================
// MIDDLEWARE: CHỐNG BRUTE FORCE
// TODO (Người 4): Viết logic vào hàm handle()
// =============================================

class ThrottleLoginAttempts
{
    private const MAX_ATTEMPTS = 5;     // Số lần sai tối đa
    private const LOCK_MINUTES = 10;    // Khóa bao nhiêu phút

    //Hàm 1: Đặt ở đầu Controller Đăng nhập để chặn luồng nếu đang bị khóa
    public static function handle(): void
    {
        // TODO (Người 4): Viết logic đếm số lần đăng nhập sai theo IP
        // Gợi ý:
        // session_start();
        // $ip  = $_SERVER['REMOTE_ADDR'];
        // $key = 'login_fail_' . $ip;
        // $data = $_SESSION[$key] ?? ['count' => 0, 'until' => 0];
        //
        // if (time() < $data['until']) {
        //     http_response_code(429);
        //     echo json_encode(['message' => 'Tài khoản bị khóa. Thử lại sau.']);
        //     exit;
        // }

        if (session_status() === PHP_SESSION_NONE){
            session_start();
        }

        $ip = $_SERVER['REMOTE_ADDR'];
        $key = 'login_fail_' . $ip;

        //Lấy dữ liệu đếm hoặc khởi tạo mặc định nếu chưa có
        $data = $_SESSION[$key] ?? ['count' => 0, 'until' => 0];

        //Kiểm tra xem thời gian hiện tại đã vượt qua thời gian khóa chưa
        if (time() < $data['until']) {
            $remainingMinutes = ceil(($data['until'] - time())/60);

            http_response_code(429); //429 Too Many Requests
            header('Content-Type: application/json');   
            echo json_encode([
                'status' => 'error',
                'message' => "Tài khoản bị tạm khóa vì nhập sai nhiều lần. Vui lòng thử lại sau $remainingMinutes phút."
            ]);
            exit;
        }
    }

    //Hàm 2: Gọi hàm này khi kiểm tra thấy mật khẩu hoặc tài khoản KHÔNG ĐÚNG
    public static function recordFailedAttempt(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $ip = $_SERVER['REMOTE_ADDR'];
        $key = 'login_fail_' . $ip;
        $data = $_SESSION[$key] ?? ['count' => 0, 'until' => 0];

        //Reset lại số đếm nếu trước đó đã từng bị khóa nhưng giờ đã hết thời gian khóa
        if(time() >= $data['until'] && $data['count'] >= self::MAX_ATTEMPTS){
            $data['count']=0;
        }

        $data['count']++; //Tăng số lần nhập sai

        //Nếu chậm mốc sai tối đa -> Cài đặt mốc thời gian (hiện tại + số phút khóa)
        if($data['count'] >= self::MAX_ATTEMPTS){
            $data['until'] = time() + (self::LOCK_MINUTES * 60);
        }

        $_SESSION[$key] = $data;
    }

    //Hàm 3: Gọi hàm này khi dăng nhập THÀNH CÔNG để xóa lịch sử nhập lại
    public static function clear(): void
    {
        if (session_status() === PHP_SESSION_NONE){
            session_start();
        }

        $ip = $_SERVER['REMOTE_ADDR'];
        $key = 'login_fail_' . $ip;

        //Xóa sạch lịch sử
        if(isset($_SESSION[$key])){
            unset($_SESSION[$key]);
        }
    }
}
