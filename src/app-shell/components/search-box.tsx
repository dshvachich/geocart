"use client";

import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createSearchHref } from "@/utils/search-query-utils";
import { SearchBoxField } from "./search-box/search-box-field";
import { SearchBoxOverlay } from "./search-box/search-box-overlay";
import { SearchBoxStore } from "./search-box/search-box.store";
import type {
  SearchBoxAnchorRect,
  SearchNavigationParams,
} from "./search-box/search-box.types";

export const SearchBox = observer(() => {
  const router = useRouter();
  const searchStore = useMemo(() => new SearchBoxStore(), []);
  const fieldRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [anchorRect, setAnchorRect] = useState<SearchBoxAnchorRect | null>(
    null,
  );
  const isOpen = searchStore.isOpen;
  const query = searchStore.query;
  const trimmedQuery = searchStore.trimmedQuery;
  const productSuggestions = searchStore.productSuggestions;
  const categorySuggestions = searchStore.categorySuggestions;

  const updateAnchorRect = useCallback(() => {
    const field = fieldRef.current;

    if (!field) {
      return;
    }

    const rect = field.getBoundingClientRect();

    setAnchorRect({
      height: rect.height,
      left: rect.left,
      top: rect.top,
      width: rect.width,
    });
  }, []);

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

  const openSearch = useCallback(() => {
    updateAnchorRect();
    searchStore.openSearch();
  }, [searchStore, updateAnchorRect]);

  useLayoutEffect(() => {
    if (!isOpen) {
      setAnchorRect(null);
      return;
    }

    updateAnchorRect();
  }, [isOpen, updateAnchorRect]);

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

    window.addEventListener("resize", updateAnchorRect);
    window.addEventListener("scroll", updateAnchorRect, { passive: true });

    return () => {
      window.removeEventListener("resize", updateAnchorRect);
      window.removeEventListener("scroll", updateAnchorRect);
    };
  }, [isOpen, updateAnchorRect]);

  useEffect(() => {
    const field = fieldRef.current;

    if (!isOpen || !field || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateAnchorRect);
    observer.observe(field);

    return () => observer.disconnect();
  }, [isOpen, updateAnchorRect]);

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
        fieldRef={fieldRef}
        value={query}
        variant="navbar"
        onChange={searchStore.updateQuery}
        onFocus={openSearch}
        onSubmit={() => navigateToSearch({ query })}
      />

      {isOpen && (
        <SearchBoxOverlay
          anchorRect={anchorRect}
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
