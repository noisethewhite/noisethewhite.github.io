import { component$, $ } from "@builder.io/qwik";

export default component$(() => {
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

      <main class="page">
        <header class="hero">
          <p class="kicker">Barcelona, Spain</p>
          <h1>Maksim Dolgikh</h1>
          <p class="role">Full-Stack Developer</p>
          <p class="bio">
            I build software that runs in production, not in demos — regulatory
            document pipelines, e-commerce integrations, and the self-hosted
            infrastructure underneath them. Python and TypeScript, Linux servers
            I administer myself.
          </p>
        </header>

        <section class="projects" aria-label="Projects">
          <h2>Running in production</h2>

          <a class="card" href="https://clp.aromawax.eu" target="_blank" rel="noopener">
            <div class="card-head">
              <span class="card-title">CLP Label Generator</span>
              <span class="card-arrow" aria-hidden="true">↗</span>
            </div>
            <p class="card-desc">
              Generates EU CLP-compliant chemical product labels from safety
              data sheets. Backend parses SDS sections, computes hazard
              classification per Regulation 1272/2008, and renders
              print-ready PDFs in 24 EU languages.
            </p>
            <p class="card-stack">Python · Flask · PDF rendering · EU CLP regulation</p>
          </a>

          <a class="card" href="https://barcode.aromawax.eu" target="_blank" rel="noopener">
            <div class="card-head">
              <span class="card-title">Barcode Generator</span>
              <span class="card-arrow" aria-hidden="true">↗</span>
            </div>
            <p class="card-desc">
              Local Code-128 barcode generator. Tunable dimensions and
              resolution, copy the rendered image straight from the page —
              no external barcode API involved.
            </p>
            <p class="card-stack">TypeScript · Qwik · Client-side rendering</p>
          </a>
        </section>

        <section class="stack" aria-label="Stack">
          <h2>Stack</h2>
          <p>
            TypeScript/JavaScript · Python · React · Qwik · Flask · FastAPI ·
            PostgreSQL · Docker · nginx · self-managed Linux servers
          </p>
        </section>

        <footer class="contact">
          <a href="mailto:me@noisethewhite.dev">me@noisethewhite.dev</a>
          <span class="sep" aria-hidden="true">·</span>
          <a href="https://github.com/noisethewhite" target="_blank" rel="noopener">github.com/noisethewhite</a>
        </footer>
      </main>
    </>
  );
});
