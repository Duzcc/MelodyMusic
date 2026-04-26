<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Mailable: Email gửi OTP xác thực 2 bước
 */
class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly string $otp,
        public readonly User   $user,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[Melodies] Mã xác thực của bạn',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.otp', // resources/views/emails/otp.blade.php
        );
    }
}
