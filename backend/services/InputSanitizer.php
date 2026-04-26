<?php
// =============================================
// INPUT SANITIZER
// TODO (Người 2): Viết logic xử lý vào đây
// =============================================

class InputSanitizer
{
    public function sanitize(string $input): string
    {
        // TODO (Người 2): Xóa thẻ HTML nguy hiểm, chống XSS
        // Gợi ý: return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
        return $input;
    }

    public function sanitizeArray(array $data): array
    {
        // TODO (Người 2): Áp dụng sanitize() cho từng phần tử trong mảng
        return $data;
    }
}
