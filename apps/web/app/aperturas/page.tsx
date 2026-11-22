import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { SectionPlaceholder } from "@/components/section-placeholder";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.sections.aperturas.title,
  description: dict.sections.aperturas.description,
};

export default function OpeningsPage() {
  const s = dict.sections.aperturas;
  return (
    <SectionPlaceholder
      icon={<BookOpen aria-hidden="true" />}
      title={s.title}
      description={s.description}
      features={s.features}
      phaseNote={s.phaseNote}
      phase={5}
    />
  );
}
