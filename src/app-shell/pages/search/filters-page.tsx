import * as stylex from "@stylexjs/stylex";
import type { SearchFiltersPageData } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { FiltersList } from "./components/filters-list";
import { FiltersTopbar } from "./components/filters-topbar";
import { filtersPageStyles as styles } from "./filters-page.styles";

type FiltersPageProps = {
  data: SearchFiltersPageData;
  searchParams: SearchQueryParams;
};

export const FiltersPage = ({ data, searchParams }: FiltersPageProps) => (
  <main {...stylex.props(styles.page)}>
    <FiltersTopbar searchParams={searchParams} />
    <FiltersList filters={data.filters} searchParams={searchParams} />
  </main>
);
