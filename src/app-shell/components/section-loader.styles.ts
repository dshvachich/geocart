import * as stylex from "@stylexjs/stylex";

const loaderSpin = stylex.keyframes({
  to: {
    transform: "rotate(360deg)",
  },
});

export const sectionLoaderStyles = stylex.create({
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 168,
    backgroundColor: "var(--color-bg-primary)",
  },
  loader: {
    width: 40,
    height: 40,
    flexShrink: 0,
    animationName: {
      default: loaderSpin,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationDuration: "0.9s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});
