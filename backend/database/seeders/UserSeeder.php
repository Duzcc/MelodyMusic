<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Seed dữ liệu test: tạo sẵn tài khoản admin và user thường
 */
class UserSeeder extends Seeder
{
    public function run(): void
    {
        // TODO:
        // User::create([
        //     'name'     => 'Admin',
        //     'email'    => 'admin@melodies.local',
        //     'password' => Hash::make('Admin@1234'),
        //     'two_factor_enabled' => true,
        // ]);

        // User::factory()->count(10)->create(); // 10 user random
    }
}
