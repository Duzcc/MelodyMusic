<?php

namespace App\Contracts;

/**
 * Contract cho bất kỳ provider 2FA nào (Email, SMS, TOTP App)
 * Giúp dễ dàng swap provider mà không sửa code business logic
 */
interface TwoFactorContract
{
    /**
     * Sinh và gửi OTP đến người dùng
     */
    public function send(int $userId): bool;

    /**
     * Xác minh OTP người dùng nhập
     */
    public function verify(int $userId, string $code): bool;

    /**
     * Tên loại provider (VD: 'email', 'sms', 'totp')
     */
    public function getProviderName(): string;
}
