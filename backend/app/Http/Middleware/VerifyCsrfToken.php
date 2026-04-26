<?php

namespace App\Http\Middleware;

use App\Services\Security\CsrfTokenManager;
use Closure;
use Illuminate\Http\Request;

/**
 * Middleware xác minh CSRF token trước mỗi request thay đổi dữ liệu
 */
class VerifyCsrfToken
{
    public function __construct(private CsrfTokenManager $csrfManager) {}

    public function handle(Request $request, Closure $next)
    {
        // TODO: Kiểm tra CSRF token trong header X-CSRF-Token
        // Gọi $this->csrfManager->validateToken(...)
        return $next($request);
    }
}
