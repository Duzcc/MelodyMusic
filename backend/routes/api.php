<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TwoFactorController;

// Đã định nghĩa sẵn các Route. Cấm các thành viên tự ý tạo thêm route gây conflict.

// Người 1 (Login) + Người 4 (Middleware chống Brute Force)
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1'); // 5 lần sai khóa 1 phút

// Người 5 (OTP 2FA)
Route::post('/2fa/verify', [TwoFactorController::class, 'verify']);
