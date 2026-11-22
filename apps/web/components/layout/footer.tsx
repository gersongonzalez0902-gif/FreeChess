import { dict } from "@/lib/i18n";

/** Pie de escritorio: licencia, créditos y código fuente. */
export function Footer() {
  return (
    <footer className="hidden border-t border-border px-4 py-6 text-xs text-muted lg:block">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2">
        <p>
          {dict.common.appName} · {dict.settings.aboutLicense}
        </p>
        <div className="flex items-center gap-4">
          <a href="/ATTRIBUTIONS.md" className="transition-colors hover:text-fg">
            {dict.settings.aboutCredits}
          </a>
          <a
            href="https://github.com/gersongonzalez0902-gif/freechess"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-fg"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
