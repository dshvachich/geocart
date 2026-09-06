"use client";

import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import type { SearchFilter } from "@/domain/entities";
import type { SearchQueryParams } from "@/utils/search-query-utils";
import { CollapsedFilter } from "./collapsed-filter";
import { FilterGroupStore } from "./filter-group.store";
import { RangeFilter } from "./range-filter";
import { SelectableFilter } from "./selectable-filter";

type FilterGroupProps = {
  filter: SearchFilter;
  path?: string;
  searchParams: SearchQueryParams;
};

const FilterGroupView = ({ filter, path, searchParams }: FilterGroupProps) => {
  const filterGroupStore = useMemo(
    () => new FilterGroupStore(filter.type !== "collapsed"),
    [filter.type],
  );

  if (filter.type === "range") {
    return (
      <RangeFilter
        filter={filter}
        isExpanded={filterGroupStore.isExpanded}
        onToggle={filterGroupStore.toggleExpanded}
        searchParams={searchParams}
      />
    );
  }

  if (filter.type === "checkbox" || filter.type === "toggle") {
    return (
      <SelectableFilter
        filter={filter}
        isExpanded={filterGroupStore.isExpanded}
        onToggle={filterGroupStore.toggleExpanded}
        path={path}
        searchParams={searchParams}
      />
    );
  }

  return <CollapsedFilter filter={filter} searchParams={searchParams} />;
};

export const FilterGroup = observer(FilterGroupView);
