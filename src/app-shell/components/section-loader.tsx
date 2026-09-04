import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app-shell/styles/shared.styles";

export const SectionLoader = () => (
  <div
    {...stylex.props(layoutStyles.section, styles.section)}
    aria-label="Loading more products"
  >
    <div {...stylex.props(styles.loader)} />
  </div>
);

const loaderSpin = stylex.keyframes({
  to: {
    transform: "rotate(360deg)",
  },
});

const styles = stylex.create({
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
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "var(--color-divider-light)",
    borderTopColor: "var(--color-bg-dark)",
    borderRadius: "50%",
    animationName: loaderSpin,
    animationDuration: "0.9s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});
