<?php
// =============================================
// INPUT SANITIZER
// Hoàn thiện: Người 2
// =============================================

class InputSanitizer
{
    public function sanitize(string $input): string
    {
        // Xóa khoảng trắng đầu/cuối
        $input = trim($input);

        // Loại bỏ thẻ HTML
        $input = strip_tags($input);

        // Chống XSS
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

        return $input;
    }

    public function sanitizeArray(array $data): array
    {
        $sanitizedData = [];

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                // xử lý mảng lồng nhau
                $sanitizedData[$key] = $this->sanitizeArray($value);
            } else {
                // ép về string rồi sanitize
                $sanitizedData[$key] = $this->sanitize((string)$value);
            }
        }

        return $sanitizedData;
    }
}