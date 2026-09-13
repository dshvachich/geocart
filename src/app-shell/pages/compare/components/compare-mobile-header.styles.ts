import * as stylex from "@stylexjs/stylex";

export const compareMobileHeaderStyles = stylex.create({
  header: {
    display: { default: "none", "@media (max-width: 760px)": "flex" },
    alignItems: "center",
    gap: 8,
    padding: "8px var(--layout-gutter-mobile)",
    minHeight: 56,
  },
  title: {
    flex: "1 1 auto",
    minWidth: 0,
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
    textAlign: "center",
    overflowWrap: "anywhere",
  },
  button: { flexShrink: 0 },
});
