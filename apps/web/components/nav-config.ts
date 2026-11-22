import {
  BookOpen,
  Brain,
  ChartColumn,
  GraduationCap,
  Home,
  Microscope,
  Settings,
  Swords,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { dict } from "@/lib/i18n";

/**
 * Arquitectura de la información (skill de diseño): 10 secciones fijas.
 * `mobilePrimary` = destinos visibles en la barra inferior móvil (máx. 5,
 * el último abre el menú completo).
 */
export type NavItem = {
  id: string;
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "home", href: "/", label: dict.nav.home, icon: Home },
  { id: "play", href: "/jugar", label: dict.nav.play, icon: Swords },
  { id: "analyze", href: "/analizar", label: dict.nav.analyze, icon: Microscope },
  { id: "train", href: "/entrenar", label: dict.nav.train, icon: Brain },
  { id: "openings", href: "/aperturas", label: dict.nav.openings, icon: BookOpen },
  { id: "learn", href: "/aprender", label: dict.nav.learn, icon: GraduationCap },
  { id: "tools", href: "/herramientas", label: dict.nav.tools, icon: Wrench },
  { id: "stats", href: "/estadisticas", label: dict.nav.stats, icon: ChartColumn },
  { id: "profile", href: "/perfil", label: dict.nav.profile, icon: UserRound },
  { id: "settings", href: "/ajustes", label: dict.nav.settings, icon: Settings },
];

/** Ids visibles en la barra inferior móvil (los demás van en "Más"). */
export const MOBILE_PRIMARY_IDS = ["home", "play", "analyze", "train"];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
