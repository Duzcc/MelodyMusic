<?php

namespace App\Http\Middleware;

use App\Services\Security\InputSanitizer;
use Closure;
use Illuminate\Http\Request;

/**
 * Middleware sanitize tất cả input đầu vào trước khi vào controller
 */
class SanitizeInput
{
    public function __construct(private InputSanitizer $sanitizer) {}

    public function handle(Request $request, Closure $next)
    {
        // TODO: Gọi $this->sanitizer->sanitizeArray($request->all())
        // Merge lại vào request
        return $next($request);
    }
}
