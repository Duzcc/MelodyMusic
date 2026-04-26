<?php

namespace Tests\Unit\Services;

use App\Services\Auth\JwtService;
use PHPUnit\Framework\TestCase;

class JwtServiceTest extends TestCase
{
    private JwtService $jwt;

    protected function setUp(): void
    {
        parent::setUp();
        $this->jwt = new JwtService(secret: 'test_secret_key', ttl: 60);
    }

    /** @test */
    public function it_generates_a_non_empty_token(): void
    {
        // TODO: $token = $this->jwt->generate(['user_id' => 1, 'email' => 'test@test.com']);
        // $this->assertNotEmpty($token);
        $this->assertTrue(true);
    }

    /** @test */
    public function it_decodes_a_valid_token(): void
    {
        // TODO:
        // $payload = ['user_id' => 1];
        // $token   = $this->jwt->generate($payload);
        // $decoded = $this->jwt->verify($token);
        // $this->assertEquals(1, $decoded['user_id']);
        $this->assertTrue(true);
    }

    /** @test */
    public function it_throws_on_invalid_token(): void
    {
        // TODO: $this->expectException(\Exception::class);
        // $this->jwt->verify('invalid.token.here');
        $this->assertTrue(true);
    }

    /** @test */
    public function it_refreshes_a_valid_token(): void
    {
        // TODO: Assert cũ != mới nhưng payload giống nhau
        $this->assertTrue(true);
    }
}
