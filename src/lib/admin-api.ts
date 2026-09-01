import { createServerFn } from "@tanstack/react-start";

export const adminLogin = createServerFn({ method: "POST" })
  .validator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    const { getRequestIP } = await import("@tanstack/react-start/server");
    const mod = await import("./admin.server");
    if (!mod.isPasswordConfigured()) {
      return {
        ok: false as const,
        error: "Yönetici şifresi sunucuda tanımlı değil. ADMIN_PASSWORD ortam değişkenini ayarlayın.",
      };
    }
    const ip = getRequestIP() ?? "local";
    const lock = mod.checkLock(ip);
    if (lock.locked) {
      return {
        ok: false as const,
        error: "Çok fazla hatalı deneme. Lütfen 10 dakika sonra tekrar deneyin.",
      };
    }
    if (!mod.verifyPassword(data.password ?? "")) {
      const after = mod.recordFailure(ip);
      return {
        ok: false as const,
        error: after.locked
          ? "Çok fazla hatalı deneme. Lütfen 10 dakika sonra tekrar deneyin."
          : "Şifre hatalı.",
      };
    }
    mod.clearFailures(ip);
    mod.issueSession();
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(
  async () => {
    const mod = await import("./admin.server");
    mod.clearSession();
    return { ok: true as const };
  },
);

export const adminStatus = createServerFn({ method: "GET" }).handler(
  async () => {
    const mod = await import("./admin.server");
    return { ok: mod.hasSession() };
  },
);
