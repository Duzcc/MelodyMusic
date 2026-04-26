<?php

namespace App\Exceptions;

use Exception;

/**
 * Exception cho cơ chế chống Brute Force
 * Ném ra khi vượt số lần đăng nhập sai cho phép
 */
class BruteForceException extends Exception
{
    public static function tooManyAttempts(int $lockMinutes): static
    {
        return new static(
            "Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau {$lockMinutes} phút.",
            429
        );
    }
}
