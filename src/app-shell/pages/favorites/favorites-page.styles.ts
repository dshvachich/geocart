import * as stylex from "@stylexjs/stylex";

export const favoritesPageStyles = stylex.create({
  headerSection: {
    backgroundColor: "var(--color-bg-primary)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingTop: {
      default: 24,
      "@media (max-width: 760px)": 16,
    },
    paddingBottom: {
      default: 16,
      "@media (max-width: 760px)": 8,
    },
    backgroundColor: "var(--color-bg-primary)",
  },
  emptyHeader: {
    paddingBottom: 8,
  },
  title: {
    margin: 0,
    color: "var(--color-fg-primary)",
    fontSize: {
      default: 28,
      "@media (max-width: 760px)": 24,
    },
    fontWeight: 600,
    lineHeight: {
      default: "40px",
      "@media (max-width: 760px)": "32px",
    },
    letterSpacing: 0,
  },
  productsSection: {
    backgroundColor: "var(--color-bg-primary)",
  },
});
