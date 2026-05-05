# Backend — MelodyMusic API (Pure PHP MVC)

> **Bảo mật & Xác thực** | OOP: Security Service + Decorator Pattern

## Tổng quan hệ thống

Hệ thống đăng nhập bảo mật nhiều lớp, xây dựng theo kiến trúc **Custom MVC thuần PHP**, không dùng framework ngoài.

### Luồng xác thực hoàn chỉnh

```
[Client] → POST /api/login (email + password + csrf_token)
         ↓
[ThrottleLoginAttempts] → Kiểm tra Progressive Lockout theo IP+Email
         ↓
[AuthController] → Validate CSRF Token
         ↓
[AuthService] → Tìm user, kiểm tra locked_until, verify password (bcrypt)
         ↓
[SecureRepository] → Ghi nhận thất bại / reset đếm | Progressive DB Lockout
         ↓
[TwoFactorService] → Sinh OTP 6 số, lưu session, gửi log
         ↓
POST /api/2fa/verify (email + otp + csrf_token)
         ↓
[JwtService] → Ký JWT (HMAC-SHA256), trả token về client
```

---

## Cấu trúc thư mục

```
backend/
├── index.php                  ← Entry point (Front Controller) + CORS
├── config/
│   └── database.php           ← PDO Singleton (dùng 127.0.0.1 tránh socket macOS)
├── routes/
│   └── api.php                ← Định nghĩa Route
├── core/
│   ├── Router.php             ← Bộ định tuyến URL
│   └── BaseController.php     ← json(), getBody()
│
├── models/
│   ├── User.php
│   └── LoginAttempt.php
│
├── controllers/
│   ├── AuthController.php         ← Người 1: Login + CSRF
│   ├── TwoFactorController.php    ← Người 5: Xác thực OTP
│   └── CsrfController.php         ← GET /api/csrf-token (hỗ trợ FE)
│
├── repositories/
│   ├── RepositoryInterface.php    ← Interface (findById, findByEmail)
│   ├── AbstractRepository.php     ← PDO Singleton + base queries
│   ├── UserRepository.php         ← Người 3: create(), verifyPassword()
│   └── SecureRepository.php       ← Người 3: Decorator Pattern + Progressive Lockout
│
├── services/
│   ├── AuthService.php            ← Người 1: Logic đăng nhập
│   ├── CsrfTokenManager.php       ← Người 1: CSRF generate/validate
│   ├── InputSanitizer.php         ← Người 2: sanitize(), sanitizeArray()
│   ├── JwtService.php             ← Người 4: JWT HS256 tự code
│   └── TwoFactorService.php       ← Người 5: OTP 6 số, expire 5 phút
│
├── middleware/
│   └── ThrottleLoginAttempts.php  ← Người 4: Progressive Lockout IP+Email
│
├── traits/
│   └── Sanitizable.php            ← Người 2: Trait dùng chung
│
└── database/
    └── schema.sql                 ← Tạo DB + 3 user test sẵn
```

---

## Cách chạy để test (Khuyến nghị)

### 1. Chuẩn bị Database

- Mở **XAMPP → Start MySQL**
- Vào `http://localhost/phpmyadmin` → tab **SQL** → Import file `database/schema.sql`
- Nếu đã import trước đó, chạy thêm lệnh thêm cột mới:

```sql
ALTER TABLE users ADD COLUMN locked_until DATETIME NULL DEFAULT NULL AFTER login_fail_count;
```

### 2. Chạy Backend (Terminal 1)

```bash
cd /path/to/melodymusic/backend
php -S localhost:8000 index.php
```

### 3. Chạy Frontend (Terminal 2)

```bash
cd /path/to/melodymusic/frontend
npm run dev
```

### 4. Mở trình duyệt

```
http://localhost:3000/login
```

---

## Tài khoản test sẵn

| Tên | Email | Mật khẩu |
|-----|-------|----------|
| Test User | `test@melody.com` | `password` |
| Nguyễn Nam | `nam@melody.com` | `melody123` |
| Admin User | `admin@melody.com` | `admin2024` |

---

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/csrf-token` | Lấy CSRF Token trước khi POST |
| `POST` | `/api/login` | Đăng nhập (email, password, csrf_token) |
| `POST` | `/api/2fa/verify` | Xác thực OTP (email, otp, csrf_token) |

---

## Cơ chế bảo mật đã triển khai

### Progressive Lockout (2 lớp độc lập)

| Lớp | Theo | File | Cơ chế |
|-----|------|------|--------|
| Lớp 1 | IP + Email | `ThrottleLoginAttempts` | Session PHP |
| Lớp 2 | Email | `SecureRepository` | Cột `locked_until` trong DB |

**Bảng khóa:**

| Số lần sai tích lũy | Thời gian khóa |
|--------------------|----------------|
| 5 lần | 5 phút |
| 10 lần | 10 phút |
| 15 lần | 15 phút |
| 20 lần | 30 phút |
| 25+ lần | Vĩnh viễn |

### Các kỹ thuật bảo mật khác

- **SQL Injection**: 100% PDO Prepared Statements với `:param`
- **CSRF**: Token ngẫu nhiên `bin2hex(random_bytes(32))`, so sánh bằng `hash_equals()`
- **Password**: `password_hash()` bcrypt + `password_verify()`
- **Timing Attack**: Tất cả so sánh token/OTP/password đều dùng `hash_equals()`
- **JWT**: Tự code tay Header.Payload.Signature chuẩn RFC 7519, ký HMAC-SHA256
- **XSS**: `InputSanitizer` dùng `strip_tags()` + `htmlspecialchars()`

---

## Kiến trúc OOP

```
RepositoryInterface          ← Hợp đồng: findById, findByEmail
       ↑
AbstractRepository           ← PDO Singleton + base queries
       ↑
UserRepository               ← create(), verifyPassword()
       ↑
SecureRepository             ← Decorator: validate trước SQL + Progressive Lockout
```

---

## Phân công nhóm

| Người | Nhiệm vụ | File chính |
|-------|---------|------------|
| 1 | Login + CSRF | `AuthController`, `AuthService`, `CsrfTokenManager` |
| 2 | Sanitizer | `InputSanitizer`, `Sanitizable` |
| 3 | Repository + SQL Injection | `UserRepository`, `SecureRepository` |
| 4 | Brute Force + JWT | `ThrottleLoginAttempts`, `JwtService` |
| 5 | OTP 2FA | `TwoFactorController`, `TwoFactorService` |
