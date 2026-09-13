import type { ProductOffer } from "@/domain/entities/product-details";

export const getBestProductOffer = (offers: ProductOffer[]) =>
  offers.reduce<ProductOffer | undefined>(
    (best, offer) => (!best || offer.price < best.price ? offer : best),
    undefined,
  );

export const getOfferDiscount = (offer: ProductOffer) =>
  offer.originalPrice > offer.price && offer.originalPrice > 0
    ? Math.round((1 - offer.price / offer.originalPrice) * 100)
    : 0;

export const getOfferPriceDifference = (
  offer: ProductOffer,
  best: ProductOffer,
) => (best.price > 0 ? Math.round((offer.price / best.price - 1) * 100) : 0);
