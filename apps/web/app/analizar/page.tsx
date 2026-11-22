import type { Metadata } from "next";
import { Microscope } from "lucide-react";
import { SectionPlaceholder } from "@/components/section-placeholder";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.sections.analizar.title,
  description: dict.sections.analizar.description,
};

export default function AnalyzePage() {
  const s = dict.sections.analizar;
  return (
    <SectionPlaceholder
      icon={<Microscope aria-hidden="true" />}
      title={s.title}
      description={s.description}
      features={s.features}
      phaseNote={s.phaseNote}
      phase={3}
    />
  );
}
