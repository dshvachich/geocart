import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { navbarStyles as styles } from "./navbar.styles";

export const NavbarBrand = () => {
  const { t } = useTranslation();

  return (
    <Link
      {...stylex.props(styles.brandLogo)}
      href="/"
      aria-label={t("navbar.homeLabel")}
    >
      {t("common.brand")}
    </Link>
  );
};
