import { CategoryBar } from "@/app-shell/components/category-bar";
import { Footer } from "@/app-shell/components/footer";
import { MobileTabbar } from "@/app-shell/components/mobile-tabbar";
import { Navbar } from "@/app-shell/components/navbar";
import { ProductGrid } from "@/app-shell/components/product-grid";
import { SectionLoader } from "@/app-shell/components/section-loader";
import { layoutStyles } from "@/app-shell/styles/shared.styles";
import type { HomePageData } from "@/domain/entities";
import * as stylex from "@stylexjs/stylex";

type HomePageProps = {
  initialData: HomePageData;
};

export const HomePage = ({ initialData }: HomePageProps) => (
  <main {...stylex.props(layoutStyles.page)}>
    <Navbar />
    <CategoryBar categories={initialData.categories} />
    <ProductGrid products={initialData.products} />
    <SectionLoader />
    <Footer />
    <MobileTabbar />
  </main>
);
