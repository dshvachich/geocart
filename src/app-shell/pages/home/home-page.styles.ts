import * as stylex from "@stylexjs/stylex";

export const homePageStyles = stylex.create({
  paginationSlot: {
    width: "100%",
    minHeight: 168,
    backgroundColor: "var(--color-bg-primary)",
  },
  paginationBoundary: {
    width: "100%",
    height: 1,
  },
});
