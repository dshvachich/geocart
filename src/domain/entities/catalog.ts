export type CatalogBreadcrumb = {
  id: string
  title: string
}

export type CatalogActiveFilter = {
  id: string
  title: string
  count?: number
}

export type CatalogQuickCategory = {
  id: string
  title: string
  imageSrc: string
  isSelected?: boolean
}

export type CatalogSortOption = {
  id: string
  title: string
  isSelected?: boolean
}

export type CatalogFilterOption = {
  id: string
  title: string
  isSelected?: boolean
}

export type CatalogRangeFilter = {
  id: string
  title: string
  type: 'range'
  from: string
  to: string
  isExpanded?: boolean
}

export type CatalogSelectableFilter = {
  id: string
  title: string
  type: 'selectable'
  options: CatalogFilterOption[]
  showMoreLabel?: string
  isExpanded?: boolean
}

export type CatalogCollapsedFilter = {
  id: string
  title: string
  type: 'collapsed'
}

export type CatalogFilter =
  | CatalogRangeFilter
  | CatalogSelectableFilter
  | CatalogCollapsedFilter
