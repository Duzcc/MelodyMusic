<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\TwoFactorController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Auth & Security
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {
    // Public routes (không cần token)
    Route::post('/login',    [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    // Protected routes (cần JWT)
    Route::middleware('auth.jwt')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);

        // 2FA
        Route::prefix('2fa')->group(function () {
            Route::post('/send',    [TwoFactorController::class, 'send']);
            Route::post('/verify',  [TwoFactorController::class, 'verify']);
            Route::post('/disable', [TwoFactorController::class, 'disable']);
        });
    });
});
