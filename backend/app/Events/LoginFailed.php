<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Event: Fired khi có lần đăng nhập sai
 * Listeners sẽ: ghi log, tăng bộ đếm, khoá tài khoản nếu vượt ngưỡng
 */
class LoginFailed
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly string $email,
        public readonly string $ipAddress,
        public readonly int    $failedCount,
    ) {}
}
