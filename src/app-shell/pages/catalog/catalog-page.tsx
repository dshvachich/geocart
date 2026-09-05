"use client";

import * as stylex from "@stylexjs/stylex";
import { Navbar } from "@/app-shell/components/navbar";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { CatalogPageData } from "@/domain/entities";
import { getCategoryPath } from "./catalog-page.helpers";
import { DesktopCatalog } from "./components/desktop-catalog";
import { MobileCatalogDetail } from "./components/mobile-catalog-detail";
import { MobileCatalogRoot } from "./components/mobile-catalog-root";

type CatalogPageProps = {
  data: CatalogPageData;
  selectedCategoryId?: string;
};

export const CatalogPage = ({ data, selectedCategoryId }: CatalogPageProps) => {
  const categoryPath = getCategoryPath(data.categories, selectedCategoryId);

  return (
    <main {...stylex.props(layoutStyles.page)}>
      <Navbar />

      {!categoryPath && <MobileCatalogRoot categories={data.categories} />}

      {categoryPath && (
        <MobileCatalogDetail
          categoryPath={categoryPath.path}
          selectedCategory={categoryPath.selectedCategory}
        />
      )}

      <DesktopCatalog
        categories={data.categories}
        categoryPath={categoryPath}
      />
    </main>
  );
};
