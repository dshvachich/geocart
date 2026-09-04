"use client";

import { type ReactNode, useEffect } from "react";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { useContainer } from "@/di/di-provider";

export const AppHydrator = ({ children }: { children: ReactNode }) => {
  const favoritesStore = useContainer().get(FavoritesStore);

  useEffect(() => {
    favoritesStore.hydrate();

    const syncFavorites = () => favoritesStore.syncFromStorage();

    window.addEventListener("storage", syncFavorites);

    return () => window.removeEventListener("storage", syncFavorites);
  }, [favoritesStore]);

  return <>{children}</>;
};
