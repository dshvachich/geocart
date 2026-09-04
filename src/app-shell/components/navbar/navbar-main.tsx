import * as stylex from "@stylexjs/stylex";
import { SearchBox } from "@/app-shell/components/search-box";
import { navbarStyles as styles } from "./navbar.styles";
import { NavbarCatalogLink } from "./navbar-catalog-link";

type NavbarMainProps = {
  isCompact: boolean;
};

export const NavbarMain = ({ isCompact }: NavbarMainProps) => (
  <div
    {...stylex.props(
      styles.navbarMain,
      isCompact && styles.compactNavbarMain,
    )}
  >
    <NavbarCatalogLink />
    <SearchBox />
  </div>
);
