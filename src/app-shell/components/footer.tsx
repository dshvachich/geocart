'use client'

import Image from 'next/image'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { AppStoreContext } from '@/app-shell/app-store'
import { uiAssets } from './assets'

const footerColumns = [
  {
    title: 'Company',
    links: ['About', 'Mission & Manifesto', 'Contacts'],
  },
  {
    title: 'For buyers',
    links: ['About service', 'How to select a product'],
  },
  {
    title: 'Partnership',
    links: ['For brands', 'For shops & sellers'],
  },
]

export const Footer = observer(() => {
  const appStore = useContext(AppStoreContext)

  return (
    <footer className="page-section footer">
      <div className="content-rail">
        <div className="footer-main">
          <div className="footer-brand">
            <div>
              <p className="footer-logo">Geocart</p>
              <p className="footer-copy">
                Product discovery platform in Georgia.
                <br />
                Say hello to us: hi@geocart.ge
              </p>
            </div>

            <div className="footer-controls">
              <button className="inline-control" type="button">
                <Image className="icon" src={uiAssets.footerGlobe} alt="" width={24} height={24} />
                <span>{appStore.language}</span>
                <Image className="icon-small" src={uiAssets.footerCaret} alt="" width={12} height={12} />
              </button>
              <button className="inline-control" type="button">
                <Image className="icon" src={uiAssets.footerLocation} alt="" width={24} height={24} />
                <span>{appStore.location.city}</span>
                <Image className="icon-small" src={uiAssets.footerCaret} alt="" width={12} height={12} />
              </button>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav className="footer-column" key={column.title} aria-label={column.title}>
              <p className="footer-heading">{column.title}</p>
              {column.links.map((link) => (
                <Link className="footer-link" href="/" key={link}>
                  {link}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© geocart.ge 2026. All rights reserved</span>
            <Link href="/">Terms & Conditions</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
          <span>Made with love in Sakartvelo 🇬🇪</span>
        </div>
      </div>
    </footer>
  )
})
