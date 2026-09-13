import { makeAutoObservable, runInAction } from "mobx";
import { type SearchSuggestion, SearchSuggestionType } from "@/domain/entities";
import { normalizeLocale } from "@/domain/types/locale";
import i18n from "@/i18n";
import { createProductHref } from '@/utils/product-url-utils';

type SuggestionsResponse = {
  suggestions?: SearchSuggestion[];
};

const SEARCH_LIMIT = 6;

export class SearchBoxStore {
  isOpen = false;
  query = "";
  suggestions: SearchSuggestion[] = [];
  hasLoadedSuggestions = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get trimmedQuery() {
    return this.query.trim();
  }

  get hasEmptySuggestions() {
    return (
      this.isOpen &&
      this.trimmedQuery.length > 0 &&
      this.hasLoadedSuggestions &&
      this.suggestions.length === 0
    );
  }

  get productSuggestions() {
    return this.suggestions.filter(
      (suggestion) => suggestion.type === SearchSuggestionType.product,
    );
  }

  get categorySuggestions() {
    return this.suggestions.filter(
      (suggestion) => suggestion.type === SearchSuggestionType.category,
    );
  }

  openSearch() {
    this.isOpen = true;
  }

  closeSearch() {
    this.isOpen = false;
    this.suggestions = [];
    this.hasLoadedSuggestions = false;
  }

  openProduct(slug: string, navigate: (href: string) => void) {
    this.closeSearch();
    navigate(createProductHref(slug));
  }

  updateQuery(value: string) {
    if (value.trim() !== this.trimmedQuery) {
      this.suggestions = [];
      this.hasLoadedSuggestions = false;
    }

    this.query = value;
  }

  async loadSuggestions(query: string, signal: AbortSignal) {
    this.hasLoadedSuggestions = false;

    const params = new URLSearchParams({
      q: query,
      limit: String(SEARCH_LIMIT),
      locale: normalizeLocale(i18n.resolvedLanguage ?? i18n.language),
    });

    try {
      const response = await fetch(
        `/api/search/suggestions?${params.toString()}`,
        {
          signal,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load search suggestions");
      }

      const payload = (await response.json()) as SuggestionsResponse;

      runInAction(() => {
        if (signal.aborted || this.trimmedQuery !== query) {
          return;
        }

        this.suggestions = payload.suggestions ?? [];
        this.hasLoadedSuggestions = true;
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      runInAction(() => {
        if (signal.aborted || this.trimmedQuery !== query) {
          return;
        }

        this.suggestions = [];
      });
    }
  }
}
