import {
  SearchFilterRangeType,
  SearchFilterSelectableType,
  type SearchFilter as SearchFilterDto,
  type SearchFilterRange as SearchRangeFilterDto,
  type SearchFilterSelectable as SearchSelectableFilterDto,
} from '@/data/openapi/models'
import type { SearchFilter } from '@/domain/entities'

const isRangeFilter = (
  filter: SearchFilterDto,
): filter is SearchRangeFilterDto => filter.type === SearchFilterRangeType.range

const isSelectableFilter = (
  filter: SearchFilterDto,
): filter is SearchSelectableFilterDto =>
  filter.type === SearchFilterSelectableType.checkbox ||
  filter.type === SearchFilterSelectableType.toggle

export const SearchFilterDtoToSearchFilterEntityMapperExtension = {
  toEntity(filter: SearchFilterDto): SearchFilter {
    if (isRangeFilter(filter)) {
      return {
        type: filter.type,
        id: filter.id,
        label: filter.label,
        min: filter.min,
        max: filter.max,
        selectedMin: filter.selectedMin,
        selectedMax: filter.selectedMax,
      }
    }

    if (isSelectableFilter(filter)) {
      return {
        type: filter.type,
        id: filter.id,
        label: filter.label,
        variants: filter.variants.map((variant) => ({
          value: variant.value,
          label: variant.label,
          selected: variant.selected,
        })),
      }
    }

    const fallbackFilter = filter as { id: string; label: string }

    return {
      type: 'collapsed',
      id: fallbackFilter.id,
      label: fallbackFilter.label,
    }
  },
}
