import { KvkkContent } from "./KvkkContent";

export function KvkkDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/75 p-5"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="kvkk-title"
        className="relative max-h-[80vh] w-full max-w-[700px] overflow-y-auto border-t-[3px] border-gold bg-paper px-8 py-11 text-ink sm:px-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-5 text-3xl leading-none text-navy"
          aria-label="Kapat"
        >
          ×
        </button>
        <h3 id="kvkk-title" className="font-display text-[1.7rem] text-navy">
          KVKK Aydınlatma Metni
        </h3>
        <div className="gold-rule mt-4 mb-6" />
        <KvkkContent />
      </div>
    </div>
  );
}
