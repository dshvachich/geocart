import type {
  CatalogActiveFilter,
  CatalogBreadcrumb,
  CatalogFilter,
  CatalogQuickCategory,
  CatalogSortOption,
  Product,
} from '@/domain/entities'
import { catalogRepository } from '@/data/repositories'
import { geocartProducts } from '@/data/geocart-home'

const asset = (name: string) => `/assets/geocart/${name}`

const catalogBreadcrumbs: CatalogBreadcrumb[] = [
  {
    id: 'mobile-wearables',
    title: 'Mobile & Wearables',
  },
  {
    id: 'mobile-phones',
    title: 'Mobile Phones',
  },
  {
    id: 'apple',
    title: 'Apple',
  },
]

const activeFilters: CatalogActiveFilter[] = [
  {
    id: 'price-from',
    title: 'From 254 ₾',
  },
  {
    id: 'brand',
    title: 'Apple',
    count: 1,
  },
]

const quickCategories: CatalogQuickCategory[] = [
  {
    id: 'mobile-phones',
    title: 'Mobile Phones',
    imageSrc: asset('product-iphone-17-blue.png'),
    isSelected: true,
  },
  {
    id: 'headphones',
    title: 'Headphones',
    imageSrc: asset('product-airpods-max.png'),
  },
  {
    id: 'cases',
    title: 'Cases',
    imageSrc: asset('product-iphone-17-lavender.png'),
  },
]

const sortOptions: CatalogSortOption[] = [
  {
    id: 'popular',
    title: 'Popular',
  },
  {
    id: 'cheaper',
    title: 'Cheaper',
    isSelected: true,
  },
  {
    id: 'highest-rating',
    title: 'Highest rating',
  },
]

export const catalogFilters: CatalogFilter[] = [
  {
    id: 'price',
    title: 'Price, ₾',
    type: 'range',
    from: 'From 254 ₾',
    to: 'To 5254 ₾',
    isExpanded: true,
  },
  {
    id: 'brand',
    title: 'Brand',
    type: 'selectable',
    isExpanded: true,
    options: [
      {
        id: 'apple',
        title: 'Apple',
        isSelected: true,
      },
      {
        id: 'samsung',
        title: 'Samsung',
        isSelected: true,
      },
      {
        id: 'google',
        title: 'Google',
      },
      {
        id: 'xiaomi',
        title: 'Xiaomi',
      },
      {
        id: 'honor',
        title: 'Honor',
      },
    ],
    showMoreLabel: 'Show more',
  },
  {
    id: 'ram',
    title: 'RAM',
    type: 'selectable',
    isExpanded: true,
    options: [
      '2 GB',
      '3 GB',
      '4 GB',
      '6 GB',
      '8 GB',
      '12 GB',
      '16 GB',
      '20 GB',
    ].map((title) => ({
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
    })),
    showMoreLabel: '2 More',
  },
  {
    id: 'memory',
    title: 'Memory',
    type: 'selectable',
    isExpanded: true,
    options: ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'].map((title) => ({
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
    })),
    showMoreLabel: '2 More',
  },
  {
    id: 'display-size',
    title: 'Display size',
    type: 'collapsed',
  },
  {
    id: 'screen',
    title: 'Screen',
    type: 'collapsed',
  },
  {
    id: 'refresh-rate',
    title: 'Refresh rate',
    type: 'range',
    from: 'From 60',
    to: 'To 120',
    isExpanded: true,
  },
  {
    id: 'color',
    title: 'Color',
    type: 'collapsed',
  },
  {
    id: 'os',
    title: 'OS',
    type: 'collapsed',
  },
  {
    id: 'ip-protection',
    title: 'IP Protection',
    type: 'collapsed',
  },
]

type GetCatalogPageDataParams = {
  query?: string
}

export type CatalogPageData = {
  activeFilters: CatalogActiveFilter[]
  breadcrumbs: CatalogBreadcrumb[]
  eyebrow: string
  filters: CatalogFilter[]
  products: Product[]
  quickCategories: CatalogQuickCategory[]
  sortOptions: CatalogSortOption[]
  title: string
}

export type CatalogFiltersPageData = {
  filters: CatalogFilter[]
}

const getSearchTitle = (query: string) => `${query} in Tbilisi`

export const getCatalogPageData = async ({
  query,
}: GetCatalogPageDataParams = {}): Promise<CatalogPageData> => {
  const trimmedQuery = query?.trim() ?? ''
  const isSearchResult = trimmedQuery.length > 0
  const products = await catalogRepository.getCatalogProducts({
    category: isSearchResult ? undefined : 'apple-mobile-phones',
    fallbackProducts: geocartProducts,
    query: isSearchResult ? trimmedQuery : undefined,
  })

  return {
    activeFilters,
    breadcrumbs: isSearchResult ? [] : catalogBreadcrumbs,
    eyebrow: isSearchResult ? 'Search results' : '',
    filters: catalogFilters,
    products,
    quickCategories: isSearchResult ? quickCategories : [],
    sortOptions,
    title: isSearchResult
      ? getSearchTitle(trimmedQuery)
      : 'Apple Mobile Phones in Tbilisi',
  }
}

export const getCatalogFiltersPageData = (): CatalogFiltersPageData => ({
  filters: catalogFilters,
})
