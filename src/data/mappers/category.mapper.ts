import type { Category as CategoryDto } from '@/data/openapi/models'
import type { Category } from '@/domain/entities'

const toEntity = (category: CategoryDto): Category => {
  const subCategories =
    category.subCategories?.map((subCategory) =>
      toEntity(subCategory),
    ) ?? []

  return {
    id: category.id,
    title: category.label,
    imageSrc: category.imageUrl ?? '',
    type: category.type,
    ...(subCategories.length > 0 ? { subCategories } : {}),
  }
}

export const CategoryDtoToCategoryEntityMapperExtension = {
  toEntity,
}
