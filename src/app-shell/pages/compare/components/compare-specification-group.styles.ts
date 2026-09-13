import * as stylex from "@stylexjs/stylex";

export const compareSpecificationGroupStyles = stylex.create({
  heading: {
    position: "sticky",
    left: 8,
    width: "fit-content",
    maxWidth: "calc(100vw - 32px)",
    margin: 0,
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    minHeight: 47,
    padding: "12px 0",
    borderWidth: 0,
    backgroundColor: "var(--color-bg-primary)",
    color: "var(--color-fg-primary)",
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
    textAlign: "left",
  },
});
