import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "./assets";

const tabbarItems = [
  {
    label: "Home",
    icon: uiAssets.home,
    isActive: true,
  },
  {
    label: "Catalog",
    icon: uiAssets.catalogMuted,
  },
  {
    label: "Favorites",
    icon: uiAssets.heart,
  },
  {
    label: "Compare",
    icon: uiAssets.list,
  },
];

export const MobileTabbar = () => (
  <nav {...stylex.props(styles.tabbar)} aria-label="Primary navigation">
    {tabbarItems.map((item) => (
      <button
        {...stylex.props(styles.item, item.isActive && styles.activeItem)}
        key={item.label}
        type="button"
      >
        <Image src={item.icon} alt="" width={24} height={24} />
        <span>{item.label}</span>
      </button>
    ))}
  </nav>
);

const styles = stylex.create({
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
});
