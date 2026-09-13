import * as stylex from "@stylexjs/stylex";

export const productOverviewStyles = stylex.create({
  summary: {
    minWidth: 0,
    borderTopWidth: { default: 0, "@media (max-width: 760px)": 1 },
    borderTopStyle: "solid",
    borderTopColor: "var(--color-divider-light)",
    paddingTop: { default: 0, "@media (max-width: 760px)": 20 },
  },
  fullWidth: { gridColumn: "1 / -1" },
  overview: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 468fr) minmax(0, 456fr)",
      "@media (max-width: 1180px)": "minmax(0, 1fr)",
      "@media (min-width: 761px) and (max-width: 900px)":
        "repeat(2, minmax(0, 1fr))",
    },
    gap: { default: 44, "@media (max-width: 1180px)": 24 },
    paddingTop: 8,
    paddingBottom: { default: 24, "@media (max-width: 760px)": 16 },
    alignItems: "start",
  },
});
