import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dict } from "@/lib/i18n";

/**
 * Página de sección en construcción honesta (skill de diseño: estado vacío
 * útil). Explica qué habrá, cómo se generará y en qué fase llega. Nada de
 * botones sin función.
 */
export function SectionPlaceholder({
  icon,
  title,
  description,
  features,
  phaseNote,
  phase,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: readonly string[];
  phaseNote: string;
  phase: number;
}) {
  return (
    <div>
      <PageHeader icon={icon} title={title} description={description} actions={<Badge variant="outline">{dict.common.phase.replace("{n}", String(phase))}</Badge>} />

      <Card>
        <CardHeader>
          <CardTitle>{phaseNote}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-text" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/" className={buttonStyles({ variant: "secondary", size: "md" })}>
              {dict.emptyState.backHome}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
