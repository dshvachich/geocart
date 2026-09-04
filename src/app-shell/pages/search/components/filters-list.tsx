import * as stylex from "@stylexjs/stylex";
import type { SearchFilter } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { searchFiltersPageStyles as styles } from "../search-filters-page.styles";
import { FilterGroup } from "./filter-group";

type FiltersListProps = {
  filters: SearchFilter[];
  searchParams: SearchQueryParams;
};

export const FiltersList = ({ filters, searchParams }: FiltersListProps) => (
  <div {...stylex.props(styles.list)}>
    {filters.map((filter) => (
      <FilterGroup key={filter.id} filter={filter} searchParams={searchParams} />
    ))}
  </div>
);
