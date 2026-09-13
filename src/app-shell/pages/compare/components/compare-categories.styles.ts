import * as stylex from "@stylexjs/stylex";

export const compareCategoriesStyles = stylex.create({
  categories: {
    display: "flex",
    flexDirection: { default: "row", "@media (max-width: 760px)": "column" },
    gap: 8,
    paddingTop: 8,
    paddingBottom: { default: 24, "@media (max-width: 760px)": 8 },
    overflowX: "auto",
  },
});
