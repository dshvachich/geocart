import type { SearchResponse as SearchResponseDto } from '@/data/openapi/models'
import type { Product, SearchResult } from '@/domain/entities'
import { ProductListItemToProductMapperExtension } from './product-list-item.mapper'
import { SearchCategoryDtoToSearchCategoryEntityMapperExtension } from './search-category.mapper'
import { SearchFilterDtoToSearchFilterEntityMapperExtension } from './search-filter.mapper'

export const SearchResponseDtoToSearchResultEntityMapperExtension = {
  toEntity(
    response: SearchResponseDto,
    fallbackProducts: Product[],
  ): SearchResult {
    return {
      title: response.title,
      products: response.products.map((product, index) =>
        ProductListItemToProductMapperExtension.toEntity(
          product,
          fallbackProducts[index % fallbackProducts.length],
        ),
      ),
      filters: response.filters.map((filter) =>
        SearchFilterDtoToSearchFilterEntityMapperExtension.toEntity(filter),
      ),
      categories: response.categories.map((category) =>
        SearchCategoryDtoToSearchCategoryEntityMapperExtension.toEntity(
          category,
        ),
      ),
      next: response.next,
    }
  },
}
