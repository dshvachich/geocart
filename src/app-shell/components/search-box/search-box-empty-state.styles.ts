import * as stylex from "@stylexjs/stylex";

export const searchBoxEmptyStateStyles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: {
      default: "48px 20px",
      "@media (max-width: 760px)": "48px var(--layout-gutter-mobile)",
    },
    textAlign: "center",
  },
  iconCircle: {
    display: "flex",
    flex: "0 0 auto",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "var(--color-bg-secondary)",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
    overflowWrap: "anywhere",
  },
  title: {
    margin: 0,
    color: "var(--color-fg-primary)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.32px",
  },
  description: {
    margin: 0,
    color: "var(--color-fg-secondary)",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
  },
});
