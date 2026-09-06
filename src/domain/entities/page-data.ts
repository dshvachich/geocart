import type { Category } from './category'
import type { PageCursor } from './pagination'
import type { Product } from './product'
import type {
  SearchActiveFilter,
  SearchBreadcrumb,
  SearchCategory,
  SearchFilter,
  SearchSortOption,
} from './search'

export type HomePageData = {
  categories: Category[]
  cursor: PageCursor
  products: Product[]
}

export type CatalogPageData = {
  categories: Category[]
}

export type SearchPageData = {
  activeFilters: SearchActiveFilter[]
  breadcrumbs: SearchBreadcrumb[]
  eyebrow: string
  filters: SearchFilter[]
  hasMoreProducts: boolean
  products: Product[]
  quickCategories: SearchCategory[]
  selectedCategoryId?: string
  sortOptions: SearchSortOption[]
  title: string
}

export type SearchFiltersPageData = {
  filters: SearchFilter[]
  selectedCategoryId?: string
}
