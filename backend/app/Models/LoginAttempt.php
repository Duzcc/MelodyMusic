<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * [M1] Model — Đại diện cho bảng login_attempts
 * Phục vụ cơ chế chống Brute Force Attack
 *
 * @property int    $id
 * @property string $email
 * @property string $ip_address
 * @property bool   $success
 * @property \Carbon\Carbon $attempted_at
 */
class LoginAttempt extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'email',
        'ip_address',
        'success',
        'attempted_at',
    ];

    protected $casts = [
        'success'      => 'boolean',
        'attempted_at' => 'datetime',
    ];

    /**
     * Quan hệ: Một lần thử thuộc về một User (nếu email tồn tại)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }

    /**
     * Scope: Lọc các lần thất bại trong N phút gần đây
     */
    public function scopeRecentFailed($query, string $email, int $minutes)
    {
        // TODO:
        // return $query->where('email', $email)
        //              ->where('success', false)
        //              ->where('attempted_at', '>=', now()->subMinutes($minutes));
    }
}
