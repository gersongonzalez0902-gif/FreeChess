import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/sign-up-form";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.auth.signUpTitle,
};

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-6">
      <Logo />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{dict.auth.signUpTitle}</CardTitle>
          <CardDescription>{dict.auth.signUpSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <p className="max-w-sm text-center text-xs leading-relaxed text-muted">
        {dict.auth.guestNote} {dict.auth.privacyNote}
      </p>
    </div>
  );
}
