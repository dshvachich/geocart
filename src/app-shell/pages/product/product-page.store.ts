import { makeAutoObservable, runInAction } from "mobx";
import type { KeyboardEvent } from "react";
import type { FavoritesStore } from "@/app-shell/stores/favorites.store";
import type { ComparisonStore } from "@/app-shell/stores/comparison.store";
import type {
  ProductDetails,
  ProductVariantOption,
} from "@/domain/entities/product-details";
import {
  getBestProductOffer,
  getOfferDiscount,
} from "@/domain/helpers/product-details.helpers";
import { ProductDetailsToProductMapperExtension } from "@/domain/mappers/product-details.mapper";
import { createProductHref } from "@/utils/product-url-utils";
import type { ProductListResult } from "@/domain/entities/product";
import type { SupportedLocale } from "@/domain/types/locale";
import { browserProductListRepository } from "@/data/repositories/browser-product-list.repository";

export type ProductTab = "overview" | "prices" | "specifications";
const TABS: ProductTab[] = ["overview", "prices", "specifications"];

export class ProductPageStore {
  activeTab: ProductTab = "overview";
  activeImageIndex = 0;
  isDescriptionExpanded = false;
  collapsedGroups = new Set<string>();
  revealedPhones = new Set<number>();
  failedMerchantLogos = new Set<string>();
  shareStatus: "idle" | "copied" | "error" = "idle";
  recommendations: ProductListResult;
  isLoadingMore = false;
  hasLoadError = false;

  constructor(
    readonly product: ProductDetails,
    private readonly favorites: FavoritesStore,
    private readonly navigate: (href: string) => void,
    recommendations: ProductListResult,
    private readonly locale: SupportedLocale,
    private readonly comparison: ComparisonStore,
  ) {
    this.recommendations = recommendations;
    makeAutoObservable(this, { product: false }, { autoBind: true });
  }

  get activeImage() {
    return this.product.images[this.activeImageIndex];
  }
  get sortedOffers() {
    return [...this.product.offers].sort((a, b) => a.price - b.price);
  }
  get visibleOffers() {
    return this.activeTab === "overview"
      ? this.sortedOffers.slice(0, 3)
      : this.sortedOffers;
  }
  get bestOffer() {
    return getBestProductOffer(this.product.offers);
  }
  get discount() {
    return this.bestOffer ? getOfferDiscount(this.bestOffer) : 0;
  }
  get isFavorite() {
    return this.favorites.isFavorite(this.product.id);
  }
  get isCompared() {
    return this.comparison.hasProduct(this.product.id);
  }
  toggleComparison() {
    this.comparison.toggleProduct(this.product.id);
  }
  get moreProducts() {
    return this.recommendations.products.filter(
      (product) => product.id !== this.product.id,
    );
  }

  async loadMoreProducts() {
    if (this.isLoadingMore || !this.recommendations.cursor.next) {
      return;
    }
    this.isLoadingMore = true;
    this.hasLoadError = false;
    try {
      const result = await browserProductListRepository.getPopularProducts({
        cursor: this.recommendations.cursor.next,
        limit: 12,
        locale: this.locale,
      });
      runInAction(() => {
        const ids = new Set(
          this.recommendations.products.map((product) => product.id),
        );
        this.recommendations = {
          cursor: result.cursor,
          products: [
            ...this.recommendations.products,
            ...result.products.filter((product) => !ids.has(product.id)),
          ],
        };
      });
    } catch {
      runInAction(() => {
        this.hasLoadError = true;
      });
    } finally {
      runInAction(() => {
        this.isLoadingMore = false;
      });
    }
  }

  selectTab(tab: ProductTab) {
    this.activeTab = tab;
    if (typeof document === "undefined") {
      return;
    }
    const button = document.getElementById(`product-tab-${tab}`);
    const tablist = button?.parentElement;
    if (!button || !tablist) {
      return;
    }
    const buttonBounds = button.getBoundingClientRect();
    const listBounds = tablist.getBoundingClientRect();
    if (
      buttonBounds.left < listBounds.left ||
      buttonBounds.right > listBounds.right
    ) {
      tablist.scrollTo({
        left:
          tablist.scrollLeft +
          buttonBounds.left -
          listBounds.left -
          (listBounds.width - buttonBounds.width) / 2,
        behavior: "smooth",
      });
    }
  }
  showPrices() {
    this.showTab("prices");
  }
  showSpecifications() {
    this.showTab("specifications");
  }

  private showTab(tab: ProductTab) {
    this.selectTab(tab);
    document
      .getElementById("product-tabs")
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
    document
      .getElementById(`product-tab-${tab}`)
      ?.focus({ preventScroll: true });
  }

  handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = TABS.indexOf(this.activeTab);
    const next =
      event.key === "ArrowRight"
        ? TABS[(index + 1) % TABS.length]
        : event.key === "ArrowLeft"
          ? TABS[(index + TABS.length - 1) % TABS.length]
          : event.key === "Home"
            ? TABS[0]
            : event.key === "End"
              ? TABS[TABS.length - 1]
              : undefined;
    if (!next) {
      return;
    }
    event.preventDefault();
    this.selectTab(next);
    document.getElementById(`product-tab-${next}`)?.focus();
  }

  selectImage(index: number) {
    if (index < 0 || index >= this.product.images.length) {
      return;
    }
    this.activeImageIndex = index;
  }
  selectVariant(option: ProductVariantOption) {
    if (option.selected) {
      return;
    }
    this.navigate(createProductHref(option.slug));
  }
  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }
  toggleGroup(id: string) {
    if (this.collapsedGroups.has(id)) {
      this.collapsedGroups.delete(id);
      return;
    }
    this.collapsedGroups.add(id);
  }
  revealPhone(id: number) {
    this.revealedPhones.add(id);
  }
  hideMerchantLogo(src: string) {
    this.failedMerchantLogos.add(src);
  }
  toggleFavorite() {
    this.favorites.toggleProduct(
      ProductDetailsToProductMapperExtension.toEntity(this.product),
    );
  }

  async share() {
    this.shareStatus = "idle";
    try {
      const url = new URL(
        createProductHref(this.product.slug),
        window.location.origin,
      ).href;
      if (navigator.share) {
        await navigator.share({ title: this.product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      runInAction(() => {
        this.shareStatus = "copied";
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      runInAction(() => {
        this.shareStatus = "error";
      });
    }
  }
}
