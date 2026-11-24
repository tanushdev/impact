import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

// In-memory rate limiting store (tracks failed attempts per IP)
interface RateLimitRecord {
  failedAttempts: number;
  lockedUntil: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown-ip';
}

function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'utf-8');
    const bufB = Buffer.from(b, 'utf-8');
    if (bufA.length !== bufB.length) {
      // Do a dummy timing comparison to prevent timing leaks
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();

  // Clean expired lockout records
  const record = loginAttempts.get(ip);
  if (record && now > record.lockedUntil) {
    loginAttempts.delete(ip);
  }

  // Check if IP is currently locked out
  if (record && record.failedAttempts >= MAX_ATTEMPTS && now < record.lockedUntil) {
    const minutesRemaining = Math.max(1, Math.ceil((record.lockedUntil - now) / 60000));
    return NextResponse.json(
      {
        success: false,
        message: `Too many failed login attempts. Access is locked for security. Please try again in ${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}.`,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((record.lockedUntil - now) / 1000)) },
      }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
  }

  const { password } = body;
  const adminPassword = process.env.CMS_ADMIN_PASSWORD || 'impact2026admin';

  // Constant-time password comparison
  const isValid = typeof password === 'string' && safeCompare(password, adminPassword);

  if (!isValid) {
    // Record failed attempt
    const current = loginAttempts.get(ip) || { failedAttempts: 0, lockedUntil: 0 };
    current.failedAttempts += 1;
    current.lockedUntil = now + LOCKOUT_DURATION_MS;
    loginAttempts.set(ip, current);

    const attemptsLeft = Math.max(0, MAX_ATTEMPTS - current.failedAttempts);

    return NextResponse.json(
      {
        success: false,
        message:
          attemptsLeft > 0
            ? `Invalid password. ${attemptsLeft} attempt${attemptsLeft > 1 ? 's' : ''} remaining before temporary security lockout.`
            : 'Account locked due to multiple failed attempts. Please wait 15 minutes before trying again.',
      },
      { status: 401 }
    );
  }

  // Successful login: reset failed attempts for this IP
  loginAttempts.delete(ip);

  // Generate cryptographically signed HMAC token
  const token = await createSessionToken();

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return response;
}
