import * as stylex from "@stylexjs/stylex";

export const compareProductCardStyles = stylex.create({
  remove: {
    position: "absolute",
    width: 40,
    height: 40,
    top: { default: 8, "@media (max-width: 760px)": 5 },
    right: { default: 8, "@media (max-width: 760px)": 4 },
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    borderRadius: 20,
  },
});
