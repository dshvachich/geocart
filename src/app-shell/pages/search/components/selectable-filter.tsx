import * as stylex from "@stylexjs/stylex";
import type { SearchFilter } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { filtersPageStyles as styles } from "../filters-page.styles";
import { FilterHeader } from "./filter-header";
import { FilterTag } from "./filter-tag";

type SelectableFilterProps = {
  filter: SearchFilter;
  searchParams: SearchQueryParams;
};

export const SelectableFilter = ({
  filter,
  searchParams,
}: SelectableFilterProps) => {
  if (filter.type === "range" || filter.type === "collapsed") {
    return null;
  }

  return (
    <section {...stylex.props(styles.filterGroup)}>
      <FilterHeader filter={filter} />
      <div {...stylex.props(styles.filterBody, styles.filterBodyWithTags)}>
        <div {...stylex.props(styles.tags)}>
          {filter.variants.map((option) => (
            <FilterTag
              key={option.value}
              filter={filter}
              option={option}
              searchParams={searchParams}
            />
          ))}
        </div>
      </div>
      <div {...stylex.props(styles.divider)} />
    </section>
  );
};
