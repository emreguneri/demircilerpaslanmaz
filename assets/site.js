(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  const form = document.getElementById("teklif");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const service = document.getElementById("service")?.value.trim() || "";
      const district = document.getElementById("district")?.value.trim() || "";
      const detail = document.getElementById("detail")?.value.trim() || "";

      const text = [
        "Merhaba, teklif almak istiyorum.",
        `Ad Soyad: ${name || "Belirtilmedi"}`,
        `Telefon: ${phone || "Belirtilmedi"}`,
        `Hizmet: ${service || "Belirtilmedi"}`,
        `İlçe/Konum: ${district || "Belirtilmedi"}`,
        `Detay: ${detail || "Belirtilmedi"}`,
      ].join("\n");

      const url = `https://wa.me/905392401111?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener");
    });
  }
})();
