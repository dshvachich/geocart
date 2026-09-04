import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { uiAssets } from "./assets";

type MobileTabbarItemId = "home" | "catalog" | "favorites" | "compare";

type MobileTabbarProps = {
  activeItem?: MobileTabbarItemId;
};

const tabbarItems = [
  {
    id: "home",
    label: "Home",
    href: "/",
    activeIcon: uiAssets.home,
    icon: uiAssets.homeMuted,
  },
  {
    id: "catalog",
    label: "Catalog",
    href: "/catalog",
    activeIcon: uiAssets.catalogActive,
    icon: uiAssets.catalogMuted,
  },
  {
    id: "favorites",
    label: "Favorites",
    href: "/favorites",
    activeIcon: uiAssets.heart,
    icon: uiAssets.heart,
  },
  {
    id: "compare",
    label: "Compare",
    href: "/",
    activeIcon: uiAssets.list,
    icon: uiAssets.list,
  },
] satisfies Array<{
  id: MobileTabbarItemId;
  label: string;
  href: string;
  activeIcon: string;
  icon: string;
}>;

export const MobileTabbar = ({ activeItem = "home" }: MobileTabbarProps) => (
  <nav {...stylex.props(styles.tabbar)} aria-label="Primary navigation">
    {tabbarItems.map((item) => {
      const isActive = item.id === activeItem;

      return (
        <Link
          {...stylex.props(styles.item, isActive && styles.activeItem)}
          key={item.label}
          href={item.href}
          aria-current={isActive ? "page" : undefined}
        >
          <Image
            src={isActive ? item.activeIcon : item.icon}
            alt=""
            width={24}
            height={24}
          />
          <span>{item.label}</span>
        </Link>
      );
    })}
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
