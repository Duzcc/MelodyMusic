<?php

namespace App\Exceptions;

use Exception;

/**
 * Exception cho các lỗi xác thực (Auth errors)
 */
class AuthException extends Exception
{
    public static function invalidCredentials(): static
    {
        return new static('Email hoặc mật khẩu không chính xác.', 401);
    }

    public static function tokenExpired(): static
    {
        return new static('Phiên đăng nhập đã hết hạn.', 401);
    }

    public static function unauthorized(): static
    {
        return new static('Bạn không có quyền truy cập.', 403);
    }
}
