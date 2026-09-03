'use client'

import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { AppStoreContext } from '@/app-shell/app-store'
import { uiAssets } from './assets'
import { SearchBox } from './search-box'

export const Navbar = observer(() => {
  const appStore = useContext(AppStoreContext)
  const [isCompact, setIsCompact] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  useEffect(() => {
    const updateCompactState = () => setIsCompact(window.scrollY > 56)

    updateCompactState()
    window.addEventListener('scroll', updateCompactState, { passive: true })
    return () => window.removeEventListener('scroll', updateCompactState)
  }, [])

  return (
    <header
      className={cn('page-section navbar-shell', { 'is-compact': isCompact })}
    >
      <div className={cn('content-rail navbar', { 'is-compact': isCompact })}>
        <Link className="brand-logo" href="/" aria-label="Geocart home">
          Geocart
        </Link>

        <div className="navbar-main">
          <Link className="catalog-button" href="/catalog">
            <Image
              className="catalog-icon catalog-icon-default"
              src={uiAssets.catalog}
              alt=""
              width={24}
              height={24}
            />
            <Image
              className="catalog-icon catalog-icon-muted"
              src={uiAssets.catalogMuted}
              alt=""
              width={24}
              height={24}
            />
            <span>Catalog</span>
          </Link>

          <SearchBox />
        </div>

        <div className="navbar-right">
          <div className="nav-dropdown-anchor">
            <button
              className={cn('inline-control dropdown-trigger', {
                'is-open': isLocationOpen,
              })}
              type="button"
              aria-expanded={isLocationOpen}
              aria-haspopup="menu"
              onClick={() => setIsLocationOpen((value) => !value)}
            >
              <Image
                className="icon"
                src={uiAssets.location}
                alt=""
                width={24}
                height={24}
              />
              <span>{appStore.location.city}</span>
              <Image
                className="icon-small"
                src={uiAssets.caret}
                alt=""
                width={12}
                height={12}
              />
            </button>

            {isLocationOpen && (
              <div className="nav-dropdown location-dropdown" role="menu">
                <div className="dropdown-heading">Location</div>
                {['Tbilisi', 'Batumi'].map((city) => (
                  <button
                    className={cn('dropdown-row', {
                      active: city === appStore.location.city,
                    })}
                    key={city}
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      appStore.setLocation({
                        city,
                        country: 'Georgia',
                      })
                    }
                  >
                    <span>{city}</span>
                    {city === appStore.location.city && (
                      <span className="dropdown-check" aria-hidden="true">
                        <Image
                          src={uiAssets.checkmark}
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="vertical-divider" aria-hidden="true" />

          <div className="navbar-actions">
            <button
              className="icon-button"
              type="button"
              aria-label="Favorites"
            >
              <Image
                className="icon"
                src={uiAssets.heart}
                alt=""
                width={24}
                height={24}
              />
              <span className="badge">{appStore.favoritesCount}</span>
            </button>
            <button className="icon-button" type="button" aria-label="Menu">
              <Image
                className="icon"
                src={uiAssets.list}
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>

          <span className="vertical-divider" aria-hidden="true" />

          <div className="nav-dropdown-anchor">
            <button
              className={cn('inline-control dropdown-trigger', {
                'is-open': isLanguageOpen,
              })}
              type="button"
              aria-expanded={isLanguageOpen}
              aria-haspopup="menu"
              onClick={() => setIsLanguageOpen((value) => !value)}
            >
              <Image
                className="icon"
                src={uiAssets.globe}
                alt=""
                width={24}
                height={24}
              />
              <span>{appStore.language}</span>
              <Image
                className="icon-small"
                src={uiAssets.caret}
                alt=""
                width={12}
                height={12}
              />
            </button>

            {isLanguageOpen && (
              <div className="nav-dropdown language-dropdown" role="menu">
                <div className="dropdown-heading">Language</div>
                {[
                  { code: 'GE', flag: uiAssets.flagGe, title: 'ქართული' },
                  { code: 'EN', flag: uiAssets.flagUs, title: 'English' },
                  { code: 'RU', flag: uiAssets.flagRu, title: 'Русский' },
                ].map((language) => (
                  <button
                    className={cn('dropdown-row', {
                      active: language.code === appStore.language,
                    })}
                    key={language.code}
                    type="button"
                    role="menuitem"
                    onClick={() => appStore.setLanguage(language.code)}
                  >
                    <Image
                      className="dropdown-flag"
                      src={language.flag}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span>{language.title}</span>
                    {language.code === appStore.language && (
                      <span className="dropdown-check" aria-hidden="true">
                        <Image
                          src={uiAssets.checkmark}
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
})
