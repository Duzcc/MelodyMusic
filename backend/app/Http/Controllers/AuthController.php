<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// KHÔNG AI ĐƯỢC XÓA HAY THÊM USE Ở ĐÂY
use App\Services\CsrfTokenManager;
use App\Services\InputSanitizer;
use App\Services\JwtService;
use App\Repositories\RepositoryInterface;
use App\Traits\Sanitizable;

class AuthController extends Controller
{
    use Sanitizable;

    public function login(Request $request, RepositoryInterface $repository, CsrfTokenManager $csrf, JwtService $jwt)
    {
        // TODO: Người 1 (Login & CSRF) viết code vào đây
        // Gợi ý: Lấy request, gọi $this->sanitizeData(), kiểm tra password bằng $repository->findByEmail()
    }
}
