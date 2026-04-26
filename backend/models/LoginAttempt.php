<?php
// =============================================
// MODEL: LoginAttempt
// Lưu lịch sử mỗi lần đăng nhập thất bại
// =============================================

class LoginAttempt
{
    public int    $id;
    public string $ip_address;
    public string $email;
    public string $attempted_at;
}
