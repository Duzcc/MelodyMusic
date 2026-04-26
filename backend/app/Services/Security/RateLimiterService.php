<?php

namespace App\Services\Security;

use Illuminate\Support\Facades\Cache;

/**
 * Service quản lý Rate Limiting theo IP + email
 * Dùng Redis Cache để đếm và reset bộ đếm
 */
class RateLimiterService
{
    public function __construct(
        private int $maxAttempts,
        private int $decayMinutes,
    ) {}

    /**
     * Kiểm tra xem key có bị giới hạn không
     */
    public function tooManyAttempts(string $key): bool
    {
        // TODO: return Cache::get($this->cacheKey($key), 0) >= $this->maxAttempts;
    }

    /**
     * Tăng bộ đếm thất bại
     */
    public function hit(string $key): int
    {
        // TODO: Increment counter trong Cache với TTL = decayMinutes
    }

    /**
     * Reset bộ đếm (sau khi đăng nhập thành công)
     */
    public function clear(string $key): void
    {
        // TODO: Cache::forget($this->cacheKey($key));
    }

    /**
     * Thời gian còn lại tính bằng giây trước khi unlock
     */
    public function availableInSeconds(string $key): int
    {
        // TODO: return Cache::getTimeToLive($this->cacheKey($key));
    }

    private function cacheKey(string $key): string
    {
        return 'rate_limiter:' . sha1($key);
    }
}
