<?php
// =============================================
// ĐỊNH NGHĨA ROUTE — CHỐT CỨNG
// THÀNH VIÊN KHÔNG ĐƯỢC SỬA FILE NÀY
// =============================================

// --- Route hỗ trợ Frontend lấy CSRF Token
$router->get('/api/csrf-token', 'CsrfController', 'getToken');

// --- Người 1 điền code vào AuthController::login()
// --- Người 4 sẽ áp dụng ThrottleLoginAttempts trong AuthController::login()
$router->post('/api/login', 'AuthController', 'login');

// --- Người 5 điền code vào TwoFactorController::verify()
$router->post('/api/2fa/verify', 'TwoFactorController', 'verify');
