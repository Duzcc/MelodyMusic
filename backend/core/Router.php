<?php
// =============================================
// ROUTER ĐƠN GIẢN
// Ánh xạ URL → Controller → Method
// CHỈ NHÓM TRƯỞNG SỬA FILE NÀY
// =============================================

class Router
{
    private array $routes = [];

    public function post(string $path, string $controller, string $method): void
    {
        $this->routes['POST'][$path] = [$controller, $method];
    }

    public function get(string $path, string $controller, string $method): void
    {
        $this->routes['GET'][$path] = [$controller, $method];
    }

    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        if (!isset($this->routes[$method][$uri])) {
            http_response_code(404);
            echo json_encode(['message' => 'Route not found']);
            return;
        }

        [$controllerName, $action] = $this->routes[$method][$uri];
        $controller = new $controllerName();
        $controller->$action();
    }
}
