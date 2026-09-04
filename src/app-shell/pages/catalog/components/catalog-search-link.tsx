import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { iconStyles } from "@/app-shell/styles/shared.styles";
import { createSearchHref } from "@/utils/search-query-utils";
import { catalogPageStyles as styles } from "../catalog-page.styles";

export const CatalogSearchLink = () => {
  const { t } = useTranslation();

  return (
    <Link
      {...stylex.props(styles.searchField)}
      href={createSearchHref({})}
      aria-label={t("common.search")}
    >
      <Image
        {...stylex.props(iconStyles.icon)}
        src={uiAssets.search}
        alt=""
        width={24}
        height={24}
      />
      <span {...stylex.props(styles.searchPlaceholder)}>
        {t("common.search")}
      </span>
    </Link>
  );
};
