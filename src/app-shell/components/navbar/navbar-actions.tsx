import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import type { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { ComparisonStore } from "@/app-shell/stores/comparison.store";
import { useContainer } from "@/di/di-provider";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import { navbarStyles as styles } from "./navbar.styles";

type NavbarActionsProps = {
  favoritesStore: FavoritesStore;
};

export const NavbarActions = observer(({ favoritesStore }: NavbarActionsProps) => {
  const { t } = useTranslation();
  const comparison = useContainer().get(ComparisonStore);

  return (
    <div {...stylex.props(styles.navbarActions)}>
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
      <Link
        {...stylex.props(controlStyles.iconButton)}
        href="/compare"
        aria-label={t("compare.navLabel", { count: comparison.count })}
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.list}
          alt=""
          width={24}
          height={24}
        />
        {comparison.count > 0 && <span {...stylex.props(controlStyles.badge)}>{comparison.count}</span>}
      </Link>
    </div>
  );
});
