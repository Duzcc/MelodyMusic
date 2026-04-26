<?php

namespace App\Traits;

use App\Services\InputSanitizer;

trait Sanitizable
{
    public function sanitizeData(array $data): array
    {
        return (new InputSanitizer())->sanitizeArray($data);
    }
}
