<?php
// =============================================
// MODEL: User
// Ánh xạ trực tiếp với bảng `users` trong DB
// =============================================

class User
{
    public int    $id;
    public string $name;
    public string $email;
    public string $password;
    public ?string $otp        = null;
    public ?string $otp_expires = null;
    public int    $login_fail_count = 0;
    public bool   $is_locked   = false;
    public string $created_at;
}
