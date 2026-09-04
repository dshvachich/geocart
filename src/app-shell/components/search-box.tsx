"use client";

import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { createSearchHref } from "@/utils/search-query-utils";
import { SearchBoxField } from "./search-box/search-box-field";
import { SearchBoxOverlay } from "./search-box/search-box-overlay";
import type { SearchNavigationParams } from "./search-box/search-box.types";
import { SearchBoxStore } from "./search-box.store";

export const SearchBox = observer(() => {
  const router = useRouter();
  const searchStore = useMemo(() => new SearchBoxStore(), []);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpen = searchStore.isOpen;
  const query = searchStore.query;
  const trimmedQuery = searchStore.trimmedQuery;
  const productSuggestions = searchStore.productSuggestions;
  const categorySuggestions = searchStore.categorySuggestions;

  const navigateToSearch = useCallback(
    ({ category, query }: SearchNavigationParams) => {
      const trimmedSearchQuery = query.trim();

      if (!trimmedSearchQuery) {
        return;
      }

      router.push(
        createSearchHref({
          category,
          q: trimmedSearchQuery,
        }),
      );
      searchStore.closeSearch();
    },
    [router, searchStore],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        searchStore.closeSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, searchStore]);

  useEffect(() => {
    if (!isOpen || !trimmedQuery) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      void searchStore.loadSuggestions(trimmedQuery, controller.signal);
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, searchStore, trimmedQuery]);

  return (
    <>
      <SearchBoxField
        value={query}
        variant="navbar"
        onChange={searchStore.updateQuery}
        onFocus={searchStore.openSearch}
        onSubmit={() => navigateToSearch({ query })}
      />

      {isOpen && (
        <SearchBoxOverlay
          categorySuggestions={categorySuggestions}
          inputRef={inputRef}
          productSuggestions={productSuggestions}
          query={query}
          trimmedQuery={trimmedQuery}
          onChange={searchStore.updateQuery}
          onClose={searchStore.closeSearch}
          onSearch={navigateToSearch}
        />
      )}
    </>
  );
});
