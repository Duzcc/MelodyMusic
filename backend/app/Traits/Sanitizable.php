<?php

namespace App\Traits;

use App\Services\InputSanitizer;

trait Sanitizable
{
    /**
     * Tái sử dụng hàm làm sạch cho bất kỳ Model/Controller nào
     */
    public function sanitizeData(array $data): array
    {
        $sanitizer = new InputSanitizer();
        return $sanitizer->sanitizeArray($data);
    }
}
