<?php

namespace App\Listeners;

use App\Events\UserLoggedIn;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * Listener: Ghi lịch sử đăng nhập thành công
 * Chạy async qua Queue (implements ShouldQueue)
 */
class RecordLoginHistory implements ShouldQueue
{
    public function __construct(
        private UserRepositoryInterface $userRepo
    ) {}

    public function handle(UserLoggedIn $event): void
    {
        // TODO:
        // $this->userRepo->recordLoginAttempt($event->user->email, $event->ipAddress, true);
        // Cập nhật last_login_at của user
    }
}
