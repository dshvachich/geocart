"use client";

import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import * as stylex from "@stylexjs/stylex";
import { Navbar } from "@/app-shell/components/navbar";
import { Footer } from "@/app-shell/components/footer";
import { MobileTabbar } from "@/app-shell/components/mobile-tabbar";
import { SectionLoader } from "@/app-shell/components/section-loader";
import { ComparisonStore } from "@/app-shell/stores/comparison.store";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import { useContainer } from "@/di/di-provider";
import { ComparePageContext } from "./compare-page.context";
import { ComparePageStore } from "./compare-page.store";
import { comparePageStyles as styles } from "./compare-page.styles";
import { CompareCategories } from "./components/compare-categories";
import { CompareControls } from "./components/compare-controls";
import { CompareMobileHeader } from "./components/compare-mobile-header";
import { CompareTable } from "./components/compare-table";
import { CompareEmptyState } from "./components/compare-empty-state";
import { CompareLoadStatus } from "./components/compare-load-status";
import type { SupportedLocale } from "@/domain/types/locale";

type Props = { locale: SupportedLocale };

export const ComparePage = observer(({ locale }: Props) => {
  const { t } = useTranslation();
  const comparison = useContainer().get(ComparisonStore);
  const store = useMemo(
    () => new ComparePageStore(comparison, locale),
    [comparison, locale],
  );
  useEffect(() => store.watchProducts(), [store]);
  return (
    <ComparePageContext.Provider value={store}>
      <main {...stylex.props(layoutStyles.page, styles.page)}>
        <div {...stylex.props(store.isCategoryOpen && styles.desktopOnly)}>
          <Navbar hideMobileSearch />
          <header {...stylex.props(layoutStyles.contentRail, styles.header)}>
            <h1 {...stylex.props(styles.title)}>{t("compare.title")}</h1>
          </header>
          <CompareCategories />
        </div>
        {(!comparison.isHydrated || store.isLoading) && <SectionLoader />}
        <CompareLoadStatus />
        {comparison.isHydrated && comparison.count === 0 && (
          <CompareEmptyState />
        )}
        {store.loadedProducts.length > 0 && (
          <div
            {...stylex.props(
              styles.content,
              !store.isCategoryOpen && styles.desktopOnly,
            )}
          >
            <CompareMobileHeader />
            <CompareControls />
            <CompareTable />
          </div>
        )}
        <div {...stylex.props(styles.footer, styles.desktopOnly)}>
          <Footer />
        </div>
        <div {...stylex.props(store.isCategoryOpen && styles.desktopOnly)}>
          <MobileTabbar activeItem="compare" respectSafeArea />
        </div>
      </main>
    </ComparePageContext.Provider>
  );
});
