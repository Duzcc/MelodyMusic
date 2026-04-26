<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Mail\WelcomeMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

/**
 * Listener: Gửi email chào mừng khi user đăng ký thành công
 */
class SendWelcomeEmail implements ShouldQueue
{
    public function handle(UserRegistered $event): void
    {
        // TODO: Mail::to($event->user->email)->send(new WelcomeMail($event->user));
    }
}
