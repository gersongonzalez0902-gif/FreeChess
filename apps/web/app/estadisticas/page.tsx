import type { Metadata } from "next";
import { ChartColumn } from "lucide-react";
import { SectionPlaceholder } from "@/components/section-placeholder";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.sections.estadisticas.title,
  description: dict.sections.estadisticas.description,
};

export default function StatsPage() {
  const s = dict.sections.estadisticas;
  return (
    <SectionPlaceholder
      icon={<ChartColumn aria-hidden="true" />}
      title={s.title}
      description={s.description}
      features={s.features}
      phaseNote={s.phaseNote}
      phase={8}
    />
  );
}
