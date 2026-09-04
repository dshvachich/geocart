import { makeAutoObservable, runInAction } from "mobx";
import { type SearchSuggestion, SearchSuggestionType } from "@/domain/entities";
import { normalizeLocale } from "@/domain/types/locale";
import i18n from "@/i18n";

type SuggestionsResponse = {
  suggestions?: SearchSuggestion[];
};

const SEARCH_LIMIT = 6;

export class SearchBoxStore {
  isOpen = false;
  query = "";
  suggestions: SearchSuggestion[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get trimmedQuery() {
    return this.query.trim();
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
  }

  updateQuery(value: string) {
    this.query = value;

    if (!value.trim()) {
      this.suggestions = [];
    }
  }

  async loadSuggestions(query: string, signal: AbortSignal) {
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
      const payload = (await response.json()) as SuggestionsResponse;

      runInAction(() => {
        if (this.trimmedQuery !== query) {
          return;
        }

        this.suggestions = payload.suggestions ?? [];
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      runInAction(() => {
        if (this.trimmedQuery !== query) {
          return;
        }

        this.suggestions = [];
      });
    }
  }
}
