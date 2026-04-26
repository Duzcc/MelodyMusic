<?php

namespace App\Http\Resources\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * [V] API Resource — Định dạng dữ liệu User trả về JSON
 * Ẩn hoàn toàn các trường nhạy cảm (password, 2fa_secret...)
 */
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'name'               => $this->name,
            'email'              => $this->email,
            'email_verified'     => !is_null($this->email_verified_at),
            'two_factor_enabled' => (bool) $this->two_factor_enabled,
            'created_at'         => $this->created_at?->toIso8601String(),
        ];
        // Các trường bị ẩn: password, two_factor_secret, remember_token
    }
}
