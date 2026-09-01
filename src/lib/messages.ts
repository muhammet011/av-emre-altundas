import { useSyncExternalStore } from "react";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "altundas.messages.v1";
const EMPTY: ContactMessage[] = [];
const listeners = new Set<() => void>();
let cache: ContactMessage[] = EMPTY;
let hydrated = false;

function emit() {
  listeners.forEach((l) => l());
}

function load(): ContactMessage[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ContactMessage[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): ContactMessage[] {
  if (!hydrated) {
    cache = load();
    hydrated = true;
  }
  return cache;
}

function getServerSnapshot(): ContactMessage[] {
  return EMPTY;
}

export function subscribeMessages(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useMessages() {
  return useSyncExternalStore(subscribeMessages, getSnapshot, getServerSnapshot);
}

export function addMessage(
  input: Omit<ContactMessage, "id" | "createdAt">,
): ContactMessage {
  const msg: ContactMessage = {
    ...input,
    id: `m-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  cache = [msg, ...getSnapshot()];
  hydrated = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  emit();
  return msg;
}

export function deleteMessage(id: string) {
  cache = getSnapshot().filter((m) => m.id !== id);
  hydrated = true;
  if (cache.length === 0) {
    cache = EMPTY;
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  }
  emit();
}
