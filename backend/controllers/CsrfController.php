<?php
// =============================================
// CSRF CONTROLLER
// Dùng để Frontend lấy CSRF Token trước khi POST
// =============================================

require_once __DIR__ . '/../core/BaseController.php';
require_once __DIR__ . '/../services/CsrfTokenManager.php';

class CsrfController extends BaseController
{
    public function getToken(): void
    {
        $csrfManager = new CsrfTokenManager();
        $token = $csrfManager->generateToken();

        $this->json([
            'success' => true,
            'csrf_token' => $token
        ]);
    }
}
