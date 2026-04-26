<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ThrottleLoginAttempts
{
    // Số lần đăng nhập sai tối đa trước khi bị khóa
    private const MAX_ATTEMPTS = 5;

    public function handle(Request $request, Closure $next): Response
    {
        // TODO (Người 4): Viết logic đếm số lần sai vào đây
        // Gợi ý:
        // 1. Tạo key theo IP: $key = 'login_attempts_' . $request->ip();
        // 2. Lấy số lần thử: $attempts = cache()->get($key, 0);
        // 3. Nếu $attempts >= self::MAX_ATTEMPTS thì return response('Locked', 429);
        // 4. Sau khi login sai thì: cache()->put($key, $attempts + 1, now()->addMinutes(10));

        return $next($request);
    }
}
