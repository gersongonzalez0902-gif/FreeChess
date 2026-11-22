import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SettingsView } from "@/features/ajustes/settings-view";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.settings.title,
};

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        icon={<Settings aria-hidden="true" />}
        title={dict.settings.title}
        description={dict.settings.pageDescription}
      />
      <SettingsView />
    </div>
  );
}
