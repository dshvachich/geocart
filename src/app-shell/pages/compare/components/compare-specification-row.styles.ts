import * as stylex from "@stylexjs/stylex";

export const compareSpecificationRowStyles = stylex.create({
  row: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "calc(var(--comparison-column-width) - 16px)",
    columnGap: 16,
    margin: 0,
    paddingBlock: 12,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--color-divider-light)",
  },
  label: {
    position: "sticky",
    left: 8,
    width: "fit-content",
    maxWidth: "calc(100vw - 32px)",
    marginBottom: 4,
    color: "var(--color-fg-secondary)",
    fontSize: 14,
    lineHeight: "20px",
  },
  labelSpan: (count: number) => ({ gridColumn: `1 / span ${count}` }),
  value: {
    gridRow: 2,
    margin: 0,
    color: "var(--color-fg-primary)",
    fontSize: 16,
    lineHeight: "24px",
    overflowWrap: "anywhere",
  },
});
