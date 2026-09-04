"use client";

import { type ReactNode, useEffect } from "react";
import { AppStore } from "@/app-shell/app-store";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import type { SupportedLocale } from "@/domain/types/locale";
import { useContainer } from "@/di/di-provider";
import i18n, { syncI18nLanguage } from "@/i18n";

type AppHydratorProps = {
  children: ReactNode;
  initialLocale: SupportedLocale;
};

export const AppHydrator = ({ children, initialLocale }: AppHydratorProps) => {
  const container = useContainer();
  const appStore = container.get(AppStore);
  const favoritesStore = container.get(FavoritesStore);

  syncI18nLanguage(initialLocale);
  appStore.syncLanguage(initialLocale);

  useEffect(() => {
    favoritesStore.hydrate();

    const syncFavorites = () => favoritesStore.syncFromStorage();

    window.addEventListener("storage", syncFavorites);

    return () => window.removeEventListener("storage", syncFavorites);
  }, [favoritesStore]);

  useEffect(() => {
    const syncLanguage = (language: string) => appStore.syncLanguage(language);

    appStore.syncLanguage(i18n.resolvedLanguage ?? i18n.language);
    i18n.on("languageChanged", syncLanguage);

    return () => {
      i18n.off("languageChanged", syncLanguage);
    };
  }, [appStore, initialLocale]);

  return <>{children}</>;
};
