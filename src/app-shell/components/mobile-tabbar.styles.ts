import * as stylex from "@stylexjs/stylex";

export const mobileTabbarStyles = stylex.create({
  activeCompareIcon: { filter: "brightness(0) invert(1)" },
  safeArea: {
    height: {
      default: null,
      "@media (max-width: 760px)":
        "calc(var(--mobile-tabbar-height) + env(safe-area-inset-bottom, 0px))",
    },
    paddingBottom: {
      default: null,
      "@media (max-width: 760px)": "env(safe-area-inset-bottom, 0px)",
    },
  },
  tabbar: {
    position: {
      default: "static",
      "@media (max-width: 760px)": "fixed",
    },
    right: {
      default: null,
      "@media (max-width: 760px)": 0,
    },
    bottom: {
      default: null,
      "@media (max-width: 760px)": 0,
    },
    left: {
      default: null,
      "@media (max-width: 760px)": 0,
    },
    zIndex: {
      default: null,
      "@media (max-width: 760px)": 30,
    },
    display: {
      default: "none",
      "@media (max-width: 760px)": "flex",
    },
    height: {
      default: null,
      "@media (max-width: 760px)": 56,
    },
    overflow: {
      default: null,
      "@media (max-width: 760px)": "hidden",
    },
    backgroundColor: {
      default: null,
      "@media (max-width: 760px)": "var(--color-bg-dark)",
    },
  },
  item: {
    display: "flex",
    flex: "1 1 0",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0,
    height: 56,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "#727578",
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
  },
  activeItem: {
    color: "var(--color-fg-on-dark)",
  },
  label: { color: "#727578" },
});
