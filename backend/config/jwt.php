<?php

return [
    /*
    |--------------------------------------------------------------------------
    | JWT Configuration
    |--------------------------------------------------------------------------
    */

    // Secret key ký JWT - nên lưu trong .env
    'secret' => env('JWT_SECRET', ''),

    // Thuật toán ký
    'algorithm' => env('JWT_ALGORITHM', 'HS256'),

    // Thời gian sống của access token (phút)
    'ttl' => env('JWT_TTL', 60),

    // Thời gian sống của refresh token (phút)
    'refresh_ttl' => env('JWT_REFRESH_TTL', 60 * 24 * 7), // 7 ngày

    // Header chứa token
    'header' => 'Authorization',

    // Prefix trong header
    'prefix' => 'Bearer',
];
