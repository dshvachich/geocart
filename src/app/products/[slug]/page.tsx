import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ProductPage } from "@/app-shell/pages/product/product-page";
import { getRequestLocale } from "@/app/locale";
import {
  getProductPageData,
  getProductRecommendations,
} from "@/data/product-page";
import { CatalogRequestError } from "@/domain/entities/catalog-request-error";
import { createProductHref } from "@/utils/product-url-utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const loadProduct = async (params: Props["params"]) => {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const product = await getProductPageData(slug, locale).catch(
    (error: unknown) => {
      if (error instanceof CatalogRequestError && error.kind === "not-found") {
        notFound();
      }
      throw error;
    },
  );
  return { product, slug, locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await loadProduct(params);
  return {
    title: `${product.name} — Geocart`,
    description: product.description || undefined,
    alternates: { canonical: createProductHref(product.slug) },
  };
}

export default async function ProductRoute({ params }: Props) {
  const { product, slug, locale } = await loadProduct(params);
  if (product.slug !== slug) {
    permanentRedirect(createProductHref(product.slug));
  }
  const recommendations = await getProductRecommendations(locale);
  return (
    <ProductPage
      key={product.id}
      product={product}
      recommendations={recommendations}
      locale={locale}
    />
  );
}
