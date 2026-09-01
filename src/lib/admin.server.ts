import { createHmac, timingSafeEqual } from "node:crypto";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";

const COOKIE = "altundas_admin";
const TTL_SEC = 60 * 60 * 12;
const MAX_TRIES = 5;
const LOCK_MS = 10 * 60 * 1000;

const attempts = new Map<string, { n: number; until: number }>();

function adminPassword() {
  return (process.env.ADMIN_PASSWORD ?? "").trim();
}

export function isPasswordConfigured() {
  return adminPassword().length > 0;
}

function hmac(value: string) {
  const secret = `${adminPassword() || "unconfigured"}|altundas-admin-hmac-v1`;
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function checkLock(ip: string) {
  const row = attempts.get(ip);
  if (!row) return { locked: false, remaining: MAX_TRIES };
  if (row.until && Date.now() < row.until) {
    return { locked: true, remaining: 0, until: row.until };
  }
  if (row.until && Date.now() >= row.until) {
    attempts.delete(ip);
    return { locked: false, remaining: MAX_TRIES };
  }
  return { locked: false, remaining: Math.max(0, MAX_TRIES - row.n) };
}

export function recordFailure(ip: string) {
  const row = attempts.get(ip) ?? { n: 0, until: 0 };
  row.n += 1;
  if (row.n >= MAX_TRIES) row.until = Date.now() + LOCK_MS;
  attempts.set(ip, row);
  return checkLock(ip);
}

export function clearFailures(ip: string) {
  attempts.delete(ip);
}

export function verifyPassword(password: string) {
  const expected = adminPassword();
  if (!expected || !password) return false;
  return safeEqual(hmac(password), hmac(expected));
}

export function issueSession() {
  const exp = Math.floor(Date.now() / 1000) + TTL_SEC;
  const payload = `ok.${exp}`;
  const token = `${payload}.${hmac(payload)}`;
  setCookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: TTL_SEC,
  });
}

export function clearSession() {
  deleteCookie(COOKIE);
}

export function hasSession() {
  if (!isPasswordConfigured()) return false;
  const token = getCookie(COOKIE);
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [flag, expStr, sig] = parts;
  if (flag !== "ok") return false;
  const payload = `${flag}.${expStr}`;
  if (!safeEqual(hmac(payload), sig ?? "")) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return false;
  return true;
}
