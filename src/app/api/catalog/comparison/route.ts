import { NextResponse } from "next/server";
import { comparisonProductsRepository } from "@/data/repositories/comparison-products.repository";
import { normalizeLocale } from "@/domain/types/locale";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const values = url.searchParams.get("ids")?.split(",") ?? [];
  const ids = [...new Set(values.map(Number))];
  if (
    !ids.length ||
    ids.length > 24 ||
    ids.some((id) => !Number.isSafeInteger(id) || id <= 0)
  ) {
    return NextResponse.json(
      { message: "Expected 1–24 positive product IDs" },
      { status: 400 },
    );
  }
  const locale = normalizeLocale(url.searchParams.get("locale"));
  const result = await comparisonProductsRepository.getProducts(ids, locale);
  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}
