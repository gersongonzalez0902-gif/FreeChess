import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Microscope, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dict } from "@/lib/i18n";

type QuickAction = {
  href: string;
  title: string;
  description: string;
  phase: number;
  icon: typeof Swords;
};

const ACTIONS: QuickAction[] = [
  {
    href: "/jugar",
    title: dict.dashboard.play,
    description: dict.dashboard.playDesc,
    phase: 2,
    icon: Swords,
  },
  {
    href: "/entrenar",
    title: dict.dashboard.train,
    description: dict.dashboard.trainDesc,
    phase: 4,
    icon: Brain,
  },
  {
    href: "/analizar",
    title: dict.dashboard.analyze,
    description: dict.dashboard.analyzeDesc,
    phase: 3,
    icon: Microscope,
  },
  {
    href: "/aprender",
    title: dict.dashboard.learn,
    description: dict.dashboard.learnDesc,
    phase: 7,
    icon: BookOpen,
  },
];

/** Acceso rápido a las herramientas (con fase real de llegada, sin humo). */
export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title" className="space-y-3">
      <div>
        <h2 id="quick-actions-title" className="text-lg font-semibold text-fg">
          {dict.dashboard.quickTitle}
        </h2>
        <p className="text-sm text-muted">{dict.dashboard.quickSubtitle}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent-text">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <Badge variant="outline">{dict.common.phase.replace("{n}", String(action.phase))}</Badge>
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 font-semibold text-fg">
                  {action.title}
                  <ArrowRight
                    className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-text"
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
