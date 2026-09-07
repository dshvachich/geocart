import type {
  SearchActiveFilter,
  SearchFilter,
  SearchFilterVariant,
} from '@/domain/entities'

const PRICE_CURRENCY_SYMBOL = '₾'
const DEFAULT_RANGE_FROM_LABEL = 'From'
const DEFAULT_RANGE_TO_LABEL = 'To'
const TETRI_IN_GEL = 100

export type SearchRangeFormatLabels = {
  from: string
  to: string
}

export const isPriceSearchFilter = (filter: SearchFilter) =>
  filter.label.toLowerCase().includes('price') ||
  filter.label.includes(PRICE_CURRENCY_SYMBOL)

export const formatSearchRangeFilterValue = (
  filter: SearchFilter,
  value: number,
) => {
  if (filter.type !== 'range') {
    return String(value)
  }

  if (!isPriceSearchFilter(filter)) {
    return String(value)
  }

  const amount = value / TETRI_IN_GEL
  const formattedAmount = Number.isInteger(amount)
    ? String(amount)
    : amount.toFixed(2)

  return `${formattedAmount} ${PRICE_CURRENCY_SYMBOL}`
}

export const getSearchFilterVariantLabel = (
  variant: Pick<SearchFilterVariant, 'label' | 'value'>,
) => variant.label?.trim() || variant.value

export const getSearchRangeActiveFilterTitle = (
  filter: SearchFilter,
  labels: SearchRangeFormatLabels = {
    from: DEFAULT_RANGE_FROM_LABEL,
    to: DEFAULT_RANGE_TO_LABEL,
  },
) => {
  if (filter.type !== 'range') {
    return undefined
  }

  const hasSelectedMin = filter.selectedMin !== filter.min
  const hasSelectedMax = filter.selectedMax !== filter.max

  if (hasSelectedMin && hasSelectedMax) {
    return `${formatSearchRangeFilterValue(filter, filter.selectedMin)} - ${formatSearchRangeFilterValue(
      filter,
      filter.selectedMax,
    )}`
  }

  if (hasSelectedMin) {
    return `${labels.from} ${formatSearchRangeFilterValue(filter, filter.selectedMin)}`
  }

  if (hasSelectedMax) {
    return `${labels.to} ${formatSearchRangeFilterValue(filter, filter.selectedMax)}`
  }

  return undefined
}

export const getSearchActiveFilters = (
  filters: SearchFilter[],
  labels?: SearchRangeFormatLabels,
): SearchActiveFilter[] =>
  filters.flatMap((filter) => {
    if (filter.type === 'range') {
      const title = getSearchRangeActiveFilterTitle(filter, labels)

      if (!title) {
        return []
      }

      return [
        {
          id: filter.id,
          paramKey: filter.id,
          title,
        },
      ]
    }

    if (filter.type === 'collapsed') {
      return []
    }

    const selectedVariants = filter.variants.filter(
      (variant) => variant.selected,
    )

    if (selectedVariants.length === 0) {
      return []
    }

    return [
      {
        id: filter.id,
        paramKey: filter.id,
        title: getSearchFilterVariantLabel(selectedVariants[0]),
        count: Math.max(selectedVariants.length - 1, 0),
      },
    ]
  })
