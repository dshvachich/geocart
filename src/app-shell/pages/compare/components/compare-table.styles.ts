import * as stylex from "@stylexjs/stylex";

export const compareTableStyles = stylex.create({
  rail: {
    width: "100%",
    maxWidth: "var(--layout-max-width)",
    marginInline: "auto",
  },
  scroll: {
    width: "100%",
    overflowX: "auto",
    overscrollBehaviorX: "contain",
    paddingInline: {
      default: "calc(var(--layout-gutter) - 8px)",
      "@media (max-width: 760px)": "calc(var(--layout-gutter-mobile) - 8px)",
    },
  },
  table: { width: "max-content" },
  cards: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "var(--comparison-column-width)",
    alignItems: "start",
  },
  groups: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginInline: 8,
    marginTop: 8,
  },
  empty: {
    margin: 0,
    padding: "16px var(--layout-gutter)",
    color: "var(--color-fg-secondary)",
    fontSize: 14,
    lineHeight: "20px",
    paddingInline: {
      default: "var(--layout-gutter)",
      "@media (max-width: 760px)": "var(--layout-gutter-mobile)",
    },
  },
});
