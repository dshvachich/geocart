import type { Product } from '@/domain/entities'
import { ProductCard } from './product-card'

type ProductGridProps = {
  products: Product[]
}

export const ProductGrid = ({ products }: ProductGridProps) => (
  <section className="page-section" aria-labelledby="popular-products-title">
    <div className="content-rail section-header">
      <h2 className="section-title" id="popular-products-title">
        Popular products
      </h2>
    </div>
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 6} />
      ))}
    </div>
  </section>
)
