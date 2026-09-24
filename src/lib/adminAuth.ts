import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "cafezim_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8h

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "cafezim-dev-secret";
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function safeStringEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

/** Opaque `expiry.signature` token stored in an httpOnly cookie. */
export function createAdminSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  if (!safeStringEqual(signature, expected)) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}
