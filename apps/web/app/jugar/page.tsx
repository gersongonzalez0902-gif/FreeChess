import type { Metadata } from "next";
import { Swords } from "lucide-react";
import { SectionPlaceholder } from "@/components/section-placeholder";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.sections.jugar.title,
  description: dict.sections.jugar.description,
};

export default function PlayPage() {
  const s = dict.sections.jugar;
  return (
    <SectionPlaceholder
      icon={<Swords aria-hidden="true" />}
      title={s.title}
      description={s.description}
      features={s.features}
      phaseNote={s.phaseNote}
      phase={2}
    />
  );
}
