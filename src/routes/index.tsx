import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

const TOTAL = 3;

export default component$(() => {
  const slide = useSignal(0);

  useVisibleTask$(({ cleanup }) => {
    let locked = false;
    let unlockTimer: ReturnType<typeof setTimeout>;
    const lock = () => {
      locked = true;
      clearTimeout(unlockTimer);
      unlockTimer = setTimeout(() => (locked = false), 950);
    };
    const go = (dir: number) => {
      if (locked) return;
      const next = Math.min(TOTAL - 1, Math.max(0, slide.value + dir));
      if (next === slide.value) return;
      slide.value = next;
      lock();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (locked) {
        // Momentum tail: keep the lock until 300ms of wheel silence.
        clearTimeout(unlockTimer);
        unlockTimer = setTimeout(() => (locked = false), 300);
        return;
      }
      go(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) go(1);
      if (["ArrowUp", "PageUp"].includes(e.key)) go(-1);
    };
    let startY = 0;
    const onStart = (e: TouchEvent) => (startY = e.touches[0].clientY);
    const onEnd = (e: TouchEvent) => {
      const d = startY - e.changedTouches[0].clientY;
      if (Math.abs(d) > 40) go(d > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    cleanup(() => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    });
  });

  const toggleTheme = $(() => {
    const el = document.documentElement;
    const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
    el.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  return (
    <>
      <button class="theme-toggle" onClick$={toggleTheme} aria-label="Toggle theme">
        <svg
          class="sun"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="6.3" y2="6.3" />
          <line x1="17.7" y1="17.7" x2="19.1" y2="19.1" />
          <line x1="4.9" y1="19.1" x2="6.3" y2="17.7" />
          <line x1="17.7" y1="6.3" x2="19.1" y2="4.9" />
        </svg>
        <span class="moon" aria-hidden="true">☾</span>
      </button>

      <nav class="dots" aria-label="Slides">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            aria-current={slide.value === i}
            aria-label={`Slide ${i + 1}`}
            onClick$={() => (slide.value = i)}
          />
        ))}
      </nav>

      <div class="deck" style={{ transform: `translateY(-${slide.value * 100}vh)` }}>
        <section class="slide">
          <p class="kicker">Barcelona, Spain</p>
          <h1>Maksim Dolgikh</h1>
          <p class="tag">Full-Stack Developer</p>
        </section>

        <section class="slide">
          <h2 class="section-title">Running in production</h2>
          <div class="cards">
            <a class="card" href="https://clp.aromawax.eu" target="_blank" rel="noopener">
              <div class="card-head">
                <span class="card-title">CLP Label Generator</span>
                <span class="card-arrow" aria-hidden="true">↗</span>
              </div>
              <p class="card-desc">
                EU CLP-compliant chemical labels from safety data sheets:
                SDS parsing, hazard classification per Regulation 1272/2008,
                print-ready PDFs in 24 languages.
              </p>
              <p class="card-stack">Python · Flask · PDF rendering · EU CLP</p>
            </a>
            <a class="card" href="https://barcode.aromawax.eu" target="_blank" rel="noopener">
              <div class="card-head">
                <span class="card-title">Barcode Generator</span>
                <span class="card-arrow" aria-hidden="true">↗</span>
              </div>
              <p class="card-desc">
                Local Code-128 barcodes with tunable output — no external
                barcode API, copy straight from the page.
              </p>
              <p class="card-stack">TypeScript · Qwik · Client-side</p>
            </a>
          </div>
        </section>

        <section class="slide">
          <h2 class="section-title">Stack & contact</h2>
          <p class="stack-line">
            TypeScript/JavaScript · Python · React · Qwik · Flask · FastAPI ·
            PostgreSQL · Docker · nginx · self-managed Linux
          </p>
          <p class="contact-line">
            <a href="mailto:me@noisethewhite.dev">me@noisethewhite.dev</a>
            <span class="sep" aria-hidden="true">·</span>
            <a href="https://github.com/noisethewhite" target="_blank" rel="noopener">github.com/noisethewhite</a>
          </p>
        </section>
      </div>

      {slide.value === 0 && <div class="hint">Scroll</div>}
    </>
  );
});
