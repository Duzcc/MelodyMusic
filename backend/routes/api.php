<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TwoFactorController;

// =============================================
// ĐÃ CHỐT CỨNG — THÀNH VIÊN KHÔNG ĐƯỢC SỬA
// =============================================

// Người 1 điền code vào AuthController::login()
// Người 4 điền code vào ThrottleLoginAttempts::handle()
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle.login');

// Người 5 điền code vào TwoFactorController::verify()
Route::post('/2fa/verify', [TwoFactorController::class, 'verify']);

