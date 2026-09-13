import * as stylex from "@stylexjs/stylex";

export const comparePageStyles = stylex.create({
  page: {
    paddingBottom: {
      default: 0,
      "@media (max-width: 760px)":
        "calc(var(--mobile-tabbar-height) + env(safe-area-inset-bottom, 0px))",
    },
  },
  header: {
    paddingTop: { default: 24, "@media (max-width: 760px)": 16 },
    paddingBottom: { default: 16, "@media (max-width: 760px)": 8 },
  },
  title: {
    margin: 0,
    fontSize: { default: 28, "@media (max-width: 760px)": 24 },
    fontWeight: 600,
    lineHeight: { default: "40px", "@media (max-width: 760px)": "32px" },
    letterSpacing: "-0.02em",
  },
  desktopOnly: {
    display: { default: "block", "@media (max-width: 760px)": "none" },
  },
  content: { minWidth: 0, paddingBottom: 64 },
  footer: { marginTop: "auto" },
});
