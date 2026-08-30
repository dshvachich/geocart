import Image from 'next/image'
import type { Banner } from '@/domain/entities'
import { formatPrice } from '@/utils/string-utils'
import { uiAssets } from './assets'

type HeroCarouselProps = {
  banner: Banner
}

const dots = [
  { src: uiAssets.dotSmall, size: 4 },
  { src: uiAssets.dotSmall, size: 4 },
  { src: uiAssets.dotMedium, size: 6 },
  { src: uiAssets.dotLarge, size: 8 },
  { src: uiAssets.dotMedium, size: 6 },
  { src: uiAssets.dotSmall, size: 4 },
  { src: uiAssets.dotSmall, size: 4 },
]

export const HeroCarousel = ({ banner }: HeroCarouselProps) => (
  <section className="page-section hero-safe-area" aria-label="Featured product">
    <div className="content-rail hero-carousel" style={{ backgroundImage: `url(${banner.imageSrc})` }}>
      <div className="hero-content">
        <div>
          <p className="hero-kicker">{banner.kicker}</p>
          <h1 className="hero-title">Make every move a healthy one</h1>
        </div>
        <button className="price-button" type="button">
          {formatPrice(banner.price, banner.currency)}
        </button>
      </div>

      <div className="hero-controls" aria-label="Carousel controls">
        <button className="icon-button hero-arrow" type="button" aria-label="Previous product">
          <Image className="icon" src={uiAssets.arrowLeft} alt="" width={24} height={24} />
        </button>
        <button className="icon-button hero-arrow hero-arrow-next" type="button" aria-label="Next product">
          <Image className="icon" src={uiAssets.arrowRight} alt="" width={24} height={24} />
        </button>
      </div>

      <div className="carousel-dots" aria-hidden="true">
        {dots.map((dot, index) => (
          <Image
            className="dot-asset"
            key={`${dot.src}-${index}`}
            src={dot.src}
            alt=""
            width={dot.size}
            height={dot.size}
          />
        ))}
      </div>
    </div>
  </section>
)
