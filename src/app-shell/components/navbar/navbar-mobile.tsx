import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { NavbarBrand } from "./navbar-brand";
import { NavbarMain } from "./navbar-main";
import { NavbarRight } from "./navbar-right";
import { navbarStyles as styles } from "./navbar.styles";

type NavbarMobileProps = {
  isCompact: boolean;
  hideSearch?: boolean;
};

export const NavbarMobile = ({ isCompact, hideSearch = false }: NavbarMobileProps) => (
  <div {...stylex.props(styles.mobileNavbar)}>
    <div
      {...stylex.props(
        layoutStyles.contentRail,
        styles.mobileNavbarTop,
        isCompact && styles.mobileNavbarTopCompact,
      )}
    >
      <NavbarBrand />
      <NavbarRight />
    </div>

    {!hideSearch && <div {...stylex.props(layoutStyles.contentRail, styles.mobileNavbarMain)}>
      <NavbarMain />
    </div>}
  </div>
);
