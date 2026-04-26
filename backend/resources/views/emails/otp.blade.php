<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Mã xác thực OTP</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 40px;">
  <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

    <h2 style="color: #c90076;">🎵 Melodies</h2>
    <p>Xin chào <strong>{{ $user->name }}</strong>,</p>

    <p>Mã xác thực OTP của bạn là:</p>

    <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #c90076; text-align: center; padding: 16px; background: #fff0f8; border-radius: 8px; margin: 24px 0;">
      {{ $otp }}
    </div>

    <p>Mã này có hiệu lực trong <strong>{{ config('security.2fa_otp_ttl', 5) }} phút</strong>.</p>
    <p style="color: #999; font-size: 13px;">Nếu bạn không yêu cầu mã này, hãy bỏ qua email này.</p>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
    <p style="color: #ccc; font-size: 12px; text-align: center;">© {{ date('Y') }} Melodies Music App</p>
  </div>
</body>
</html>
