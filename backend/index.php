<?php
// =============================================
// ENTRY POINT - Front Controller
// Mọi request đều đi qua file này
// =============================================

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/core/Router.php';

// Autoload tất cả class theo thư mục
spl_autoload_register(function (string $class) {
    $folders = ['core', 'models', 'controllers', 'repositories', 'services', 'middleware', 'traits'];
    foreach ($folders as $folder) {
        $file = __DIR__ . '/' . $folder . '/' . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

// Cấu hình header JSON cho API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

// Khởi động Router
$router = new Router();
require_once __DIR__ . '/routes/api.php';
$router->dispatch();
