import type { Metadata } from "next";
import { Brain } from "lucide-react";
import { SectionPlaceholder } from "@/components/section-placeholder";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.sections.entrenar.title,
  description: dict.sections.entrenar.description,
};

export default function TrainPage() {
  const s = dict.sections.entrenar;
  return (
    <SectionPlaceholder
      icon={<Brain aria-hidden="true" />}
      title={s.title}
      description={s.description}
      features={s.features}
      phaseNote={s.phaseNote}
      phase={4}
    />
  );
}
