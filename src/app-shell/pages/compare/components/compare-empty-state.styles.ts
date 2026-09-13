import * as stylex from "@stylexjs/stylex";

export const compareEmptyStateStyles = stylex.create({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    paddingBlock: { default: 160, "@media (max-width: 760px)": 80 },
    textAlign: "center",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "var(--color-bg-secondary)",
  },
  title: { margin: 0, fontSize: 20, fontWeight: 600, lineHeight: "24px" },
  text: {
    margin: "4px 0 0",
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--color-fg-secondary)",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: 40,
    padding: "8px 16px",
    borderRadius: 34,
    backgroundColor: "var(--color-bg-dark)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
  },
  linkLabel: {
    color: "var(--color-fg-on-dark)",
  },
});
