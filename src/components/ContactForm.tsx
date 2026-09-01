import { useState, type FormEvent } from "react";
import { addMessage } from "@/lib/messages";
import { KvkkDialog } from "./KvkkDialog";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [busy, setBusy] = useState(false);
  const [kvkk, setKvkk] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus("err");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      addMessage({ name, email, phone, message });
      form.reset();
      setStatus("ok");
      setBusy(false);
    }, 450);
  }

  return (
    <>
      <form
        id="contactForm"
        onSubmit={onSubmit}
        className="border-t-4 border-navy bg-paper p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:p-12"
      >
        <h3 className="font-display mb-8 text-[2rem] text-navy">Mesaj Gönderin</h3>
        <label className="mb-5 block">
          <span className="sr-only">Adınız Soyadınız</span>
          <input
            name="name"
            required
            placeholder="Adınız Soyadınız"
            className="h-12 w-full border border-line bg-mist px-4 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold focus:bg-paper"
          />
        </label>
        <label className="mb-5 block">
          <span className="sr-only">E-Posta Adresiniz</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-Posta Adresiniz"
            className="h-12 w-full border border-line bg-mist px-4 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold focus:bg-paper"
          />
        </label>
        <label className="mb-5 block">
          <span className="sr-only">Telefon Numaranız</span>
          <input
            type="tel"
            name="phone"
            placeholder="Telefon Numaranız"
            className="h-12 w-full border border-line bg-mist px-4 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold focus:bg-paper"
          />
        </label>
        <label className="mb-5 block">
          <span className="sr-only">Mesajınız</span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Danışmak istediğiniz hukuki konuyu kısaca özetleyiniz..."
            className="w-full border border-line bg-mist px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-gold focus:bg-paper"
          />
        </label>
        <label className="mb-6 flex cursor-pointer items-start gap-2.5 text-[0.85rem] text-ink/80">
          <input
            type="checkbox"
            name="kvkk_onay"
            required
            className="mt-1 size-4 shrink-0 accent-gold"
          />
          <span>
            <button
              type="button"
              id="kvkkLinkAc"
              onClick={() => setKvkk(true)}
              className="text-gold underline"
            >
              Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
            </button>
            ’ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
          </span>
        </label>
        <button
          type="submit"
          id="formSubmitBtn"
          disabled={busy}
          className="h-12 w-full bg-gold text-[0.85rem] font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-paper hover:text-gold hover:outline hover:outline-1 hover:outline-gold disabled:opacity-70"
        >
          {busy ? "Gönderiliyor..." : "Gönder"}
        </button>
        {status === "ok" ? (
          <p className="mt-4 text-sm text-success">
            Mesajınız alındı. En kısa sürede size dönüş yapılacaktır.
          </p>
        ) : null}
        {status === "err" ? (
          <p className="mt-4 text-sm text-danger">
            Lütfen zorunlu alanları doldurunuz.
          </p>
        ) : null}
      </form>
      <KvkkDialog open={kvkk} onClose={() => setKvkk(false)} />
    </>
  );
}
