(function () {
  const header = document.querySelector("[data-header]");
  const overlay = document.querySelector("[data-overlay]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const closeLinks = document.querySelectorAll("[data-close-menu]");

  function setOpen(open) {
    if (!header || !overlay || !toggle) return;
    header.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    const iconOpen = toggle.querySelector("[data-icon-open]");
    const iconClose = toggle.querySelector("[data-icon-close]");
    if (iconOpen && iconClose) {
      iconOpen.hidden = open;
      iconClose.hidden = !open;
    }
  }

  toggle?.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-open"));
  });
  closeLinks.forEach((el) => el.addEventListener("click", () => setOpen(false)));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      const kvkk = form.querySelector("[name=kvkk_onay]");
      const note = form.querySelector("[data-form-note]");
      if (!name || !email || !message || (kvkk && !kvkk.checked)) {
        if (note) {
          note.className = "form-err";
          note.textContent = "Lütfen zorunlu alanları doldurun ve KVKK onayını işaretleyin.";
        }
        return;
      }
      form.reset();
      if (note) {
        note.className = "form-ok";
        note.textContent = "Mesajınız alındı. En kısa sürede dönüş yapılacaktır.";
      }
    });
  }

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("is-on", b === btn));
      document.querySelectorAll("[data-article-cat]").forEach((card) => {
        const match = cat === "all" || card.getAttribute("data-article-cat") === cat;
        card.hidden = !match;
      });
    });
  });
})();
