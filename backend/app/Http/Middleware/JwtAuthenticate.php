<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Middleware xác thực JWT token trong header Authorization
 */
class JwtAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        // TODO: Parse header "Authorization: Bearer <token>"
        // Gọi JwtService::verify($token)
        // Nếu invalid => return 401
        return $next($request);
    }
}
