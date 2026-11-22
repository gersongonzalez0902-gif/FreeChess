"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { TopBar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { dict } from "@/lib/i18n";

/**
 * Carcasa de la aplicación: navegación lateral (escritorio), barra superior
 * e inferior (móvil) y área de contenido responsive (skill de diseño).
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a href="#contenido" className="skip-link">
        {dict.a11y.openApp}
      </a>
      <div className="flex">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main
            id="contenido"
            className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12"
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
