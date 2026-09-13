import * as stylex from "@stylexjs/stylex";

export const productAttributeRowStyles = stylex.create({
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { default: 44, "@media (max-width: 359px)": 16 },
    alignItems: "center",
    minHeight: { default: 48, "@media (max-width: 760px)": 40 },
    paddingBlock: { default: 12, "@media (max-width: 760px)": 8 },
    fontSize: 16,
    lineHeight: "24px",
  },
  compact: { display: "flex", gap: 16, minHeight: 40, paddingBlock: 8 },
  label: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 auto",
    gap: 16,
    minWidth: 0,
    color: "var(--color-fg-secondary)",
    overflowWrap: "anywhere",
  },
  line: {
    display: { default: "block", "@media (max-width: 760px)": "none" },
    flex: "1 1 16px",
    minWidth: 8,
    height: 1,
    backgroundColor: "var(--color-divider-light)",
  },
  compactLine: { display: "block" },
  value: { margin: 0, minWidth: 0, overflowWrap: "anywhere" },
  compactValue: { maxWidth: "52%", textAlign: "right" },
});
