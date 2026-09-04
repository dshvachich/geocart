import type { Category as CategoryDto } from '@/data/openapi/models'
import type { Category } from '@/domain/entities'

const toEntity = (
  category: CategoryDto,
  fallbackCategory?: Category,
): Category => {
  const subCategories =
    category.subCategories?.map((subCategory, index) =>
      toEntity(subCategory, fallbackCategory?.subCategories?.[index]),
    ) ?? []

  return {
    id: category.id,
    title: category.label,
    imageSrc: category.imageUrl ?? fallbackCategory?.imageSrc ?? '',
    type: category.type,
    ...(subCategories.length > 0 ? { subCategories } : {}),
  }
}

export const CategoryDtoToCategoryEntityMapperExtension = {
  toEntity,
}
