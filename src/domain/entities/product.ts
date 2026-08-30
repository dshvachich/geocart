export type Product = {
  id: string
  name: string
  price: number
  currency: string
  offers: number
  imageSrc: string
  isNew?: boolean
  isFavorite?: boolean
  imageFit?: 'contain' | 'cover'
}
