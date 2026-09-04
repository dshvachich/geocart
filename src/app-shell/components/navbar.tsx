"use client";

import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { AppStoreContext } from "@/app-shell/app-store";
import {
  controlStyles,
  iconStyles,
  layoutStyles,
} from "@/app-shell/styles/shared.styles";
import { createSearchHref } from "@/utils/search-query-utils";
import { uiAssets } from "./assets";
import { SearchBox } from "./search-box";

const locationOptions = ["Tbilisi", "Batumi"];

const languageOptions = [
  { code: "GE", flag: uiAssets.flagGe, title: "ქართული" },
  { code: "EN", flag: uiAssets.flagUs, title: "English" },
  { code: "RU", flag: uiAssets.flagRu, title: "Русский" },
];

export const Navbar = observer(() => {
  const appStore = useContext(AppStoreContext);

  useEffect(() => {
    const updateCompactState = () =>
      appStore.setNavbarCompact(window.scrollY > 56);

    updateCompactState();
    window.addEventListener("scroll", updateCompactState, { passive: true });
    return () => window.removeEventListener("scroll", updateCompactState);
  }, [appStore]);

  return (
    <header
      {...stylex.props(
        layoutStyles.section,
        styles.shell,
        appStore.isNavbarCompact && styles.shellCompact,
      )}
    >
      <div {...stylex.props(layoutStyles.contentRail, styles.navbar)}>
        <Link
          {...stylex.props(
            styles.brandLogo,
            appStore.isNavbarCompact && styles.compactHidden,
          )}
          href="/"
          aria-label="Geocart home"
        >
          Geocart
        </Link>

        <div
          {...stylex.props(
            styles.navbarMain,
            appStore.isNavbarCompact && styles.compactNavbarMain,
          )}
        >
          <Link
            {...stylex.props(styles.catalogButton)}
            href={createSearchHref({ category: "mobile-phones" })}
          >
            <Image
              {...stylex.props(iconStyles.icon, styles.catalogIconDefault)}
              src={uiAssets.catalog}
              alt=""
              width={24}
              height={24}
            />
            <Image
              {...stylex.props(iconStyles.icon, styles.catalogIconMuted)}
              src={uiAssets.catalogMuted}
              alt=""
              width={24}
              height={24}
            />
            <span {...stylex.props(styles.catalogLabel)}>Catalog</span>
          </Link>

          <SearchBox />
        </div>

        <div
          {...stylex.props(
            styles.navbarRight,
            appStore.isNavbarCompact && styles.compactHidden,
          )}
        >
          <div {...stylex.props(styles.dropdownAnchor)}>
            <button
              {...stylex.props(controlStyles.inlineControl)}
              type="button"
              aria-expanded={appStore.isLocationMenuOpen}
              aria-haspopup="menu"
              onClick={appStore.toggleLocationMenu}
            >
              <Image
                {...stylex.props(iconStyles.icon)}
                src={uiAssets.location}
                alt=""
                width={24}
                height={24}
              />
              <span>{appStore.location.city}</span>
              <Image
                {...stylex.props(
                  iconStyles.iconSmall,
                  appStore.isLocationMenuOpen && styles.caretOpen,
                )}
                src={uiAssets.caret}
                alt=""
                width={12}
                height={12}
              />
            </button>

            {appStore.isLocationMenuOpen && (
              <div
                {...stylex.props(styles.dropdown, styles.locationDropdown)}
                role="menu"
              >
                <div {...stylex.props(styles.dropdownHeading)}>Location</div>
                {locationOptions.map((city) => (
                  <button
                    {...stylex.props(styles.dropdownRow)}
                    key={city}
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      appStore.setLocation({
                        city,
                        country: "Georgia",
                      })
                    }
                  >
                    <span>{city}</span>
                    {city === appStore.location.city && (
                      <span
                        {...stylex.props(styles.dropdownCheck)}
                        aria-hidden="true"
                      >
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

          <span
            {...stylex.props(controlStyles.verticalDivider)}
            aria-hidden="true"
          />

          <div {...stylex.props(styles.navbarActions)}>
            <button
              {...stylex.props(controlStyles.iconButton)}
              type="button"
              aria-label="Favorites"
            >
              <Image
                {...stylex.props(iconStyles.icon)}
                src={uiAssets.heart}
                alt=""
                width={24}
                height={24}
              />
              <span {...stylex.props(controlStyles.badge)}>
                {appStore.favoritesCount}
              </span>
            </button>
            <button
              {...stylex.props(controlStyles.iconButton)}
              type="button"
              aria-label="Menu"
            >
              <Image
                {...stylex.props(iconStyles.icon)}
                src={uiAssets.list}
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>

          <span
            {...stylex.props(
              controlStyles.verticalDivider,
              styles.actionsDivider,
            )}
            aria-hidden="true"
          />

          <div {...stylex.props(styles.dropdownAnchor)}>
            <button
              {...stylex.props(controlStyles.inlineControl)}
              type="button"
              aria-expanded={appStore.isLanguageMenuOpen}
              aria-haspopup="menu"
              onClick={appStore.toggleLanguageMenu}
            >
              <Image
                {...stylex.props(iconStyles.icon)}
                src={uiAssets.globe}
                alt=""
                width={24}
                height={24}
              />
              <span>{appStore.language}</span>
              <Image
                {...stylex.props(
                  iconStyles.iconSmall,
                  appStore.isLanguageMenuOpen && styles.caretOpen,
                )}
                src={uiAssets.caret}
                alt=""
                width={12}
                height={12}
              />
            </button>

            {appStore.isLanguageMenuOpen && (
              <div
                {...stylex.props(styles.dropdown, styles.languageDropdown)}
                role="menu"
              >
                <div {...stylex.props(styles.dropdownHeading)}>Language</div>
                {languageOptions.map((language) => (
                  <button
                    {...stylex.props(styles.dropdownRow)}
                    key={language.code}
                    type="button"
                    role="menuitem"
                    onClick={() => appStore.setLanguage(language.code)}
                  >
                    <Image
                      {...stylex.props(styles.dropdownFlag)}
                      src={language.flag}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <span>{language.title}</span>
                    {language.code === appStore.language && (
                      <span
                        {...stylex.props(styles.dropdownCheck)}
                        aria-hidden="true"
                      >
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
  );
});

const styles = stylex.create({
  shell: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: "var(--color-bg-primary)",
  },
  shellCompact: {
    boxShadow: {
      default: null,
      "@media (max-width: 760px)": "var(--shadow-navbar)",
    },
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    flexWrap: {
      default: "nowrap",
      "@media (max-width: 1180px)": "wrap",
    },
    gap: {
      default: 24,
      "@media (max-width: 1180px)": 12,
      "@media (max-width: 760px)": "8px 12px",
    },
    minHeight: {
      default: 56,
      "@media (max-width: 760px)": "auto",
    },
    paddingTop: {
      default: null,
      "@media (max-width: 760px)": 8,
    },
    paddingBottom: {
      default: null,
      "@media (max-width: 760px)": 8,
    },
    backgroundColor: "var(--color-bg-primary)",
  },
  brandLogo: {
    flex: "0 0 auto",
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
  compactHidden: {
    display: {
      default: null,
      "@media (max-width: 760px)": "none",
    },
  },
  navbarMain: {
    display: "flex",
    flex: "1 1 auto",
    flexBasis: {
      default: null,
      "@media (max-width: 1180px)": "100%",
    },
    alignItems: "center",
    gap: 8,
    minWidth: {
      default: 180,
      "@media (max-width: 760px)": 0,
    },
    minHeight: 40,
    order: {
      default: 0,
      "@media (max-width: 1180px)": 3,
    },
  },
  compactNavbarMain: {
    order: {
      default: null,
      "@media (max-width: 760px)": 0,
    },
  },
  catalogButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: {
      default: null,
      "@media (max-width: 760px)": 40,
    },
    height: 40,
    padding: {
      default: "8px 16px 8px 12px",
      "@media (max-width: 760px)": 8,
    },
    borderWidth: 0,
    borderRadius: {
      default: 34,
      "@media (max-width: 760px)": 20,
    },
    backgroundColor: {
      default: "var(--color-bg-dark)",
      "@media (max-width: 760px)": "var(--color-bg-secondary)",
    },
    color: "var(--color-fg-on-dark)",
    fontSize: {
      default: 16,
      "@media (max-width: 760px)": 14,
    },
    fontWeight: 500,
    lineHeight: {
      default: "24px",
      "@media (max-width: 760px)": "20px",
    },
    whiteSpace: "nowrap",
  },
  catalogIconDefault: {
    display: {
      default: "block",
      "@media (max-width: 760px)": "none",
    },
  },
  catalogIconMuted: {
    display: {
      default: "none",
      "@media (max-width: 760px)": "block",
    },
  },
  catalogLabel: {
    display: {
      default: "inline",
      "@media (max-width: 760px)": "none",
    },
  },
  navbarRight: {
    display: "flex",
    flex: "0 0 auto",
    alignItems: "center",
    gap: {
      default: 16,
      "@media (max-width: 760px)": 12,
    },
    height: {
      default: null,
      "@media (max-width: 760px)": 40,
    },
    marginLeft: {
      default: null,
      "@media (max-width: 1180px)": "auto",
    },
  },
  dropdownAnchor: {
    position: "relative",
    display: "flex",
  },
  caretOpen: {
    transform: "rotate(180deg)",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 16px)",
    right: 0,
    zIndex: 70,
    display: {
      default: "flex",
      "@media (max-width: 760px)": "none",
    },
    flexDirection: "column",
    alignItems: "stretch",
    padding: "8px 0",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-divider-light)",
    borderRadius: 12,
    backgroundColor: "var(--color-bg-primary)",
    boxShadow: "var(--shadow-dropdown)",
  },
  locationDropdown: {
    right: 12,
    width: 176,
  },
  languageDropdown: {
    width: 192,
  },
  dropdownHeading: {
    padding: "4px 16px",
    color: "var(--color-fg-secondary)",
    fontSize: 12,
    lineHeight: "20px",
  },
  dropdownRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    minHeight: 40,
    padding: "8px 16px",
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": "var(--color-bg-secondary)",
      ":focus-visible": "var(--color-bg-secondary)",
    },
    color: "var(--color-fg-primary)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    textAlign: "left",
    outline: {
      default: null,
      ":hover": 0,
      ":focus-visible": 0,
    },
  },
  dropdownFlag: {
    width: 24,
    height: 24,
    objectFit: "contain",
  },
  dropdownCheck: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    width: 24,
    height: 24,
  },
  navbarActions: {
    display: {
      default: "flex",
      "@media (max-width: 760px)": "none",
    },
    alignItems: "center",
    gap: 8,
  },
  actionsDivider: {
    display: {
      default: "inline-flex",
      "@media (max-width: 760px)": "none",
    },
  },
});
