import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import {
  controlStyles,
  iconStyles,
  layoutStyles,
} from "@/app-shell/styles/shared.styles";
import type { Category } from "@/domain/entities";
import { createCatalogHref } from "../catalog-page.helpers";
import { catalogPageStyles as styles } from "../catalog-page.styles";
import { CatalogSearchLink } from "./catalog-search-link";

type MobileDetailToolbarProps = {
  parentCategory?: Category;
};

export const MobileDetailToolbar = ({
  parentCategory,
}: MobileDetailToolbarProps) => {
  const { t } = useTranslation();

  return (
    <header {...stylex.props(styles.mobileDetailHeader)}>
      <div
        {...stylex.props(layoutStyles.contentRail, styles.mobileDetailToolbar)}
      >
        <Link
          {...stylex.props(controlStyles.iconButton)}
          href={createCatalogHref(parentCategory?.id)}
          aria-label={t("common.back")}
        >
          <Image
            {...stylex.props(iconStyles.icon)}
            src={uiAssets.arrowLeft}
            alt=""
            width={24}
            height={24}
          />
        </Link>

        <CatalogSearchLink />

        <Link
          {...stylex.props(controlStyles.iconButton)}
          href="/"
          aria-label={t("common.closeCatalog")}
        >
          <Image
            {...stylex.props(iconStyles.icon)}
            src={uiAssets.close}
            alt=""
            width={24}
            height={24}
          />
        </Link>
      </div>
    </header>
  );
};
