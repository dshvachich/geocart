"use client";

import { type ReactNode } from "react";
import { AppHydrator } from "@/app-shell/app-hydrator";
import { DiProvider } from "@/di/di-provider";
import "@/i18n";

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <DiProvider>
    <AppHydrator>{children}</AppHydrator>
  </DiProvider>
);
