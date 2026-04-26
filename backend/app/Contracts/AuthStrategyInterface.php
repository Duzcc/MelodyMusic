<?php

namespace App\Contracts;

/**
 * Contract cho Strategy Pattern xác thực
 * Mỗi phương thức đăng nhập implement interface này
 */
interface AuthStrategyInterface
{
    /**
     * Xác minh danh tính người dùng theo strategy cụ thể
     * 
     * @param  array $credentials  Thông tin cần thiết cho strategy
     * @return mixed               User object nếu xác minh thành công
     */
    public function authenticate(array $credentials): mixed;

    /**
     * Kiểm tra xem strategy có hỗ trợ loại credentials này không
     */
    public function supports(array $credentials): bool;
}
