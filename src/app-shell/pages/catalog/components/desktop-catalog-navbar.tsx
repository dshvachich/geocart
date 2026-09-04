"use client";

import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { AppStore } from "@/app-shell/app-store";
import { uiAssets } from "@/app-shell/components/assets";
import { NavbarLanguageSelector } from "@/app-shell/components/navbar/navbar-language-selector";
import { SearchBox } from "@/app-shell/components/search-box";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { catalogPageStyles as styles } from "../catalog-page.styles";

export const DesktopCatalogNavbar = observer(() => {
  const { t } = useTranslation();
  const container = useContainer();
  const appStore = container.get(AppStore);
  const favoritesStore = container.get(FavoritesStore);

  return (
    <header {...stylex.props(styles.desktopNavbar)}>
      <Link
        {...stylex.props(styles.desktopBrand)}
        href="/"
        aria-label={t("common.home")}
      >
        {t("common.brand")}
      </Link>

      <div {...stylex.props(styles.desktopNavbarMain)}>
        <Link
          {...stylex.props(styles.desktopCatalogButton)}
          href="/"
          aria-label={t("common.closeCatalog")}
        >
          <Image
            {...stylex.props(iconStyles.icon)}
            src={uiAssets.closeWhite}
            alt=""
            width={24}
            height={24}
          />
          <span>{t("common.catalog")}</span>
        </Link>

        <div {...stylex.props(styles.desktopSearchBox)}>
          <SearchBox />
        </div>
      </div>

      <div {...stylex.props(styles.desktopNavbarRight)}>
        <div {...stylex.props(styles.desktopActionButtons)}>
          <Link
            {...stylex.props(controlStyles.iconButton)}
            href="/favorites"
            aria-label={t("navbar.favoritesLabel", {
              count: favoritesStore.count,
            })}
          >
            <Image
              {...stylex.props(iconStyles.icon)}
              src={uiAssets.heart}
              alt=""
              width={24}
              height={24}
            />
            {favoritesStore.count > 0 && (
              <span {...stylex.props(controlStyles.badge)}>
                {favoritesStore.count}
              </span>
            )}
          </Link>

          <button
            {...stylex.props(controlStyles.iconButton)}
            type="button"
            aria-label={t("common.menu")}
          >
            <Image
              {...stylex.props(iconStyles.icon)}
              src={uiAssets.list}
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>

        <span
          {...stylex.props(controlStyles.verticalDivider)}
          aria-hidden="true"
        />

        <NavbarLanguageSelector appStore={appStore} />
      </div>
    </header>
  );
});
