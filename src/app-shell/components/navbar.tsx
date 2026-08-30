'use client'

import Image from 'next/image'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { AppStoreContext } from '@/app-shell/app-store'
import { uiAssets } from './assets'

export const Navbar = observer(() => {
  const appStore = useContext(AppStoreContext)

  return (
    <header className="page-section">
      <div className="content-rail navbar">
        <Link className="brand-logo" href="/" aria-label="Geocart home">
          Geocart
        </Link>

        <div className="navbar-main">
          <button className="catalog-button" type="button">
            <Image src={uiAssets.catalog} alt="" width={24} height={24} />
            <span>Catalog</span>
          </button>

          <label className="search-field" aria-label="Search products">
            <Image src={uiAssets.search} alt="" width={24} height={24} />
            <input placeholder="Search products" />
          </label>
        </div>

        <div className="navbar-right">
          <button className="inline-control" type="button">
            <Image className="icon" src={uiAssets.location} alt="" width={24} height={24} />
            <span>{appStore.location.city}</span>
            <Image className="icon-small" src={uiAssets.caret} alt="" width={12} height={12} />
          </button>

          <span className="vertical-divider" aria-hidden="true" />

          <div className="navbar-actions">
            <button className="icon-button" type="button" aria-label="Favorites">
              <Image className="icon" src={uiAssets.heart} alt="" width={24} height={24} />
              <span className="badge">{appStore.favoritesCount}</span>
            </button>
            <button className="icon-button" type="button" aria-label="Menu">
              <Image className="icon" src={uiAssets.list} alt="" width={24} height={24} />
            </button>
          </div>

          <span className="vertical-divider" aria-hidden="true" />

          <button className="inline-control" type="button">
            <Image className="icon" src={uiAssets.globe} alt="" width={24} height={24} />
            <span>{appStore.language}</span>
            <Image className="icon-small" src={uiAssets.caret} alt="" width={12} height={12} />
          </button>
        </div>
      </div>
    </header>
  )
})
