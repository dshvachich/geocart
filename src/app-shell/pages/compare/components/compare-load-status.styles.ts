import * as stylex from "@stylexjs/stylex";

export const compareLoadStatusStyles = stylex.create({
  status: {
    paddingBlock: 16,
    color: "var(--color-fg-secondary)",
    fontSize: 14,
    lineHeight: "20px",
  },
  message: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 },
  button: {
    minHeight: 40,
    padding: "8px 16px",
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-primary)",
    fontSize: 14,
    lineHeight: "20px",
  },
});
