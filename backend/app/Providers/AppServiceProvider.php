<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // CHỈ NHÓM TRƯỞNG ĐƯỢC SỬA FILE NÀY
        // Ràng buộc Interface vào Decorator Pattern (Chống SQL Injection)
        $this->app->bind(\App\Repositories\RepositoryInterface::class, function ($app) {
            // Lấy đối tượng PDO thuần túy truyền vào SecureRepository
            $pdo = $app->make('db.connection')->getPdo();
            return new \App\Repositories\SecureRepository($pdo);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
