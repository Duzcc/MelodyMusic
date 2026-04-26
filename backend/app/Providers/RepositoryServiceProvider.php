<?php

namespace App\Providers;

use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

/**
 * Đăng ký Dependency Injection bindings cho Repository Pattern
 */
class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind Interface -> Concrete Implementation
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }
}
