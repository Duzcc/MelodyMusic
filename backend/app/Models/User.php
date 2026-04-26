<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Model User - Đại diện cho bảng users trong database
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * Các cột được phép mass-assign
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'two_factor_secret',
        'two_factor_enabled',
        'email_verified_at',
    ];

    /**
     * Các cột ẩn khi trả JSON
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'remember_token',
    ];

    /**
     * Ép kiểu dữ liệu
     */
    protected $casts = [
        'email_verified_at'  => 'datetime',
        'two_factor_enabled' => 'boolean',
        'password'           => 'hashed',
    ];
}
