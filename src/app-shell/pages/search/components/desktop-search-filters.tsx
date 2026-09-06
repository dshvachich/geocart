import * as stylex from "@stylexjs/stylex";
import type { SearchFilter } from "@/domain/entities";
import {
  SEARCH_PAGE_PATH,
  type SearchQueryParams,
} from "@/utils/search-query-utils";
import { searchPageStyles as styles } from "../search-page.styles";
import { FilterGroup } from "./filter-group";

type DesktopSearchFiltersProps = {
  filters: SearchFilter[];
  searchParams: SearchQueryParams;
};

export const DesktopSearchFilters = ({
  filters,
  searchParams,
}: DesktopSearchFiltersProps) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <aside {...stylex.props(styles.desktopFilters)}>
      {filters.map((filter) => (
        <FilterGroup
          key={filter.id}
          filter={filter}
          path={SEARCH_PAGE_PATH}
          searchParams={searchParams}
        />
      ))}
    </aside>
  );
};
