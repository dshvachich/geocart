import * as stylex from "@stylexjs/stylex";

export const productMerchantLogoStyles = stylex.create({
  container: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: { default: 40, "@media (max-width: 760px)": 24 },
    height: { default: 40, "@media (max-width: 760px)": 24 },
    flexShrink: 0,
    borderRadius: 40,
    backgroundColor: "var(--color-bg-primary)",
    overflow: "hidden",
  },
  small: { width: 20, height: 20 },
  logo: { width: "100%", height: "100%", objectFit: "contain" },
});
