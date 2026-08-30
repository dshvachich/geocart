import cn from 'classnames'
import Image from 'next/image'
import type { Product } from '@/domain/entities'
import { formatOffers, formatPrice } from '@/utils/string-utils'
import { uiAssets } from './assets'

type ProductCardProps = {
  product: Product
  priority?: boolean
}

export const ProductCard = ({ product, priority = false }: ProductCardProps) => (
  <article className={cn('product-card', { 'cover-image': product.imageFit === 'cover' })}>
    <div className="product-media">
      <span className="product-image-frame">
        <Image
          className="product-image"
          src={product.imageSrc}
          alt={product.name}
          fill
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 760px) 50vw, 220px"
        />
      </span>

      {product.isNew && <span className="product-tag">New</span>}

      <button className="favorite-button" type="button" aria-label={`Add ${product.name} to favorites`}>
        <Image className="favorite-shape" src={uiAssets.favoriteShape} alt="" width={24} height={22} />
        <Image
          className="favorite-heart"
          src={product.isFavorite ? uiAssets.heartFilled : uiAssets.heartOutline}
          alt=""
          width={18}
          height={16}
        />
      </button>

      <div className="image-indicators" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span className={cn('image-indicator', { active: index === 0 })} key={index} />
        ))}
      </div>
    </div>

    <div className="product-content">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{formatPrice(product.price, product.currency)}</p>
      <p className="product-offers">{formatOffers(product.offers)}</p>
    </div>
  </article>
)
