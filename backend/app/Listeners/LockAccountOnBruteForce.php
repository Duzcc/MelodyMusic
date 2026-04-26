<?php

namespace App\Listeners;

use App\Events\LoginFailed;
use App\Exceptions\BruteForceException;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * Listener: Theo dõi đăng nhập sai và khoá tạm thời nếu vượt ngưỡng
 */
class LockAccountOnBruteForce implements ShouldQueue
{
    public function __construct(
        private UserRepositoryInterface $userRepo
    ) {}

    public function handle(LoginFailed $event): void
    {
        // TODO:
        // $limit    = config('security.max_login_attempts');  // VD: 5
        // $lockMins = config('security.lockout_minutes');     // VD: 15
        // $count = $this->userRepo->getFailedAttemptsCount($event->email, $lockMins);
        // if ($count >= $limit) {
        //     Cache::put("lockout_{$event->email}", true, now()->addMinutes($lockMins));
        // }
    }
}
