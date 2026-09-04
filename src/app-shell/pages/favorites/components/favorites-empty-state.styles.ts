import * as stylex from "@stylexjs/stylex";

export const favoritesEmptyStateStyles = stylex.create({
  section: {
    backgroundColor: "var(--color-bg-primary)",
  },
  content: {
    display: "flex",
    minHeight: {
      default: 360,
      "@media (max-width: 760px)": 280,
    },
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 12,
    paddingTop: 48,
    paddingBottom: 64,
    backgroundColor: "var(--color-bg-primary)",
  },
  title: {
    margin: 0,
    color: "var(--color-fg-primary)",
    fontSize: {
      default: 24,
      "@media (max-width: 760px)": 20,
    },
    fontWeight: 600,
    lineHeight: {
      default: "32px",
      "@media (max-width: 760px)": "24px",
    },
  },
  text: {
    margin: 0,
    color: "var(--color-fg-secondary)",
    fontSize: 16,
    lineHeight: "24px",
  },
  link: {
    display: "inline-flex",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    padding: "8px 16px",
    borderRadius: 34,
    backgroundColor: "var(--color-bg-dark)",
    color: "var(--color-fg-on-dark)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
  },
});
