import * as stylex from "@stylexjs/stylex";

export const productGalleryStyles = stylex.create({
  gallery: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 0,
    marginInline: {
      default: 0,
      "@media (max-width: 760px)": "calc(-1 * var(--layout-gutter-mobile))",
    },
  },
  main: {
    display: { default: "flex", "@media (max-width: 760px)": "none" },
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    aspectRatio: "1",
    padding: "18px 16px",
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "var(--color-bg-secondary)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    mixBlendMode: "darken",
  },
  thumbnails: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    maxWidth: "100%",
    paddingInline: {
      default: 0,
      "@media (max-width: 760px)": "var(--layout-gutter-mobile)",
    },
    paddingBottom: { default: 4, "@media (max-width: 760px)": 0 },
    scrollbarWidth: "none",
    scrollSnapType: "x mandatory",
    scrollPaddingInline: "var(--layout-gutter-mobile)",
    overscrollBehaviorX: "contain",
  },
  singleImage: {
    display: { default: "none", "@media (max-width: 760px)": "flex" },
  },
  thumbnail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    width: { default: 80, "@media (max-width: 760px)": 192 },
    height: { default: 80, "@media (max-width: 760px)": 192 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: { default: 8, "@media (max-width: 760px)": 12 },
    padding: 7,
    backgroundColor: "var(--color-bg-secondary)",
    scrollSnapAlign: "start",
  },
  selected: {
    borderColor: {
      default: "var(--color-fg-secondary)",
      "@media (max-width: 760px)": "transparent",
    },
  },
  thumbnailImage: {
    width: { default: 64, "@media (max-width: 760px)": 142 },
    height: { default: 64, "@media (max-width: 760px)": 178 },
    objectFit: "contain",
    mixBlendMode: "darken",
  },
});
