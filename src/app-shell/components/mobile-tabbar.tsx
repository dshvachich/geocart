import Image from 'next/image'
import cn from 'classnames'
import { uiAssets } from './assets'

const tabbarItems = [
  {
    label: 'Home',
    icon: uiAssets.home,
    isActive: true,
  },
  {
    label: 'Catalog',
    icon: uiAssets.catalogMuted,
  },
  {
    label: 'Favorites',
    icon: uiAssets.heart,
  },
  {
    label: 'Compare',
    icon: uiAssets.list,
  },
]

export const MobileTabbar = () => (
  <nav className="mobile-tabbar" aria-label="Primary navigation">
    {tabbarItems.map((item) => (
      <button
        className={cn('mobile-tabbar-item', { active: item.isActive })}
        key={item.label}
        type="button"
      >
        <Image src={item.icon} alt="" width={24} height={24} />
        <span>{item.label}</span>
      </button>
    ))}
  </nav>
)
