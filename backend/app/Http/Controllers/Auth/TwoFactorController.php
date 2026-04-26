<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\TwoFactorService;

/**
 * Xử lý xác thực 2 yếu tố (2FA) qua email / OTP
 */
class TwoFactorController extends Controller
{
    public function __construct(private TwoFactorService $tfService) {}

    public function send()
    {
        // TODO: Gửi OTP qua email hoặc SMS
    }

    public function verify()
    {
        // TODO: Xác minh OTP người dùng nhập vào
    }

    public function disable()
    {
        // TODO: Tắt 2FA cho tài khoản
    }
}
