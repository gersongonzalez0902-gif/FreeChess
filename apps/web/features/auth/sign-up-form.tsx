"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { flushOutboxOnLogin } from "@/lib/preferences";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { dict } from "@/lib/i18n";
import { authErrorMessage } from "@/features/auth/sign-in-form";

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError(dict.auth.errors.INVALID_NAME);
      return;
    }
    if (password.length < 8) {
      setError(dict.auth.errors.WEAK_PASSWORD);
      return;
    }

    setPending(true);
    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      if (result.error) {
        setError(authErrorMessage(result.error));
        return;
      }
      await flushOutboxOnLogin();
      router.push("/");
      router.refresh();
    } catch {
      setError(dict.auth.errors.network);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Field
        label={dict.auth.name}
        type="text"
        name="name"
        autoComplete="name"
        placeholder={dict.auth.namePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={2}
      />
      <Field
        label={dict.auth.email}
        type="email"
        name="email"
        autoComplete="email"
        placeholder={dict.auth.emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="relative">
        <Field
          label={dict.auth.password}
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="new-password"
          placeholder={dict.auth.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? dict.auth.hidePassword : dict.auth.showPassword}
          title={showPassword ? dict.auth.hidePassword : dict.auth.showPassword}
          className="absolute right-1.5 top-[2.1rem] inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-danger-surface px-3.5 py-2.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="mt-1 w-full">
        <UserPlus className="size-4" aria-hidden="true" />
        {pending ? dict.auth.signingUp : dict.auth.signUpAction}
      </Button>

      <p className="text-center text-sm text-muted">
        {dict.auth.toSignIn.replace("?", " · ")}{" "}
        <Link href="/entrar" className="font-medium text-accent-text hover:underline">
          {dict.nav.signIn}
        </Link>
      </p>
    </form>
  );
}
