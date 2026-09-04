"use client";

import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { AppStore } from "@/app-shell/app-store";
import { uiAssets } from "@/app-shell/components/assets";
import { SearchBox } from "@/app-shell/components/search-box";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { HeaderDropdown } from "./header-dropdown";

export const DesktopCatalogNavbar = observer(() => {
  const container = useContainer();
  const appStore = container.get(AppStore);
  const favoritesStore = container.get(FavoritesStore);

  return (
    <header {...stylex.props(styles.desktopNavbar)}>
      <Link {...stylex.props(styles.desktopBrand)} href="/" aria-label="Home">
        Geocart
      </Link>

      <div {...stylex.props(styles.desktopNavbarMain)}>
        <Link
          {...stylex.props(styles.desktopCatalogButton)}
          href="/"
          aria-label="Close catalog"
        >
          <Image
            {...stylex.props(iconStyles.icon)}
            src={uiAssets.closeWhite}
            alt=""
            width={24}
            height={24}
          />
          <span>Catalog</span>
        </Link>

        <div {...stylex.props(styles.desktopSearchBox)}>
          <SearchBox />
        </div>
      </div>

      <div {...stylex.props(styles.desktopNavbarRight)}>
        <HeaderDropdown
          icon={uiAssets.location}
          label={appStore.location.city}
        />

        <span
          {...stylex.props(controlStyles.verticalDivider)}
          aria-hidden="true"
        />

        <div {...stylex.props(styles.desktopActionButtons)}>
          <Link
            {...stylex.props(controlStyles.iconButton)}
            href="/favorites"
            aria-label={`Favorites (${favoritesStore.count})`}
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
            aria-label="Menu"
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

        <HeaderDropdown icon={uiAssets.globe} label={appStore.language} />
      </div>
    </header>
  );
});
