import * as stylex from "@stylexjs/stylex";

export const compareCategoryCardStyles = stylex.create({
  card: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    minWidth: 0,
    borderRadius: 16,
    backgroundColor: "var(--color-bg-secondary)",
    paddingRight: { default: 0, "@media (max-width: 760px)": 16 },
  },
  active: {
    backgroundColor: {
      default: "var(--color-bg-primary)",
      "@media (max-width: 760px)": "var(--color-bg-secondary)",
    },
    boxShadow: {
      default: "0 0 0 1px var(--color-bg-secondary), var(--shadow-navbar)",
      "@media (max-width: 760px)": "none",
    },
  },
  select: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
    minHeight: { default: 64, "@media (max-width: 760px)": 80 },
    padding: {
      default: "8px 24px 8px 8px",
      "@media (max-width: 760px)": "8px 12px 8px 16px",
    },
    borderWidth: 0,
    borderRadius: 16,
    backgroundColor: "transparent",
    color: "var(--color-fg-primary)",
    textAlign: "left",
  },
  imageFrame: {
    width: { default: 48, "@media (max-width: 760px)": 64 },
    height: { default: 48, "@media (max-width: 760px)": 64 },
    flexShrink: 0,
    borderRadius: 12,
    backgroundColor: "var(--color-bg-secondary)",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    mixBlendMode: "darken",
  },
  copy: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 },
  title: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
    overflowWrap: "anywhere",
  },
  count: {
    display: { default: "none", "@media (max-width: 760px)": "block" },
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--color-fg-secondary)",
  },
  remove: {
    display: { default: "none", "@media (max-width: 760px)": "inline-flex" },
    flexShrink: 0,
  },
});
