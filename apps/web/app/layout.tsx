import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/app-shell";
import { dict } from "@/lib/i18n";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${dict.common.appName} — ${dict.common.tagline}`,
    template: `%s · ${dict.common.appName}`,
  },
  description: dict.common.appDescription,
  applicationName: dict.common.appName,
  icons: { icon: "/icon.svg" },
  keywords: ["ajedrez", "chess", "gratis", "stockfish", "puzzles", "entrenamiento"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a120d" },
  ],
};

/**
 * Script anti-destello: aplica el tema guardado ANTES de que React hidrate
 * la página (misma clave que ThemeProvider: "freechess.theme").
 * Tema por defecto: oscuro (identidad de FreeChess).
 */
const NO_FLASH_SCRIPT = `(function(){try{var m=localStorage.getItem("freechess.theme")||"dark";var d=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
