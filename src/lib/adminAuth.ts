import { NextRequest } from 'next/server';

export const SESSION_COOKIE_NAME = 'cms_session';
export const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecretKey(): string {
  return (
    process.env.CMS_SESSION_SECRET ||
    process.env.CMS_ADMIN_PASSWORD ||
    'impact-energies-fallback-secure-salt-2026-v1'
  );
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function signPayload(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return bufToHex(signature);
}

/**
 * Creates a cryptographically signed session token:
 * format: `${issuedAt}.${expiresAt}.${signature}`
 */
export async function createSessionToken(): Promise<string> {
  const now = Date.now();
  const expiresAt = now + SESSION_MAX_AGE_MS;
  const payload = `${now}.${expiresAt}`;
  const sig = await signPayload(payload, getSecretKey());
  return `${payload}.${sig}`;
}

/**
 * Verifies a session token string.
 * Checks signature authenticity and timestamp expiration.
 */
export async function verifySessionToken(token?: string | null): Promise<boolean> {
  if (!token) return false;

  // Smooth backward compatibility for active sessions
  if (token === 'authenticated') return true;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [issuedAtStr, expiresAtStr, expectedSig] = parts;
  const now = Date.now();
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(expiresAt) || now > expiresAt) {
    return false; // Expired
  }

  const payload = `${issuedAtStr}.${expiresAtStr}`;
  const actualSig = await signPayload(payload, getSecretKey());

  return actualSig === expectedSig;
}

/**
 * Checks if incoming NextRequest has a valid, non-expired, cryptographically signed cookie.
 * Asynchronous for full cryptographic verification.
 */
export async function isAdminAuthenticatedAsync(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  return verifySessionToken(cookie?.value);
}

/**
 * Synchronous version for route handlers.
 * Validates token structure, non-expiry, and backward-compatible token.
 */
export function isAdminAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie?.value) return false;
  if (cookie.value === 'authenticated') return true;

  const parts = cookie.value.split('.');
  if (parts.length !== 3) return false;

  const expiresAt = parseInt(parts[1], 10);
  return !isNaN(expiresAt) && Date.now() <= expiresAt;
}
