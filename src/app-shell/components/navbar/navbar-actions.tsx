import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "@/app-shell/components/assets";
import type { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import { navbarStyles as styles } from "./navbar.styles";

type NavbarActionsProps = {
  favoritesStore: FavoritesStore;
};

export const NavbarActions = ({ favoritesStore }: NavbarActionsProps) => (
  <div {...stylex.props(styles.navbarActions)}>
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
);
