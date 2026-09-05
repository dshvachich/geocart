import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { NavbarBrand } from "./navbar-brand";
import { NavbarMain } from "./navbar-main";
import { NavbarRight } from "./navbar-right";
import { navbarStyles as styles } from "./navbar.styles";

export const NavbarDesktop = () => (
  <div {...stylex.props(layoutStyles.contentRail, styles.navbar)}>
    <NavbarBrand />
    <NavbarMain />
    <NavbarRight />
  </div>
);
