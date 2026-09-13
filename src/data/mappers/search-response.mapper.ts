import type { SearchResponse as SearchResponseDto } from '@/data/openapi/models'
import type { SearchResult } from '@/domain/entities'
import { SearchProductListItemToProductMapperExtension } from '@/data/mappers/search-product-list-item.mapper'
import { SearchCategoryDtoToSearchCategoryEntityMapperExtension } from './search-category.mapper'
import { SearchFilterDtoToSearchFilterEntityMapperExtension } from './search-filter.mapper'

export const SearchResponseDtoToSearchResultEntityMapperExtension = {
  toEntity(response: SearchResponseDto): SearchResult {
    return {
      title: response.title,
      products: response.products.map((product) =>
        SearchProductListItemToProductMapperExtension.toEntity(product),
      ),
      filters: response.filters.map((filter) =>
        SearchFilterDtoToSearchFilterEntityMapperExtension.toEntity(filter),
      ),
      categories: response.categories.map((category) =>
        SearchCategoryDtoToSearchCategoryEntityMapperExtension.toEntity(
          category,
        ),
      ),
      cursor: response.cursor,
    }
  },
}
