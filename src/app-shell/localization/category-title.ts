type Translate = (
  key: string,
  options?: {
    defaultValue?: string
  },
) => string

type CategoryLike = {
  id: string
  label?: string
  title?: string
}

export const getLocalizedCategoryTitle = (
  t: Translate,
  category: CategoryLike,
) =>
  t(`categories.${category.id}`, {
    defaultValue: category.title ?? category.label ?? category.id,
  })
