import type { SearchCategory as SearchCategoryDto } from '@/data/openapi/models'
import type { SearchCategory } from '@/domain/entities'

export const SearchCategoryDtoToSearchCategoryEntityMapperExtension = {
  toEntity(category: SearchCategoryDto): SearchCategory {
    return {
      id: category.id,
      label: category.label,
      selected: category.selected,
      imageSrc: category.imageUrl,
    }
  },
}
