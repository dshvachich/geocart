import * as stylex from "@stylexjs/stylex";
import { SearchBox } from "@/app-shell/components/search-box";
import { navbarStyles as styles } from "./navbar.styles";
import { NavbarCatalogLink } from "./navbar-catalog-link";

export const NavbarMain = () => (
  <div {...stylex.props(styles.navbarMain)}>
    <NavbarCatalogLink />
    <SearchBox />
  </div>
);
