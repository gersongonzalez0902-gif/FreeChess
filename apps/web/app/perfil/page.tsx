import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ProfileView } from "@/features/perfil/profile-view";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.profile.title,
};

export default function ProfilePage() {
  return (
    <div>
      <PageHeader
        icon={<UserRound aria-hidden="true" />}
        title={dict.profile.title}
        description={dict.profile.accountTitle}
      />
      <ProfileView />
    </div>
  );
}
