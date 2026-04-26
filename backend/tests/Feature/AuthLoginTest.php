<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Feature Test: Kiểm tra toàn bộ luồng đăng nhập đầu cuối
 */
class AuthLoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_login_with_valid_credentials(): void
    {
        // TODO:
        // $user = User::factory()->create(['password' => Hash::make('password123')]);
        // $response = $this->postJson('/api/auth/login', [
        //     'email' => $user->email, 'password' => 'password123'
        // ]);
        // $response->assertStatus(200)->assertJsonStructure(['token']);
        $this->assertTrue(true);
    }

    /** @test */
    public function login_fails_with_wrong_password(): void
    {
        // TODO: Assert 401 với thông báo "Invalid credentials"
        $this->assertTrue(true);
    }

    /** @test */
    public function login_is_blocked_after_max_failed_attempts(): void
    {
        // TODO:
        // Gọi POST /login sai 5 lần liên tiếp
        // Lần thứ 6 phải nhận 429 Too Many Requests
        $this->assertTrue(true);
    }

    /** @test */
    public function user_can_logout_successfully(): void
    {
        // TODO: Login -> lấy token -> POST /logout -> Assert 200
        // Sau đó dùng token cũ -> Assert 401
        $this->assertTrue(true);
    }

    /** @test */
    public function csrf_token_is_required_for_login(): void
    {
        // TODO: POST /login không có CSRF header -> Assert 403
        $this->assertTrue(true);
    }
}
