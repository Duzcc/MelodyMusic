<?php

namespace App\Services;

class JwtService
{
    public function generateToken(array $payload): string
    {
        // TODO: Sinh token chuẩn header.payload.signature
        return '';
    }

    public function verifyToken(string $token): array|bool
    {
        // TODO: Xác minh chữ ký và thời hạn token
        return false;
    }
}
