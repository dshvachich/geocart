import * as stylex from "@stylexjs/stylex";

export const productPageStyles = stylex.create({
  page: {
    paddingBottom: {
      default: 0,
      "@media (max-width: 760px)":
        "calc(var(--mobile-tabbar-height) + env(safe-area-inset-bottom, 0px))",
    },
  },
  pageWithOffer: {
    paddingBottom: {
      default: 0,
      "@media (max-width: 760px)":
        "calc(var(--mobile-tabbar-height) + var(--product-mobile-offer-height) + env(safe-area-inset-bottom, 0px))",
    },
  },
  desktopOnly: {
    display: { default: "block", "@media (max-width: 760px)": "none" },
  },
  content: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) 292px",
      "@media (max-width: 1180px)": "minmax(0, 1fr) 250px",
      "@media (max-width: 900px)": "minmax(0, 1fr)",
    },
    gap: { default: 44, "@media (max-width: 1180px)": 24 },
    alignItems: "start",
  },
  primary: { minWidth: 0 },
});
