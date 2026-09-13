"use client";

import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { uiAssets } from "./assets";
import { mobileTabbarStyles as styles } from "./mobile-tabbar.styles";

type MobileTabbarItemId = "home" | "catalog" | "favorites" | "compare";

type MobileTabbarProps = {
  activeItem?: MobileTabbarItemId | null;
  respectSafeArea?: boolean;
};

const tabbarItems = [
  {
    id: "home",
    labelKey: "common.home",
    href: "/",
    activeIcon: uiAssets.home,
    icon: uiAssets.homeMuted,
  },
  {
    id: "catalog",
    labelKey: "common.catalog",
    href: "/catalog",
    activeIcon: uiAssets.catalogActive,
    icon: uiAssets.catalogMuted,
  },
  {
    id: "favorites",
    labelKey: "common.favorites",
    href: "/favorites",
    activeIcon: uiAssets.heart,
    icon: uiAssets.heart,
  },
  {
    id: "compare",
    labelKey: "common.compare",
    href: "/compare",
    activeIcon: uiAssets.list,
    icon: uiAssets.list,
  },
] satisfies Array<{
  id: MobileTabbarItemId;
  labelKey: string;
  href: string;
  activeIcon: string;
  icon: string;
}>;

export const MobileTabbar = ({
  activeItem = "home",
  respectSafeArea = false,
}: MobileTabbarProps) => {
  const { t } = useTranslation();

  return (
    <nav
      {...stylex.props(styles.tabbar, respectSafeArea && styles.safeArea)}
      aria-label={t("common.primaryNavigation")}
    >
      {tabbarItems.map((item) => {
        const isActive = item.id === activeItem;

        return (
          <Link
            {...stylex.props(styles.item, isActive && styles.activeItem)}
            key={item.id}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
          >
            <Image
              {...stylex.props(isActive && item.id === "compare" && styles.activeCompareIcon)}
              src={isActive ? item.activeIcon : item.icon}
              alt=""
              width={24}
              height={24}
            />
            <span
              {...stylex.props(styles.label, isActive && styles.activeItem)}
            >
              {t(item.labelKey)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
