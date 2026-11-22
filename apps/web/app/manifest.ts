import type { MetadataRoute } from "next";
import { dict } from "@/lib/i18n";

/** Manifest PWA básico (Serwist y modo offline completos llegan en Fase 8). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${dict.common.appName} — ${dict.common.tagline}`,
    short_name: dict.common.appName,
    description: dict.common.appDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a120d",
    theme_color: "#07331f",
    lang: "es",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
