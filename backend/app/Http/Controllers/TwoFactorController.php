<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// KHÔNG AI ĐƯỢC XÓA HAY THÊM USE Ở ĐÂY
use App\Services\TwoFactorService;
use App\Services\InputSanitizer;
use App\Traits\Sanitizable;

class TwoFactorController extends Controller
{
    use Sanitizable;

    public function verify(Request $request, TwoFactorService $twoFactor)
    {
        // TODO: Người 5 (OTP) viết code vào đây
        // Gợi ý: Lấy OTP người dùng nhập và gọi $twoFactor->verifyOtp()
    }
}
