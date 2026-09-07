import * as stylex from "@stylexjs/stylex";

export const layoutStyles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "var(--color-bg-primary)",
  },
  section: {
    width: "100%",
  },
  contentRail: {
    width: "100%",
    maxWidth: "var(--layout-max-width)",
    marginInline: "auto",
    paddingRight: {
      default: "var(--layout-gutter)",
      "@media (max-width: 760px)": "var(--layout-gutter-mobile)",
    },
    paddingLeft: {
      default: "var(--layout-gutter)",
      "@media (max-width: 760px)": "var(--layout-gutter-mobile)",
    },
  },
  footerGap: {
    width: "100%",
    height: {
      default: 80,
      "@media (max-width: 760px)": 56,
    },
    backgroundColor: "var(--color-bg-primary)",
  },
});

export const iconStyles = stylex.create({
  icon: {
    width: 24,
    height: 24,
    objectFit: "contain",
  },
  iconSmall: {
    width: 12,
    height: 12,
    objectFit: "contain",
  },
});

export const controlStyles = stylex.create({
  iconButton: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 8,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "var(--color-bg-secondary)",
  },
  inlineControl: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "var(--color-fg-primary)",
    fontSize: {
      default: 16,
      "@media (max-width: 760px)": 14,
    },
    fontWeight: 500,
    lineHeight: {
      default: "24px",
      "@media (max-width: 760px)": "20px",
    },
  },
  inlineControlOnDark: {
    color: "var(--color-fg-dark-secondary)",
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "var(--color-danger)",
    color: "var(--color-fg-on-dark)",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
  },
  verticalDivider: {
    width: 2,
    height: 16,
    borderRadius: 8,
    backgroundColor: "var(--color-divider-light)",
  },
  verticalDividerCatalogMobile: {
    flex: {
      default: null,
      "@media (max-width: 760px)": "0 0 2px",
    },
  },
});
