import * as stylex from "@stylexjs/stylex";

export const categoryBarStyles = stylex.create({
  bar: {
    display: {
      default: "grid",
      "@media (max-width: 760px)": "none",
    },
    gridTemplateColumns: {
      default: "repeat(6, minmax(0, 1fr))",
      "@media (max-width: 1180px)": "repeat(3, minmax(0, 1fr))",
    },
    gap: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "var(--color-bg-primary)",
  },
  button: {
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "var(--color-fg-primary)",
    textAlign: "center",
  },
  illustration: {
    position: "relative",
    width: {
      default: 140,
      "@media (max-width: 760px)": 120,
    },
    height: {
      default: 140,
      "@media (max-width: 760px)": 120,
    },
  },
  shape: {
    position: "absolute",
    top: {
      default: 22,
      "@media (max-width: 760px)": 18,
    },
    left: {
      default: 22,
      "@media (max-width: 760px)": 18,
    },
    width: {
      default: 96,
      "@media (max-width: 760px)": 84,
    },
    height: {
      default: 96,
      "@media (max-width: 760px)": 84,
    },
  },
  image: {
    position: "absolute",
    inset: 0,
    width: {
      default: 140,
      "@media (max-width: 760px)": 120,
    },
    height: {
      default: 140,
      "@media (max-width: 760px)": 120,
    },
    objectFit: "contain",
  },
  title: {
    width: "100%",
    minHeight: 24,
    fontSize: {
      default: 16,
      "@media (max-width: 760px)": 14,
    },
    fontWeight: 500,
    lineHeight: {
      default: "24px",
      "@media (max-width: 760px)": "20px",
    },
    overflowWrap: "break-word",
    whiteSpace: "normal",
  },
});
