"use client";

import { type ReactNode } from "react";
import { AppHydrator } from "@/app-shell/app-hydrator";
import type { SupportedLocale } from "@/domain/types/locale";
import { DiProvider } from "@/di/di-provider";
import "@/i18n";

type AppProviderProps = {
  children: ReactNode;
  initialLocale: SupportedLocale;
};

export const AppProvider = ({ children, initialLocale }: AppProviderProps) => (
  <DiProvider>
    <AppHydrator initialLocale={initialLocale}>{children}</AppHydrator>
  </DiProvider>
);
