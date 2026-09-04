import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "@/app-shell/components/assets";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import {
  createSearchHref,
  type SearchQueryParams,
} from "@/utils/search-query-utils";
import { searchFiltersPageStyles as styles } from "../search-filters-page.styles";

type FiltersTopbarProps = {
  searchParams: SearchQueryParams;
};

export const FiltersTopbar = ({ searchParams }: FiltersTopbarProps) => {
  const { t } = useTranslation();

  return (
    <header {...stylex.props(styles.topbar)}>
      <h1 {...stylex.props(styles.title)}>{t("search.filters")}</h1>
      <Link
        {...stylex.props(controlStyles.iconButton, styles.closeButton)}
        href={createSearchHref(searchParams)}
        aria-label={t("common.closeFilters")}
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.close}
          alt=""
          width={24}
          height={24}
        />
      </Link>
    </header>
  );
};
