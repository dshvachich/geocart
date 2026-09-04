import * as stylex from "@stylexjs/stylex";

export const productGridStyles = stylex.create({
  grid: {
    display: "grid",
    gridAutoRows: {
      default: 450,
      "@media (max-width: 760px)": "auto",
    },
    gridTemplateColumns: {
      default: "repeat(6, minmax(0, 1fr))",
      "@media (max-width: 1180px)": "repeat(3, minmax(0, 220px))",
      "@media (max-width: 760px)": "repeat(2, minmax(0, 1fr))",
    },
    justifyContent: "center",
    width: "100%",
    maxWidth: {
      default: "var(--layout-max-width)",
      "@media (max-width: 760px)": "none",
    },
    marginInline: "auto",
    paddingRight: {
      default: 60,
      "@media (max-width: 760px)": 8,
    },
    paddingLeft: {
      default: 60,
      "@media (max-width: 760px)": 8,
    },
    backgroundColor: "var(--color-bg-primary)",
  },
  catalogGrid: {
    paddingTop: 0,
  },
});

export const productGridHeaderStyles = stylex.create({
  header: {
    display: "flex",
    alignItems: "center",
    minHeight: {
      default: 64,
      "@media (max-width: 760px)": 56,
    },
    backgroundColor: "var(--color-bg-primary)",
  },
  title: {
    margin: 0,
    fontSize: {
      default: 24,
      "@media (max-width: 760px)": 18,
    },
    fontWeight: 600,
    lineHeight: {
      default: "32px",
      "@media (max-width: 760px)": "24px",
    },
  },
});
