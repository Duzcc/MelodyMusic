<?php
// =============================================
// REPOSITORY INTERFACE — Decorator Pattern
// Định nghĩa bộ hàm cứng. Mọi Repository phải tuân theo.
// CHỈ NHÓM TRƯỞNG SỬA FILE NÀY
// =============================================

interface RepositoryInterface
{
    public function findById(int $id): mixed;
    public function findByEmail(string $email): mixed;
}
