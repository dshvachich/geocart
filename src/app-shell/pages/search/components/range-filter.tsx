import * as stylex from "@stylexjs/stylex";
import { formatSearchRangeFilterValue } from "@/domain/helpers/search-filter.helpers";
import type { SearchFilter } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { filtersPageStyles as styles } from "../filters-page.styles";
import { FilterHeader } from "./filter-header";

type RangeFilterProps = {
  filter: SearchFilter;
  searchParams: SearchQueryParams;
};

export const RangeFilter = ({ filter }: RangeFilterProps) => {
  if (filter.type !== "range") {
    return null;
  }

  return (
    <section {...stylex.props(styles.filterGroup)}>
      <FilterHeader filter={filter} />
      <div {...stylex.props(styles.filterBody)}>
        <div {...stylex.props(styles.rangePair)}>
          <div {...stylex.props(styles.inputValue)}>
            From {formatSearchRangeFilterValue(filter, filter.selectedMin)}
          </div>
          <div {...stylex.props(styles.inputValue, styles.mutedInputValue)}>
            To {formatSearchRangeFilterValue(filter, filter.selectedMax)}
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.divider)} />
    </section>
  );
};
