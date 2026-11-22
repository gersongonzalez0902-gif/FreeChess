import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { SectionPlaceholder } from "@/components/section-placeholder";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.sections.aprender.title,
  description: dict.sections.aprender.description,
};

export default function LearnPage() {
  const s = dict.sections.aprender;
  return (
    <SectionPlaceholder
      icon={<GraduationCap aria-hidden="true" />}
      title={s.title}
      description={s.description}
      features={s.features}
      phaseNote={s.phaseNote}
      phase={7}
    />
  );
}
