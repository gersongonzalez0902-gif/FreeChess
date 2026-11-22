import type { Metadata } from "next";
import { Greeting } from "@/features/dashboard/greeting";
import { QuickActions } from "@/features/dashboard/quick-actions";
import { ActivityPanel, GuestCard, PlanPanel, PlatformStatus } from "@/features/dashboard/panels";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.nav.home,
  description: dict.common.appDescription,
};

/** Inicio (dashboard): saludo, acceso rápido, plan, actividad y estado real. */
export default function HomePage() {
  return (
    <div className="space-y-8">
      <Greeting />
      <QuickActions />
      <GuestCard />
      <div className="grid gap-6 lg:grid-cols-2">
        <PlanPanel />
        <ActivityPanel />
      </div>
      <PlatformStatus />
    </div>
  );
}
