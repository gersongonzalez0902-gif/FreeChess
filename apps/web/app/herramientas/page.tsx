import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { SectionPlaceholder } from "@/components/section-placeholder";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.sections.herramientas.title,
  description: dict.sections.herramientas.description,
};

export default function ToolsPage() {
  const s = dict.sections.herramientas;
  return (
    <SectionPlaceholder
      icon={<Wrench aria-hidden="true" />}
      title={s.title}
      description={s.description}
      features={s.features}
      phaseNote={s.phaseNote}
      phase={7}
    />
  );
}
