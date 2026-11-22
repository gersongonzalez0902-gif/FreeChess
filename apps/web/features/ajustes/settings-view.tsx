"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CircleCheckBig,
  Database,
  ExternalLink,
  Languages,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Sun,
  Trash2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { clearAllLocalData } from "@/lib/local-db";
import { useTheme } from "@/components/theme-provider";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@freechess/shared";

const VERSION = "0.1.0";

const THEME_OPTIONS: Array<{
  mode: ThemeMode;
  label: string;
  description: string;
  icon: typeof Sun;
}> = [
  { mode: "light", label: dict.theme.light, description: dict.settings.themeLightDesc, icon: Sun },
  { mode: "dark", label: dict.theme.dark, description: dict.settings.themeDarkDesc, icon: Moon },
  { mode: "system", label: dict.theme.system, description: dict.settings.themeSystemDesc, icon: Monitor },
];

/** Ajustes: solo controles que funcionan de verdad (skill de diseño). */
export function SettingsView() {
  const { mode: themeMode, setMode } = useTheme();
  const { data: session } = authClient.useSession();
  const [confirmClear, setConfirmClear] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleClearData = async () => {
    await clearAllLocalData();
    setConfirmClear(false);
    setCleared(true);
  };

  return (
    <div className="space-y-6">
      {/* Apariencia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="size-5 text-accent-text" aria-hidden="true" />
            {dict.settings.appearanceTitle}
          </CardTitle>
          <CardDescription>{dict.settings.appearanceDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={dict.theme.label}>
            {THEME_OPTIONS.map((option) => {
              const Icon = option.icon;
              const selected = themeMode === option.mode;
              return (
                <button
                  key={option.mode}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setMode(option.mode)}
                  className={cn(
                    "flex min-h-11 flex-col gap-2 rounded-2xl border p-4 text-left transition-colors",
                    selected
                      ? "border-accent bg-accent/10"
                      : "border-border bg-surface hover:border-muted/50 hover:bg-surface-2/50",
                  )}
                >
                  <Icon
                    className={cn("size-6", selected ? "text-accent-text" : "text-muted")}
                    aria-hidden="true"
                  />
                  <span>
                    <span className={cn("block font-semibold", selected ? "text-accent-text" : "text-fg")}>
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Idioma: solo español hoy. Control deshabilitado honesto (no fake). */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="size-5 text-accent-text" aria-hidden="true" />
            {dict.settings.languageTitle}
          </CardTitle>
          <CardDescription>{dict.settings.languageDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <label className="sr-only" htmlFor="language-select">
            {dict.settings.languageTitle}
          </label>
          <select
            id="language-select"
            disabled
            className="h-11 w-full cursor-not-allowed rounded-xl border border-border bg-surface-2/50 px-3.5 text-sm font-medium text-fg opacity-70"
          >
            <option>{dict.settings.languageSpanish}</option>
          </select>
          <p className="mt-1.5 text-xs text-muted">{dict.common.comingSoon}</p>
        </CardContent>
      </Card>

      {/* Cuenta */}
      <Card>
        <CardHeader>
          <CardTitle>{dict.settings.accountTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {session?.user ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted">{dict.settings.accountEmail}</p>
                <p className="font-medium text-fg">{session.user.email}</p>
              </div>
              <button
                type="button"
                onClick={() => authClient.signOut().catch(() => undefined)}
                className={buttonStyles({ variant: "outline", size: "sm" })}
              >
                <LogOut className="size-4" aria-hidden="true" />
                {dict.auth.signOut}
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">{dict.settings.accountGuest}</p>
              <div className="flex gap-2">
                <Link href="/registro" className={buttonStyles({ size: "sm" })}>
                  {dict.nav.signUp}
                </Link>
                <Link href="/entrar" className={buttonStyles({ variant: "outline", size: "sm" })}>
                  {dict.nav.signIn}
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Datos locales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-5 text-accent-text" aria-hidden="true" />
            {dict.settings.dataTitle}
          </CardTitle>
          <CardDescription>{dict.settings.dataDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {confirmClear ? (
            <div className="flex flex-wrap items-center gap-3 rounded-xl bg-danger-surface p-4">
              <p className="min-w-0 flex-1 text-sm font-medium text-danger">
                {dict.settings.dataClearConfirm}
              </p>
              <button
                type="button"
                onClick={handleClearData}
                className={buttonStyles({ variant: "danger", size: "sm" })}
              >
                {dict.settings.dataClear}
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className={buttonStyles({ variant: "ghost", size: "sm" })}
              >
                {dict.common.cancel}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className={buttonStyles({ variant: "outline", size: "sm" })}
            >
              <Trash2 className="size-4" aria-hidden="true" />
              {dict.settings.dataClear}
            </button>
          )}
          {cleared && (
            <p role="status" className="flex items-center gap-1.5 text-sm font-medium text-accent-text">
              <CircleCheckBig className="size-4" aria-hidden="true" />
              {dict.settings.dataCleared}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Acerca de */}
      <Card>
        <CardHeader>
          <CardTitle>{dict.settings.aboutTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-muted">{dict.settings.aboutVersion}</span>
            <span className="font-mono font-medium text-fg">{VERSION}</span>
          </div>
          <p className="text-muted">{dict.settings.aboutLicense}</p>
          <div className="flex flex-col gap-2 pt-1">
            <a
              href="/ATTRIBUTIONS.md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent-text hover:underline"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              {dict.settings.aboutCredits}
            </a>
            <p className="text-xs text-muted">{dict.settings.aboutCreditsDesc}</p>
            <a
              href="https://github.com/gersongonzalez0902-gif/freechess"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent-text hover:underline"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              {dict.settings.aboutSource}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
