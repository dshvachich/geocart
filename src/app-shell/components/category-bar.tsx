import Image from 'next/image'
import type { Category } from '@/domain/entities'
import { uiAssets } from './assets'

type CategoryBarProps = {
  categories: Category[]
}

export const CategoryBar = ({ categories }: CategoryBarProps) => (
  <section className="page-section" aria-label="Categories">
    <div className="content-rail category-bar">
      {categories.map((category) => (
        <button className="category-button" key={category.id} type="button">
          <span className="category-illustration" aria-hidden="true">
            <Image className="category-shape" src={uiAssets.categoryShape} alt="" width={96} height={96} />
            <Image className="category-image" src={category.imageSrc} alt="" width={140} height={140} />
          </span>
          <span className="category-title">{category.title}</span>
        </button>
      ))}
    </div>
  </section>
)
