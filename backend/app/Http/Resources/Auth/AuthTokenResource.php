<?php

namespace App\Http\Resources\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * [V] API Resource — Định dạng response chứa JWT token sau đăng nhập/đăng ký
 *
 * Dữ liệu đầu vào ($this->resource) là một mảng:
 * ['token' => '...', 'token_type' => 'Bearer', 'expires_in' => 3600, 'user' => User]
 */
class AuthTokenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'token_type' => 'Bearer',
            'access_token' => $this->resource['token'],
            'expires_in'   => $this->resource['expires_in'] ?? config('jwt.ttl') * 60, // giây
            'user'         => new UserResource($this->resource['user']),
        ];
    }

    /**
     * Wrapper mặc định của Laravel (bỏ key 'data')
     */
    public static $wrap = null;
}
