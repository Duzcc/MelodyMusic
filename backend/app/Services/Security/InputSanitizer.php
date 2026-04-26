<?php

namespace App\Services\Security;

/**
 * Yêu cầu OOP: InputSanitizer
 * Làm sạch input đầu vào để chống SQL Injection và XSS
 */
class InputSanitizer
{
    /**
     * Sanitize một chuỗi đơn lẻ
     */
    public function sanitize(string $input): string
    {
        // TODO: Implement (strip_tags, htmlspecialchars, trim...)
    }

    /**
     * Sanitize toàn bộ mảng input (áp dụng recursively)
     */
    public function sanitizeArray(array $data): array
    {
        // TODO: Implement (array_map + $this->sanitize)
    }
}
