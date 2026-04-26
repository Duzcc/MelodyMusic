<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Event: Fired khi user đăng nhập thành công
 * Listeners sẽ: ghi log, update last_login_at
 */
class UserLoggedIn
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly User   $user,
        public readonly string $ipAddress,
        public readonly string $userAgent,
    ) {}
}
