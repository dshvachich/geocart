import * as stylex from "@stylexjs/stylex";

export const favoritesEmptyStateStyles = stylex.create({
  section: {
    paddingBottom: 16,
    backgroundColor: "var(--color-bg-primary)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingBlock: {
      default: 224,
      "@media (max-width: 760px)": 80,
    },
    textAlign: "center",
  },
  iconCircle: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 60,
    backgroundColor: "var(--color-bg-secondary)",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  },
  title: {
    margin: 0,
    color: "var(--color-fg-primary)",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "24px",
  },
  text: {
    margin: 0,
    color: "var(--color-fg-secondary)",
    fontSize: 14,
    lineHeight: "20px",
  },
  link: {
    display: "inline-flex",
    flexShrink: 0,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    borderRadius: 34,
    backgroundColor: "var(--color-bg-dark)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.32px",
    outline: {
      default: null,
      ":focus-visible": "2px solid var(--color-fg-primary)",
    },
    outlineOffset: 4,
  },
  linkLabel: {
    color: "var(--color-fg-on-dark)",
  },
});
