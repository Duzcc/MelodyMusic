<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Middleware thêm HTTP Security Headers vào mọi response
 * Chống Clickjacking, MIME Sniffing, và các tấn công phổ biến khác
 */
class SecureHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // TODO: Thêm các headers bảo mật:
        // $response->headers->set('X-Frame-Options', 'DENY');
        // $response->headers->set('X-Content-Type-Options', 'nosniff');
        // $response->headers->set('X-XSS-Protection', '1; mode=block');
        // $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        // $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        // $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=()');

        return $response;
    }
}
