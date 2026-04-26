<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Security Configuration (Tập trung hoá toàn bộ cấu hình bảo mật)
    |--------------------------------------------------------------------------
    */

    // === Brute Force Protection ===
    'max_login_attempts' => env('MAX_LOGIN_ATTEMPTS', 5),
    'lockout_minutes'    => env('LOCKOUT_MINUTES', 15),

    // === 2FA (Two Factor Authentication) ===
    '2fa_otp_length' => env('OTP_LENGTH', 6),
    '2fa_otp_ttl'    => env('OTP_TTL_MINUTES', 5), // phút

    // === CSRF ===
    'csrf_token_length' => 64,

    // === Rate Limiting ===
    'api_rate_limit'        => env('API_RATE_LIMIT', 60),  // requests/phút
    'api_rate_limit_window' => 1,                           // phút

    // === HTTP Headers ===
    'secure_headers_enabled' => env('SECURE_HEADERS', true),
];
