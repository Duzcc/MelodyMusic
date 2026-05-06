<?php
// =============================================
// UTILS: CHÍNH SÁCH KHÓA TÀI KHOẢN (BRUTE FORCE)
// Tập trung toàn bộ logic tính toán thời gian khóa vào 1 chỗ.
// =============================================

class LockoutPolicy
{
    // Bảng khóa dần (số lần sai tích lũy => phút khóa)
    private const LOCK_TIERS = [
        5  => 5,    // Sai 5 lần  → khóa 5 phút
        10 => 10,   // Sai 10 lần → khóa 10 phút
        15 => 15,   // Sai 15 lần → khóa 15 phút
        20 => 30,   // Sai 20 lần → khóa 30 phút
    ];
    
    private const PERMANENT_THRESHOLD = 25; // Sai 25+ lần → khóa hẳn

    /**
     * Xác định thời gian khóa dựa trên số lần sai tích lũy.
     * @param int $failCount Số lần đăng nhập sai
     * @return int|null Trả về số phút khóa, -1 nếu khóa vĩnh viễn, hoặc null nếu chưa bị khóa
     */
    public static function getLockDuration(int $failCount): ?int
    {
        if ($failCount >= self::PERMANENT_THRESHOLD) {
            return -1; // -1 đại diện cho khóa vĩnh viễn
        }
        
        $tiers = self::LOCK_TIERS;
        krsort($tiers); // Sắp xếp giảm dần để xét từ mốc cao nhất xuống
        
        foreach ($tiers as $threshold => $minutes) {
            if ($failCount >= $threshold) {
                return $minutes;
            }
        }
        
        return null;
    }
}
