import * as stylex from "@stylexjs/stylex";
import type { SearchFilter } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { searchFiltersPageStyles as styles } from "../search-filters-page.styles";
import { FilterHeader } from "./filter-header";

type CollapsedFilterProps = {
  filter: SearchFilter;
  searchParams: SearchQueryParams;
};

export const CollapsedFilter = ({ filter }: CollapsedFilterProps) => {
  if (filter.type !== "collapsed") {
    return null;
  }

  return (
    <section {...stylex.props(styles.filterGroup)}>
      <FilterHeader
        filter={filter}
        isExpanded={false}
        onToggle={() => undefined}
      />
      <div {...stylex.props(styles.divider)} />
    </section>
  );
};
