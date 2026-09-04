"use client";

import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { AppStore } from "@/app-shell/app-store";
import {
  controlStyles,
  iconStyles,
  layoutStyles,
} from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { uiAssets } from "./assets";
import * as stylex from "@stylexjs/stylex";

const footerColumns = [
  {
    title: "Company",
    links: ["About", "Mission & Manifesto", "Contacts"],
  },
  {
    title: "For buyers",
    links: ["About service", "How to select a product"],
  },
  {
    title: "Partnership",
    links: ["For brands", "For shops & sellers"],
  },
];

export const Footer = observer(() => {
  const appStore = useContainer().get(AppStore);

  return (
    <footer {...stylex.props(layoutStyles.section, styles.footer)}>
      <div {...stylex.props(layoutStyles.contentRail, styles.rail)}>
        <div {...stylex.props(styles.main)}>
          <div {...stylex.props(styles.brand)}>
            <div>
              <p {...stylex.props(styles.logo)}>Geocart</p>
              <p {...stylex.props(styles.copy)}>
                Product discovery platform in Georgia.
                <br />
                Say hello to us: hi@geocart.ge
              </p>
            </div>

            <div {...stylex.props(styles.controls)}>
              <button
                {...stylex.props(
                  controlStyles.inlineControl,
                  controlStyles.inlineControlOnDark,
                )}
                type="button"
              >
                <Image
                  {...stylex.props(iconStyles.icon)}
                  src={uiAssets.footerGlobe}
                  alt=""
                  width={24}
                  height={24}
                />
                <span>{appStore.language}</span>
                <Image
                  {...stylex.props(iconStyles.iconSmall)}
                  src={uiAssets.footerCaret}
                  alt=""
                  width={12}
                  height={12}
                />
              </button>
              <button
                {...stylex.props(
                  controlStyles.inlineControl,
                  controlStyles.inlineControlOnDark,
                )}
                type="button"
              >
                <Image
                  {...stylex.props(iconStyles.icon)}
                  src={uiAssets.footerLocation}
                  alt=""
                  width={24}
                  height={24}
                />
                <span>{appStore.location.city}</span>
                <Image
                  {...stylex.props(iconStyles.iconSmall)}
                  src={uiAssets.footerCaret}
                  alt=""
                  width={12}
                  height={12}
                />
              </button>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav
              {...stylex.props(styles.column)}
              key={column.title}
              aria-label={column.title}
            >
              <p {...stylex.props(styles.heading)}>{column.title}</p>
              {column.links.map((link) => (
                <Link {...stylex.props(styles.link)} href="/" key={link}>
                  {link}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div {...stylex.props(styles.divider)} />

        <div {...stylex.props(styles.bottom)}>
          <div {...stylex.props(styles.legal)}>
            <span>© geocart.ge 2026. All rights reserved</span>
            <Link href="/">Terms & Conditions</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
          <span>Made with love in Sakartvelo 🇬🇪</span>
        </div>
      </div>
    </footer>
  );
});

const styles = stylex.create({
  footer: {
    backgroundColor: "var(--color-bg-dark)",
    color: "var(--color-fg-dark-secondary)",
  },
  rail: {
    paddingRight: {
      default: null,
      "@media (max-width: 760px)": 17,
    },
    paddingLeft: {
      default: null,
      "@media (max-width: 760px)": 17,
    },
  },
  main: {
    display: {
      default: "grid",
      "@media (max-width: 760px)": "flex",
    },
    gridTemplateColumns: "minmax(320px, 512px) repeat(3, minmax(140px, 1fr))",
    flexDirection: {
      default: null,
      "@media (max-width: 760px)": "column",
    },
    gap: 16,
    paddingTop: {
      default: 48,
      "@media (max-width: 760px)": 24,
    },
    paddingBottom: {
      default: 48,
      "@media (max-width: 760px)": 24,
    },
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: {
      default: 24,
      "@media (max-width: 760px)": 17,
    },
  },
  logo: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 4,
    marginLeft: 0,
    fontFamily: "var(--font-display)",
    fontSize: {
      default: 28,
      "@media (max-width: 760px)": 24,
    },
    fontWeight: 800,
    lineHeight: {
      default: "40px",
      "@media (max-width: 760px)": "32px",
    },
  },
  copy: {
    margin: 0,
    fontSize: 14,
    lineHeight: "20px",
  },
  controls: {
    display: "flex",
    flexWrap: {
      default: "nowrap",
      "@media (max-width: 760px)": "wrap",
    },
    gap: 16,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingTop: 8,
  },
  heading: {
    margin: 0,
    color: "var(--color-fg-dark-tertiary)",
    fontSize: 12,
    lineHeight: "20px",
  },
  link: {
    margin: 0,
    fontSize: 14,
    lineHeight: "20px",
  },
  divider: {
    height: 1,
    backgroundColor: "var(--color-divider-dark)",
  },
  bottom: {
    display: "flex",
    alignItems: {
      default: "center",
      "@media (max-width: 760px)": "flex-start",
    },
    justifyContent: "space-between",
    flexDirection: {
      default: "row",
      "@media (max-width: 760px)": "column",
    },
    flexWrap: {
      default: "nowrap",
      "@media (max-width: 760px)": "wrap",
    },
    gap: {
      default: 24,
      "@media (max-width: 760px)": 16,
    },
    paddingTop: 24,
    paddingBottom: {
      default: 24,
      "@media (max-width: 760px)": 80,
    },
    color: "var(--color-fg-dark-tertiary)",
    fontSize: 14,
    lineHeight: "20px",
  },
  legal: {
    display: "flex",
    flexWrap: {
      default: "nowrap",
      "@media (max-width: 760px)": "wrap",
    },
    gap: {
      default: 16,
      "@media (max-width: 760px)": 4,
    },
    alignItems: "center",
  },
});
