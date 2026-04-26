<?php

namespace App\Services\Security;

use Illuminate\Support\Facades\Cache;

/**
 * Service blacklist JWT token đã logout
 * Lưu vào Redis với TTL bằng thời gian còn lại của token
 * Ngăn token bị đánh cắp sau khi logout
 */
class TokenBlacklist
{
    /**
     * Thêm token vào blacklist
     * 
     * @param string $token     JWT token cần block
     * @param int    $ttl       Giây còn lại của token
     */
    public function add(string $token, int $ttl): void
    {
        // TODO: Cache::put($this->cacheKey($token), true, $ttl);
    }

    /**
     * Kiểm tra token có bị blacklist không
     */
    public function isBlacklisted(string $token): bool
    {
        // TODO: return Cache::has($this->cacheKey($token));
    }

    private function cacheKey(string $token): string
    {
        return 'blacklist:' . sha1($token);
    }
}
