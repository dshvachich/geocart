import * as stylex from "@stylexjs/stylex";

export const productSpecificationGroupStyles = stylex.create({
  group: {
    paddingBottom: { default: 32, "@media (max-width: 760px)": 16 },
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--color-divider-light)",
  },
  heading: { margin: 0 },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
    minHeight: 47,
    padding: "12px 0",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "var(--color-fg-primary)",
    fontSize: { default: 18, "@media (max-width: 760px)": 16 },
    fontWeight: { default: 600, "@media (max-width: 760px)": 500 },
    lineHeight: "24px",
    letterSpacing: {
      default: "-0.36px",
      "@media (max-width: 760px)": "-0.32px",
    },
    textAlign: "left",
  },
  attributes: {
    margin: 0,
    paddingLeft: { default: "22.7273%", "@media (max-width: 1180px)": 0 },
  },
});
