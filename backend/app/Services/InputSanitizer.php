<?php

namespace App\Services;

class InputSanitizer
{
    public function sanitize(string $input): string
    {
        // TODO: Implement logic to prevent SQL Injection / XSS
        return $input;
    }

    public function sanitizeArray(array $data): array
    {
        // TODO: Loop through array and apply sanitize() to each element
        return $data;
    }
}
