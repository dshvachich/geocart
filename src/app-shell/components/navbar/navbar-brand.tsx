import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { navbarStyles as styles } from "./navbar.styles";

type NavbarBrandProps = {
  isCompact: boolean;
};

export const NavbarBrand = ({ isCompact }: NavbarBrandProps) => (
  <Link
    {...stylex.props(styles.brandLogo, isCompact && styles.compactHidden)}
    href="/"
    aria-label="Geocart home"
  >
    Geocart
  </Link>
);
