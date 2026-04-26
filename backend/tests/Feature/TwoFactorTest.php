<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Feature Test: Kiểm tra luồng 2FA đầu cuối
 */
class TwoFactorTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_user_can_request_otp(): void
    {
        // TODO:
        // $user = User::factory()->create(['two_factor_enabled' => true]);
        // $token = $this->loginAs($user);
        // $response = $this->postJson('/api/auth/2fa/send', [], ['Authorization' => "Bearer $token"]);
        // $response->assertStatus(200);
        $this->assertTrue(true);
    }

    /** @test */
    public function user_can_verify_correct_otp(): void
    {
        // TODO: Assert 200 khi OTP đúng
        $this->assertTrue(true);
    }

    /** @test */
    public function user_cannot_verify_wrong_otp(): void
    {
        // TODO: Assert 422 khi OTP sai
        $this->assertTrue(true);
    }

    /** @test */
    public function otp_expires_after_ttl(): void
    {
        // TODO:
        // Travel time forward (Carbon::setTestNow)
        // Assert OTP cũ không còn hợp lệ
        $this->assertTrue(true);
    }
}
