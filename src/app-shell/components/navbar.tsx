"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { AppStore } from "@/app-shell/app-store";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { NavbarDesktop } from "./navbar/navbar-desktop";
import { NavbarMobile } from "./navbar/navbar-mobile";
import { navbarStyles as styles } from "./navbar/navbar.styles";

export const Navbar = observer(() => {
  const appStore = useContainer().get(AppStore);
  const isCompact = appStore.isNavbarCompact;

  useEffect(() => {
    const updateCompactState = () =>
      appStore.setNavbarCompact(window.scrollY > 56);

    updateCompactState();
    window.addEventListener("scroll", updateCompactState, { passive: true });
    return () => window.removeEventListener("scroll", updateCompactState);
  }, [appStore]);

  return (
    <header
      {...stylex.props(
        layoutStyles.section,
        styles.shell,
        isCompact && styles.shellCompact,
      )}
    >
      <NavbarDesktop />
      <NavbarMobile isCompact={isCompact} />
    </header>
  );
});
