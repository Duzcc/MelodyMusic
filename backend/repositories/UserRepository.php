<?php
// =============================================
// USER REPOSITORY
// Kế thừa AbstractRepository
// TODO (Người 3): Override findByEmail() nếu cần logic riêng
// =============================================

class UserRepository extends AbstractRepository
{
    // AbstractRepository đã implement sẵn findById() và findByEmail()
    // Người 3 chỉ thêm các hàm mới TẠI ĐÂY, không sửa gì ở trên

    // TODO (Người 3): Ví dụ thêm hàm lưu user mới
    // public function create(string $name, string $email, string $hashedPassword): bool
    // {
    //     ...
    // }
}
