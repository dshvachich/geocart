import { observer } from "mobx-react-lite";
import * as stylex from "@stylexjs/stylex";
import { AppStore } from "@/app-shell/app-store";
import { FavoritesStore } from "@/app-shell/stores/favorites.store";
import { controlStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { NavbarActions } from "./navbar-actions";
import { NavbarLanguageSelector } from "./navbar-language-selector";
import { navbarStyles as styles } from "./navbar.styles";

export const NavbarRight = observer(() => {
  const container = useContainer();
  const appStore = container.get(AppStore);
  const favoritesStore = container.get(FavoritesStore);

  return (
    <div {...stylex.props(styles.navbarRight)}>
      <NavbarActions favoritesStore={favoritesStore} />

      <span
        {...stylex.props(controlStyles.verticalDivider, styles.actionsDivider)}
        aria-hidden="true"
      />

      <NavbarLanguageSelector appStore={appStore} />
    </div>
  );
});
