"use client";

import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { SectionLoader } from "@/app-shell/components/section-loader";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { FiltersTopbar } from "./components/filters-topbar";
import { searchFiltersPageStyles } from "./search-filters-page.styles";
import { searchFiltersLoadingPageStyles as styles } from "./search-filters-loading-page.styles";

type SearchFiltersLoadingPageProps = {
  searchParams: SearchQueryParams;
};

export const SearchFiltersLoadingPage = ({
  searchParams,
}: SearchFiltersLoadingPageProps) => {
  const { t } = useTranslation();

  return (
    <main {...stylex.props(searchFiltersPageStyles.page, styles.page)}>
      <FiltersTopbar searchParams={searchParams} />
      <SectionLoader label={t("search.loadingFilters")} />
    </main>
  );
};
