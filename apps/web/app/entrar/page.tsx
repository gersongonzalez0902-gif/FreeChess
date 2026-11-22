import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInForm } from "@/features/auth/sign-in-form";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.auth.signInTitle,
};

export default function SignInPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-6">
      <Logo />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{dict.auth.signInTitle}</CardTitle>
          <CardDescription>{dict.auth.signInSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
      <p className="max-w-sm text-center text-xs leading-relaxed text-muted">
        {dict.auth.guestNote} {dict.auth.privacyNote}
      </p>
    </div>
  );
}
