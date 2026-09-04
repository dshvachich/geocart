import * as stylex from "@stylexjs/stylex";

export const navbarStyles = stylex.create({
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
      default: 72,
      "@media (max-width: 760px)": "auto",
    },
    paddingTop: {
      default: null,
      "@media (max-width: 760px)": 8,
    },
    paddingBottom: {
      default: null,
      "@media (max-width: 760px)": 16,
    },
    backgroundColor: "var(--color-bg-primary)",
  },
  compactNavbar: {
    paddingBottom: {
      default: null,
      "@media (max-width: 760px)": 8,
    },
  },
  brandLogo: {
    flex: {
      default: "0 0 99px",
      "@media (max-width: 760px)": "0 0 85px",
    },
    width: {
      default: 99,
      "@media (max-width: 760px)": 85,
    },
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
  compactNavbarRight: {
    display: {
      default: "flex",
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
      default: 114,
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
  catalogIconSlot: {
    width: 24,
    height: 24,
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
    color: "var(--color-fg-on-dark)",
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
    top: "calc(100% + 8px)",
    right: 0,
    zIndex: 70,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "7px 0",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-divider-light)",
    borderRadius: 12,
    backgroundColor: "var(--color-bg-primary)",
    boxShadow: "var(--shadow-dropdown)",
  },
  languageDropdown: {
    right: -4,
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
