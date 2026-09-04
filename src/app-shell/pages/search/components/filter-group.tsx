import type { SearchFilter } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { CollapsedFilter } from "./collapsed-filter";
import { RangeFilter } from "./range-filter";
import { SelectableFilter } from "./selectable-filter";

type FilterGroupProps = {
  filter: SearchFilter;
  searchParams: SearchQueryParams;
};

export const FilterGroup = ({ filter, searchParams }: FilterGroupProps) => {
  if (filter.type === "range") {
    return <RangeFilter filter={filter} searchParams={searchParams} />;
  }

  if (filter.type === "checkbox" || filter.type === "toggle") {
    return <SelectableFilter filter={filter} searchParams={searchParams} />;
  }

  return <CollapsedFilter filter={filter} searchParams={searchParams} />;
};
