<?php
// =============================================
// SANITIZABLE TRAIT — Tái sử dụng bộ lọc
// Dùng chung: use Sanitizable; trong bất kỳ class nào
// =============================================

require_once __DIR__ . '/../services/InputSanitizer.php';

trait Sanitizable
{
    public function sanitizeData(array $data): array
    {
        return (new InputSanitizer())->sanitizeArray($data);
    }
}
