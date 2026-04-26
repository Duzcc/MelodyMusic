# Backend - MelodyMusic API (Pure PHP MVC)

## Cấu trúc thư mục
```
backend/
├── index.php              ← Entry point (Front Controller)
├── config/
│   └── database.php       ← Kết nối Database (PDO)
├── routes/
│   └── api.php            ← Định nghĩa Route — CHỐT CỨNG
├── core/
│   ├── Router.php         ← Bộ định tuyến URL
│   └── BaseController.php ← Controller gốc (json, getBody)
│
├── models/                ← (M) Ánh xạ bảng DB
│   ├── User.php
│   └── LoginAttempt.php
│
├── controllers/           ← (C) Xử lý Request
│   ├── AuthController.php         ← Người 1
│   └── TwoFactorController.php    ← Người 5
│
├── repositories/          ← Tầng truy vấn DB an toàn
│   ├── RepositoryInterface.php    ← Interface (chốt cứng)
│   ├── AbstractRepository.php     ← Abstract class (code sẵn PDO)
│   ├── UserRepository.php         ← Người 3
│   └── SecureRepository.php       ← Người 3 (Decorator Pattern)
│
├── services/              ← Nghiệp vụ bảo mật
│   ├── CsrfTokenManager.php       ← Người 1
│   ├── InputSanitizer.php         ← Người 2
│   ├── JwtService.php             ← Người 4
│   └── TwoFactorService.php       ← Người 5
│
├── middleware/
│   └── ThrottleLoginAttempts.php  ← Người 4
│
├── traits/
│   └── Sanitizable.php            ← Người 2
│
└── database/
    └── schema.sql         ← Chạy trong phpMyAdmin để tạo DB
```

## Chạy trên XAMPP
1. Copy thư mục `backend/` vào `C:/xampp/htdocs/melodymusic-api/`
2. Mở phpMyAdmin, chạy file `database/schema.sql`
3. Truy cập: `http://localhost/melodymusic-api/`

## Phân công nhóm

| Người | Nhiệm vụ | File cần viết |
|-------|---------|---------------|
| 1 | Login + CSRF | `controllers/AuthController.php::login()`, `services/CsrfTokenManager.php` |
| 2 | Sanitizer | `services/InputSanitizer.php`, `traits/Sanitizable.php` |
| 3 | Repository + SQL Injection | `repositories/UserRepository.php`, `repositories/SecureRepository.php` |
| 4 | Brute Force + JWT Session | `middleware/ThrottleLoginAttempts.php`, `services/JwtService.php` |
| 5 | OTP 2FA | `controllers/TwoFactorController.php::verify()`, `services/TwoFactorService.php` |

## Quy tắc KHÔNG ĐƯỢC vi phạm
- ❌ Không được thêm `require_once` mới vào Controller
- ❌ Không được sửa `routes/api.php`
- ❌ Không được sửa `core/`, `config/`, `index.php`
- ✅ Chỉ viết code vào trong ruột các hàm đã có `// TODO`
