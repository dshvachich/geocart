import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import { navbarStyles as styles } from "./navbar.styles";

export const NavbarCatalogLink = () => {
  const { t } = useTranslation();

  return (
    <Link
      {...stylex.props(styles.catalogButton)}
      href="/catalog"
      aria-label={t("common.catalog")}
    >
      <span
        {...stylex.props(styles.catalogIconSlot, styles.catalogIconDefault)}
        aria-hidden="true"
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.catalog}
          alt=""
          width={24}
          height={24}
        />
      </span>
      <span
        {...stylex.props(styles.catalogIconSlot, styles.catalogIconMuted)}
        aria-hidden="true"
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.catalogMuted}
          alt=""
          width={24}
          height={24}
        />
      </span>
      <span {...stylex.props(styles.catalogLabel)}>{t("common.catalog")}</span>
    </Link>
  );
};
