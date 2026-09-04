"use client";

import * as stylex from "@stylexjs/stylex";
import type { SearchFiltersPageData } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { FiltersList } from "./components/filters-list";
import { FiltersTopbar } from "./components/filters-topbar";
import { searchFiltersPageStyles as styles } from "./search-filters-page.styles";

type SearchFiltersPageProps = {
  data: SearchFiltersPageData;
  searchParams: SearchQueryParams;
};

export const SearchFiltersPage = ({
  data,
  searchParams,
}: SearchFiltersPageProps) => (
  <main {...stylex.props(styles.page)}>
    <FiltersTopbar searchParams={searchParams} />
    <FiltersList filters={data.filters} searchParams={searchParams} />
  </main>
);
