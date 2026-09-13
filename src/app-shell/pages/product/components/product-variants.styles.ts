import * as stylex from "@stylexjs/stylex";

export const productVariantsStyles = stylex.create({
  groups: { display: "flex", flexDirection: "column", gap: 16 },
  group: { margin: 0, padding: 0, borderWidth: 0, minWidth: 0 },
  label: {
    marginBottom: 8,
    padding: 0,
    fontSize: { default: 16, "@media (max-width: 760px)": 14 },
    fontWeight: { default: 500, "@media (max-width: 760px)": 400 },
    lineHeight: { default: "24px", "@media (max-width: 760px)": "20px" },
    letterSpacing: { default: "-0.32px", "@media (max-width: 760px)": 0 },
  },
  options: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 },
  option: {
    minHeight: 32,
    borderWidth: 0,
    borderRadius: 24,
    padding: "6px 12px",
    backgroundColor: {
      default: "var(--color-bg-secondary)",
      ":hover": "var(--color-divider-light)",
    },
    color: "var(--color-fg-primary)",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    textAlign: "center",
    maxWidth: "100%",
    overflowWrap: "anywhere",
  },
  selected: {
    backgroundColor: {
      default: "var(--color-bg-dark)",
      ":hover": "var(--color-bg-dark)",
    },
    color: "var(--color-fg-on-dark)",
  },
});
