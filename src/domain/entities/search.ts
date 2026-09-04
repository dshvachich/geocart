import type { Product } from './product'

export type SearchBreadcrumb = {
  id: string
  title: string
}

export type SearchActiveFilter = {
  id: string
  paramKey: string
  paramValue?: string
  title: string
  count?: number
}

export type SearchCategory = {
  id: string
  label: string
  selected: boolean
  imageSrc?: string
}

export type SearchSortOption = {
  id: string
  title: string
  sort: 'popularity' | 'price'
  sortOrder: 'asc' | 'desc'
  isSelected?: boolean
}

export type SearchFilterVariant = {
  value: string
  label?: string
  selected: boolean
}

export type SearchRangeFilter = {
  type: 'range'
  id: string
  label: string
  min: number
  max: number
  selectedMin: number
  selectedMax: number
}

export type SearchSelectableFilter = {
  type: 'checkbox' | 'toggle'
  id: string
  label: string
  variants: SearchFilterVariant[]
}

export type SearchCollapsedFilter = {
  type: 'collapsed'
  id: string
  label: string
}

export type SearchFilter =
  | SearchRangeFilter
  | SearchSelectableFilter
  | SearchCollapsedFilter

export type SearchResult = {
  title: string
  products: Product[]
  filters: SearchFilter[]
  categories: SearchCategory[]
  next: string | null
}
