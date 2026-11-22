"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { flushOutboxOnLogin } from "@/lib/preferences";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { dict } from "@/lib/i18n";

type ApiError = { code?: string; message?: string; status?: number };

/** Traduce un error de Better Auth a un mensaje claro en español. */
export function authErrorMessage(error: ApiError | null | undefined): string {
  const code = error?.code ?? "";
  if (code in dict.auth.errors) {
    return dict.auth.errors[code as keyof typeof dict.auth.errors];
  }
  if (error?.status === 0 || error?.message?.toLowerCase().includes("network")) {
    return dict.auth.errors.network;
  }
  return dict.auth.errors.unknown;
}

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });
      if (result.error) {
        setError(authErrorMessage(result.error));
        return;
      }
      // Éxito: sincronizar preferencias locales pendientes y volver al inicio.
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
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
        <LogIn className="size-4" aria-hidden="true" />
        {pending ? dict.auth.signingIn : dict.auth.signInAction}
      </Button>

      <p className="text-center text-sm text-muted">
        {dict.auth.toSignUp.replace("?", " · ")}{" "}
        <Link href="/registro" className="font-medium text-accent-text hover:underline">
          {dict.nav.signUp}
        </Link>
      </p>
    </form>
  );
}
