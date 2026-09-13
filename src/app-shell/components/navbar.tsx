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

type Props = { hideMobileSearch?: boolean };

export const Navbar = observer(({ hideMobileSearch = false }: Props) => {
  const appStore = useContainer().get(AppStore);
  const isCompact = appStore.isNavbarCompact;

  useEffect(() => {
    const updateCompactState = () =>
      appStore.setNavbarCompact(window.scrollY > 56);

    updateCompactState();
    window.addEventListener("scroll", updateCompactState, { passive: true });
    window.addEventListener("resize", updateCompactState);

    return () => {
      window.removeEventListener("scroll", updateCompactState);
      window.removeEventListener("resize", updateCompactState);
    };
  }, [appStore]);

  return (
    <header
      {...stylex.props(
        layoutStyles.section,
        styles.shell,
        isCompact && styles.shellCompact,
        hideMobileSearch && styles.shellWithoutMobileSearch,
      )}
    >
      <NavbarDesktop />
      <NavbarMobile isCompact={!hideMobileSearch && isCompact} hideSearch={hideMobileSearch} />
    </header>
  );
});
