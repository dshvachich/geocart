import * as stylex from "@stylexjs/stylex";

export const productOffersStyles = stylex.create({
  section: { paddingBottom: { default: 40, "@media (max-width: 760px)": 24 } },
  pricesTab: { paddingTop: { default: 0, "@media (max-width: 760px)": 8 } },
  hiddenMobileHeading: {
    position: { default: null, "@media (max-width: 760px)": "absolute" },
    width: { default: null, "@media (max-width: 760px)": 1 },
    height: { default: null, "@media (max-width: 760px)": 1 },
    paddingTop: { default: 8, "@media (max-width: 760px)": 0 },
    paddingBottom: { default: 16, "@media (max-width: 760px)": 0 },
    overflow: { default: null, "@media (max-width: 760px)": "hidden" },
    clipPath: { default: null, "@media (max-width: 760px)": "inset(50%)" },
  },
  more: { paddingTop: { default: 24, "@media (max-width: 760px)": 0 } },
  moreButton: { width: { default: null, "@media (max-width: 760px)": "100%" } },
});
