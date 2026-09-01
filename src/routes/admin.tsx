import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bold,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
} from "lucide-react";
import { adminLogin, adminLogout, adminStatus } from "@/lib/admin-api";
import {
  deleteArticle,
  resetArticles,
  upsertArticle,
  useArticles,
  type Article,
} from "@/lib/articles";
import { deleteMessage, useMessages } from "@/lib/messages";
import { ArticleBody } from "@/components/ArticleBody";
import { ARTICLE_CATEGORIES } from "@/lib/site";
import { formatTrDate, slugifyBase } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Paneli | Av. Emre Altundaş" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type FormState = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  published: boolean;
  slugTouched: boolean;
};

const emptyForm: FormState = {
  id: "",
  title: "",
  slug: "",
  summary: "",
  content: "",
  category: "Genel",
  imageUrl: "",
  published: true,
  slugTouched: false,
};

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [busy, setBusy] = useState(false);
  const articles = useArticles();
  const messages = useMessages();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState<"overview" | "editor" | "list" | "messages">(
    "overview",
  );
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState("Tümü");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    void adminStatus()
      .then((r) => setAuthed(Boolean(r.ok)))
      .finally(() => setReady(true));
  }, []);

  const sorted = useMemo(
    () =>
      articles
        .slice()
        .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)),
    [articles],
  );
  const published = articles.filter((a) => a.published).length;
  const drafts = articles.length - published;
  const words = form.content.trim() ? form.content.trim().split(/\s+/).length : 0;
  const reading = Math.max(1, Math.round(words / 200));
  const slugTaken = articles.some(
    (a) => a.slug === form.slug && a.id !== form.id && form.slug.length > 0,
  );
  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const a of articles) {
      map.set(a.category, (map.get(a.category) ?? 0) + 1);
    }
    return [...map.entries()].sort((x, y) => y[1] - x[1]);
  }, [articles]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((a) => {
      const matchQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.slug.includes(q) ||
        a.category.toLowerCase().includes(q);
      const matchC = filterCat === "Tümü" || a.category === filterCat;
      return matchQ && matchC;
    });
  }, [sorted, query, filterCat]);

  async function login(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setLoginError("");
    try {
      const res = await adminLogin({ data: { password } });
      if (res.ok) {
        setAuthed(true);
        setPassword("");
      } else {
        setLoginError(res.error);
      }
    } catch {
      setLoginError("Giriş yapılamadı.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await adminLogout();
    setAuthed(false);
    setPassword("");
  }

  function edit(a: Article) {
    setForm({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary,
      content: a.content,
      category: a.category,
      imageUrl: a.imageUrl ?? "",
      published: a.published,
      slugTouched: true,
    });
    setStatus("");
    setTab("editor");
  }

  function applyContent(next: string, cursor?: { start: number; end: number }) {
    setForm((f) => ({ ...f, content: next }));
    const el = contentRef.current;
    if (!el || !cursor) return;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor.start, cursor.end);
    });
  }

  function insertAtCursor(snippet: string) {
    const el = contentRef.current;
    if (!el) {
      setForm((f) => ({ ...f, content: `${f.content}\n\n${snippet}` }));
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = form.content.slice(0, start) + snippet + form.content.slice(end);
    applyContent(next, { start: start + snippet.length, end: start + snippet.length });
  }

  function wrapSelection(before: string, after: string, placeholder: string) {
    const el = contentRef.current;
    if (!el) {
      insertAtCursor(`${before}${placeholder}${after}`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = form.content.slice(start, end) || placeholder;
    const snippet = `${before}${selected}${after}`;
    const next = form.content.slice(0, start) + snippet + form.content.slice(end);
    const innerStart = start + before.length;
    applyContent(next, {
      start: innerStart,
      end: innerStart + selected.length,
    });
  }

  function prefixLines(prefix: string) {
    const el = contentRef.current;
    if (!el) {
      insertAtCursor(`${prefix}madde\n`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = form.content.slice(start, end);
    if (!selected) {
      insertAtCursor(`${prefix}`);
      return;
    }
    const nextSelected = selected
      .split("\n")
      .map((line) =>
        line.trim()
          ? `${prefix}${line.replace(/^\s*[-*]\s+|^\s*\d+\.\s+/, "")}`
          : line,
      )
      .join("\n");
    const next = form.content.slice(0, start) + nextSelected + form.content.slice(end);
    applyContent(next, { start, end: start + nextSelected.length });
  }

  function insertLink() {
    const url = window.prompt("Bağlantı adresi", "https://");
    if (!url) return;
    wrapSelection("[", `](${url})`, "bağlantı metni");
  }

  function onEditorKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (!(e.metaKey || e.ctrlKey)) return;
    const key = e.key.toLowerCase();
    if (key === "b") {
      e.preventDefault();
      wrapSelection("**", "**", "kalın");
    } else if (key === "i") {
      e.preventDefault();
      wrapSelection("*", "*", "italik");
    } else if (key === "k") {
      e.preventDefault();
      insertLink();
    }
  }

  async function onFile(file: File | null) {
    if (!file) return;
    if (file.size > 1_600_000) {
      setStatus("Görsel 1.5 MB altında olmalıdır.");
      return;
    }
    const data = await fileToDataUrl(file);
    setForm((f) => ({ ...f, imageUrl: data }));
  }

  function save(e: FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setStatus("Başlık ve içerik zorunludur.");
      return;
    }
    upsertArticle({
      id: form.id || undefined,
      title: form.title.trim(),
      slug: form.slug.trim() || slugifyBase(form.title),
      summary: form.summary.trim(),
      content: form.content.trim(),
      category: form.category,
      imageUrl: form.imageUrl.trim() || null,
      published: form.published,
    });
    setStatus("Makale kaydedildi.");
    setForm(emptyForm);
    setTab("list");
  }

  function togglePublished(a: Article) {
    upsertArticle({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary,
      content: a.content,
      category: a.category,
      imageUrl: a.imageUrl,
      published: !a.published,
    });
  }

  if (!ready) return <div className="min-h-dvh bg-navy" />;

  if (!authed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-navy px-5">
        <form onSubmit={login} className="w-full max-w-[380px] bg-paper px-9 py-12 text-center">
          <h1 className="font-display text-[1.8rem] text-navy">Admin Paneli</h1>
          <p className="mt-1.5 mb-7 text-[0.85rem] text-muted">
            Av. Emre Altundaş — Yönetim
          </p>
          <input
            id="passwordInput"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            className="input-field mb-3.5"
          />
          <button type="submit" disabled={busy} className="btn-navy h-11 w-full">
            {busy ? "Kontrol ediliyor..." : "Giriş Yap"}
          </button>
          {loginError ? (
            <p className="mt-3 text-[0.85rem] text-danger">{loginError}</p>
          ) : null}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-mist pb-20">
      <header className="border-b border-gold/30 bg-paper">
        <div className="mx-auto flex w-[min(94%,1100px)] flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="font-display text-2xl text-navy">Yönetim Paneli</h1>
          <div className="flex gap-2">
            <Link
              to="/makaleler"
              className="inline-flex h-10 items-center border border-navy px-4 text-sm font-semibold text-navy"
            >
              Siteyi Gör
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex h-10 items-center border border-navy px-4 text-sm font-semibold text-navy"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-[min(94%,1100px)] pt-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["overview", "Özet"],
              ["editor", form.id ? "Düzenle" : "Yeni Yazı"],
              ["list", `Makaleler (${articles.length})`],
              ["messages", `Mesajlar (${messages.length})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={
                tab === id
                  ? "h-10 bg-navy px-4 text-sm font-semibold text-paper"
                  : "h-10 border border-navy px-4 text-sm font-semibold text-navy"
              }
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Toplam makale" value={articles.length} />
            <Stat label="Yayında" value={published} />
            <Stat label="Taslak" value={drafts} />
            <Stat label="Gelen mesaj" value={messages.length} />

            <section className="bg-paper p-6 sm:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl text-navy">Son yazılar</h2>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setStatus("");
                    setTab("editor");
                  }}
                  className="text-xs font-semibold tracking-wide text-navy uppercase"
                >
                  + Yeni yazı
                </button>
              </div>
              <ul className="divide-y divide-line">
                {sorted.slice(0, 5).map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-navy">{a.title}</p>
                      <p className="text-xs text-muted">
                        /makale/{a.slug} · {a.category} ·{" "}
                        {a.published ? "Yayında" : "Taslak"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => edit(a)}
                      className="shrink-0 text-xs font-semibold text-navy underline"
                    >
                      Düzenle
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-paper p-6 sm:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl text-navy">Son mesajlar</h2>
                <button
                  type="button"
                  onClick={() => setTab("messages")}
                  className="text-xs font-semibold tracking-wide text-navy uppercase"
                >
                  Tümü
                </button>
              </div>
              {messages.length === 0 ? (
                <p className="py-6 text-sm text-muted">Henüz iletişim mesajı yok.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {messages.slice(0, 4).map((m) => (
                    <li key={m.id} className="py-3">
                      <p className="font-medium text-navy">{m.name}</p>
                      <p className="truncate text-xs text-muted">
                        {m.email} · {formatTrDate(m.createdAt)}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-slate">{m.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="bg-paper p-6 sm:col-span-2 lg:col-span-4">
              <h2 className="font-display mb-4 text-xl text-navy">Kategoriler</h2>
              {byCategory.length === 0 ? (
                <p className="text-sm text-muted">Henüz kategori yok.</p>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {byCategory.map(([name, count]) => (
                    <li key={name} className="border border-line px-4 py-3">
                      <p className="text-xs tracking-wide text-muted uppercase">{name}</p>
                      <p className="font-display mt-1 text-2xl text-navy">{count}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        ) : null}

        {tab === "editor" ? (
          <section className="bg-paper p-6 shadow-[0_4px_20px_rgba(15,39,71,0.06)] sm:p-8">
            <h2 className="font-display mb-5 text-[1.4rem] text-navy">
              {form.id ? "Makaleyi Düzenle" : "Yeni Makale"}
            </h2>
            <form onSubmit={save} className="grid gap-8 lg:grid-cols-2">
              <div>
                <label className="mb-1 block text-[0.82rem] font-semibold text-navy">
                  Başlık
                </label>
                <input
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      slug: f.slugTouched ? f.slug : slugifyBase(title),
                    }));
                  }}
                  required
                  className="input-field mb-4"
                />
                <label className="mb-1 block text-[0.82rem] font-semibold text-navy">
                  URL / slug
                </label>
                <div className="mb-1 flex items-center border border-line bg-mist">
                  <span className="px-3 text-xs text-muted">/makale/</span>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        slug: slugifyBase(e.target.value),
                        slugTouched: true,
                      }))
                    }
                    className="h-11 flex-1 bg-transparent px-2 text-sm outline-none"
                  />
                  <button
                    type="button"
                    className="h-11 px-3 text-xs font-semibold text-navy"
                    onClick={() => {
                      if (!form.slug) return;
                      void navigator.clipboard.writeText(`/makale/${form.slug}`);
                      setStatus("Slug panoya kopyalandı.");
                    }}
                  >
                    Kopyala
                  </button>
                </div>
                <p className="mb-4 text-xs text-muted">
                  Adres otomatik üretilir; Türkçe karakterler sadeleştirilir.
                  {slugTaken
                    ? " Bu slug kullanımda — kayıtta numaralandırılır."
                    : ""}
                </p>
                <label className="mb-1 block text-[0.82rem] font-semibold text-navy">
                  Kategori
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="input-field mb-4"
                >
                  {ARTICLE_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <label className="mb-1 block text-[0.82rem] font-semibold text-navy">
                  Özet (SEO)
                </label>
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                  rows={2}
                  maxLength={220}
                  className="input-field mb-1"
                />
                <p className="mb-4 text-xs text-muted">
                  {form.summary.length}/160 karakter önerilen arama özeti
                </p>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    className="toolbar-btn"
                    title="Alt başlık"
                    onClick={() => insertAtCursor("## Alt başlık\n\n")}
                  >
                    <Heading2 className="size-3.5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    title="Kalın (Ctrl+B)"
                    onClick={() => wrapSelection("**", "**", "kalın")}
                  >
                    <Bold className="size-3.5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    title="İtalik (Ctrl+I)"
                    onClick={() => wrapSelection("*", "*", "italik")}
                  >
                    <Italic className="size-3.5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    title="Alıntı"
                    onClick={() => insertAtCursor("> Alıntı\n\n")}
                  >
                    <Quote className="size-3.5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    title="Madde listesi"
                    onClick={() => prefixLines("- ")}
                  >
                    <List className="size-3.5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    title="Numaralı liste"
                    onClick={() => prefixLines("1. ")}
                  >
                    <ListOrdered className="size-3.5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    title="Bağlantı (Ctrl+K)"
                    onClick={insertLink}
                  >
                    <Link2 className="size-3.5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className="toolbar-btn"
                    title="Ayırıcı"
                    onClick={() => insertAtCursor("\n\n---\n\n")}
                  >
                    <Minus className="size-3.5" strokeWidth={1.8} />
                  </button>
                </div>
                <textarea
                  ref={contentRef}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  onKeyDown={onEditorKey}
                  required
                  rows={14}
                  className="input-field mb-2 font-mono text-[0.85rem]"
                />
                <p className="mb-4 text-xs text-muted">
                  {words} kelime · yaklaşık {reading} dk okuma
                </p>
                <label className="mb-1 block text-[0.82rem] font-semibold text-navy">
                  Kapak görseli
                </label>
                <input
                  value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://... veya yükleyin"
                  className="input-field mb-3"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mb-4 block w-full text-sm"
                  onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
                />
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt=""
                    className="mb-4 max-h-32 w-full object-cover"
                  />
                ) : null}
                <label className="mb-5 flex items-center gap-2 text-sm text-navy">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, published: e.target.checked }))
                    }
                    className="accent-gold"
                  />
                  Yayınla
                </label>
                <div className="flex flex-wrap gap-2">
                  <button type="submit" className="h-11 bg-gold px-5 text-sm font-semibold text-navy">
                    {form.id ? "Kaydet" : "Yayınla / Kaydet"}
                  </button>
                  {form.id ? (
                    <button
                      type="button"
                      onClick={() => {
                        setForm(emptyForm);
                        setStatus("");
                      }}
                      className="h-11 border border-navy px-5 text-sm font-semibold text-navy"
                    >
                      Vazgeç
                    </button>
                  ) : null}
                </div>
                {status ? (
                  <p
                    className={
                      status.includes("zorunlu") || status.includes("MB")
                        ? "mt-3 text-sm text-danger"
                        : "mt-3 text-sm text-success"
                    }
                  >
                    {status}
                  </p>
                ) : null}
              </div>
              <div className="border border-line bg-mist p-5">
                <p className="mb-3 text-[0.72rem] tracking-[0.14em] text-gold uppercase">
                  Canlı önizleme
                </p>
                {form.imageUrl ? (
                  <img src={form.imageUrl} alt="" className="mb-4 max-h-40 w-full object-cover" />
                ) : null}
                <p className="text-[0.72rem] text-gold uppercase">{form.category || "Genel"}</p>
                <h3 className="font-display mt-2 text-2xl text-navy">
                  {form.title || "Başlık"}
                </h3>
                {form.summary ? (
                  <p className="mt-2 text-sm text-slate italic">{form.summary}</p>
                ) : null}
                <ArticleBody
                  content={form.content || "İçerik buraya gelecek."}
                  className="mt-4 text-sm text-slate"
                />
              </div>
            </form>
          </section>
        ) : null}

        {tab === "list" ? (
          <section className="bg-paper p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-[1.4rem] text-navy">Tüm Makaleler</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setStatus("");
                    setTab("editor");
                  }}
                  className="h-10 bg-navy px-4 text-xs font-semibold text-paper"
                >
                  Yeni yazı
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Örnek makalelere sıfırlansın mı?")) resetArticles();
                  }}
                  className="text-xs text-slate underline"
                >
                  Örneklere dön
                </button>
              </div>
            </div>
            <div className="mb-5 flex flex-wrap gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Başlık veya slug ara…"
                className="input-field max-w-xs"
              />
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="input-field max-w-[220px]"
              >
                <option>Tümü</option>
                {ARTICLE_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-muted">Eşleşen makale yok.</p>
            ) : (
              <ul>
                {filtered.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-wrap items-center gap-4 border-b border-line py-4 last:border-0"
                  >
                    {a.imageUrl ? (
                      <img src={a.imageUrl} alt="" className="size-[70px] object-cover" />
                    ) : (
                      <div className="size-[70px] bg-navy" />
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg text-navy">
                        {a.title}{" "}
                        <span
                          className={
                            a.published
                              ? "ml-1 align-middle text-[0.68rem] tracking-wide text-success uppercase"
                              : "ml-1 align-middle text-[0.68rem] tracking-wide text-danger uppercase"
                          }
                        >
                          {a.published ? "Yayında" : "Taslak"}
                        </span>
                      </h3>
                      <p className="text-[0.78rem] text-muted">
                        /makale/{a.slug} · {a.category} · {formatTrDate(a.updatedAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to="/makale/$slug"
                        params={{ slug: a.slug }}
                        className="inline-flex h-8 items-center border border-navy px-3 text-xs font-semibold text-navy"
                      >
                        Aç
                      </Link>
                      <button
                        type="button"
                        onClick={() => togglePublished(a)}
                        className="h-8 border border-navy px-3 text-xs font-semibold text-navy"
                      >
                        {a.published ? "Taslağa al" : "Yayınla"}
                      </button>
                      <button
                        type="button"
                        onClick={() => edit(a)}
                        className="h-8 border border-navy px-3 text-xs font-semibold text-navy"
                      >
                        Düzenle
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`“${a.title}” silinsin mi?`)) deleteArticle(a.id);
                        }}
                        className="h-8 bg-danger px-3 text-xs font-semibold text-paper"
                      >
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        {tab === "messages" ? (
          <section className="bg-paper p-8">
            <h2 className="font-display mb-5 text-[1.4rem] text-navy">İletişim Mesajları</h2>
            {messages.length === 0 ? (
              <p className="py-8 text-center text-muted">Henüz mesaj yok.</p>
            ) : (
              <ul className="space-y-5">
                {messages.map((m) => (
                  <li key={m.id} className="border-b border-line pb-5 last:border-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-navy">{m.name}</p>
                        <p className="text-sm text-slate">
                          <a href={`mailto:${m.email}`} className="hover:text-gold">
                            {m.email}
                          </a>
                          {m.phone ? (
                            <>
                              {" · "}
                              <a href={`tel:${m.phone}`} className="hover:text-gold">
                                {m.phone}
                              </a>
                            </>
                          ) : null}
                        </p>
                        <p className="mt-1 text-xs text-muted">{formatTrDate(m.createdAt)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteMessage(m.id)}
                        className="text-xs text-danger underline"
                      >
                        Sil
                      </button>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-ink/90">{m.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-paper p-6">
      <p className="text-xs tracking-[0.14em] text-muted uppercase">{label}</p>
      <p className="font-display mt-2 text-4xl text-navy">{value}</p>
    </div>
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("okunamadı"));
    reader.readAsDataURL(file);
  });
}
