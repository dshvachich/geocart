import { uiAssets } from "@/app-shell/components/assets";
import type { SupportedLocale } from "@/domain/types/locale";

export const navbarLanguageOptions = [
  { locale: "ka", label: "KA", flag: uiAssets.flagGe, title: "ქართული" },
  { locale: "en", label: "EN", flag: uiAssets.flagUs, title: "English" },
  { locale: "ru", label: "RU", flag: uiAssets.flagRu, title: "Русский" },
] satisfies Array<{
  locale: SupportedLocale;
  label: string;
  flag: string;
  title: string;
}>;
