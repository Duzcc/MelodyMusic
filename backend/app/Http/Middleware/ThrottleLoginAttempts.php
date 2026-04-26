<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Middleware bảo vệ chống Brute Force login
 * Giới hạn số lần đăng nhập sai trong khoảng thời gian nhất định
 */
class ThrottleLoginAttempts
{
    // TODO: Inject LoginAttemptRepository hoặc Cache service

    public function handle(Request $request, Closure $next)
    {
        // TODO: Đếm số lần thử đăng nhập từ IP
        // Nếu vượt ngưỡng => throw BruteForceException / trả về 429
        return $next($request);
    }
}
