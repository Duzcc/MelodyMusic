<?php
// =============================================
// BASE CONTROLLER
// Tất cả controller đều kế thừa class này
// CHỈ NHÓM TRƯỞNG SỬA FILE NÀY
// =============================================

abstract class BaseController
{
    protected function json(mixed $data, int $status = 200): void
    {
        http_response_code($status);
        echo json_encode($data);
    }

    protected function getBody(): array
    {
        $raw = file_get_contents('php://input');
        return json_decode($raw, true) ?? [];
    }
}
