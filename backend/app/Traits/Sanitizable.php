<?php

namespace App\Traits;

use App\Services\Security\InputSanitizer;

/**
 * Trait có thể dùng trong bất kỳ class nào cần sanitize input
 * Áp dụng Dependency Injection thông qua resolve()
 */
trait Sanitizable
{
    protected function sanitizeInput(string $input): string
    {
        return app(InputSanitizer::class)->sanitize($input);
    }

    protected function sanitizeArrayInput(array $data): array
    {
        return app(InputSanitizer::class)->sanitizeArray($data);
    }
}
