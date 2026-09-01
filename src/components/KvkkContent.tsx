import { KVKK_CONTACT, KVKK_PARAGRAPHS } from "@/lib/kvkk";

export function KvkkContent() {
  return (
    <div className="space-y-4 text-[0.95rem] leading-relaxed text-ink/90">
      {KVKK_PARAGRAPHS.map((p) => (
        <p key={p.title}>
          <strong>{p.title}:</strong> {p.body}
        </p>
      ))}
      <p>{KVKK_CONTACT}</p>
    </div>
  );
}
