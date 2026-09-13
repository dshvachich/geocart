import * as stylex from "@stylexjs/stylex";

export const productSummaryStyles = stylex.create({
  summary: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 24, "@media (max-width: 760px)": 20 },
    minWidth: 0,
  },
  section: {
    paddingBottom: { default: 24, "@media (max-width: 760px)": 20 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--color-divider-light)",
  },
  attributes: { marginTop: 8, marginBottom: 8 },
  descriptionSection: { display: "flex", flexDirection: "column", gap: 8 },
  description: {
    margin: 0,
    fontSize: 16,
    lineHeight: "24px",
    whiteSpace: "pre-line",
    overflowWrap: "anywhere",
  },
  clamped: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: { default: 3, "@media (max-width: 760px)": 5 },
    overflow: "hidden",
  },
});
