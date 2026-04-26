<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\AuthService;

/**
 * Xử lý đăng nhập, đăng ký, đăng xuất
 */
class AuthController extends Controller
{
    public function __construct(private AuthService $authService) {}

    public function login(LoginRequest $request)
    {
        // TODO: Xử lý đăng nhập, trả về JWT hoặc session
    }

    public function register(RegisterRequest $request)
    {
        // TODO: Đăng ký tài khoản mới
    }

    public function logout()
    {
        // TODO: Huỷ JWT hoặc session
    }

    public function me()
    {
        // TODO: Lấy thông tin user hiện tại từ token
    }
}
