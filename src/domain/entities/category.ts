export type Category = {
  id: string
  type?: 'normal' | 'button'
  title: string
  imageSrc: string
  subCategories?: Category[]
}
