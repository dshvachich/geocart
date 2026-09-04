"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useRef } from "react";
import * as stylex from "@stylexjs/stylex";
import { controlStyles, iconStyles } from "@/app-shell/styles/shared.styles";
import type { SearchSuggestion } from "@/domain/entities";
import { createSearchHref } from "@/utils/search-query-utils";
import { uiAssets } from "./assets";
import { SearchBoxStore } from "./search-box.store";

const getSuggestionLabel = (suggestion: SearchSuggestion) =>
  suggestion.label?.trim() || suggestion.id;

const splitCategoryLabel = (label: string, query: string) => {
  const normalizedQuery = query.trim();

  if (
    !normalizedQuery ||
    !label.toLowerCase().startsWith(normalizedQuery.toLowerCase())
  ) {
    return {
      prefix: "",
      suffix: label,
    };
  }

  return {
    prefix: label.slice(0, normalizedQuery.length),
    suffix: label.slice(normalizedQuery.length),
  };
};

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
    ({ category, query }: { category?: string; query: string }) => {
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
      <form
        {...stylex.props(styles.field, styles.navbarField)}
        role="search"
        aria-label="Search products"
        onSubmit={(event) => {
          event.preventDefault();
          navigateToSearch({ query });
        }}
      >
        <Image
          {...stylex.props(iconStyles.icon)}
          src={uiAssets.search}
          alt=""
          width={24}
          height={24}
        />
        <input
          {...stylex.props(styles.input)}
          placeholder="Search products"
          value={query}
          onChange={(event) => searchStore.updateQuery(event.target.value)}
          onFocus={searchStore.openSearch}
        />
      </form>

      {isOpen && (
        <div
          {...stylex.props(styles.overlay)}
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              searchStore.closeSearch();
            }
          }}
        >
          <div {...stylex.props(styles.overlayBar)}>
            <form
              {...stylex.props(styles.field, styles.overlayField)}
              role="search"
              aria-label="Search products"
              onSubmit={(event) => {
                event.preventDefault();
                navigateToSearch({ query });
              }}
            >
              <Image
                {...stylex.props(iconStyles.icon)}
                src={uiAssets.search}
                alt=""
                width={24}
                height={24}
              />
              <input
                {...stylex.props(styles.input)}
                ref={inputRef}
                placeholder="Search products"
                value={query}
                onChange={(event) =>
                  searchStore.updateQuery(event.target.value)
                }
              />
            </form>
            <button
              {...stylex.props(controlStyles.iconButton, styles.closeButton)}
              type="button"
              aria-label="Close search"
              onClick={searchStore.closeSearch}
            >
              <Image
                {...stylex.props(iconStyles.icon)}
                src={uiAssets.close}
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>

          {trimmedQuery && (
            <div {...stylex.props(styles.hints)}>
              <div {...stylex.props(styles.hintHeading)}>Products</div>
              {productSuggestions.map((suggestion) => (
                <button
                  {...stylex.props(styles.hintRow)}
                  key={`${suggestion.type}-${suggestion.id}`}
                  type="button"
                  onClick={() =>
                    navigateToSearch({
                      query: getSuggestionLabel(suggestion),
                    })
                  }
                >
                  {getSuggestionLabel(suggestion)}
                </button>
              ))}

              {productSuggestions.length > 0 &&
                categorySuggestions.length > 0 && (
                  <div {...stylex.props(styles.hintDivider)} />
                )}

              {categorySuggestions.length > 0 && (
                <div {...stylex.props(styles.hintHeading)}>Categories</div>
              )}
              {categorySuggestions.map((suggestion) => {
                const label = getSuggestionLabel(suggestion);
                const { prefix, suffix } = splitCategoryLabel(
                  label,
                  trimmedQuery,
                );

                return (
                  <button
                    {...stylex.props(styles.hintRow, styles.categorySuggestion)}
                    key={`${suggestion.type}-${suggestion.id}`}
                    type="button"
                    onClick={() =>
                      navigateToSearch({
                        category: suggestion.id,
                        query: trimmedQuery,
                      })
                    }
                  >
                    {prefix && (
                      <span {...stylex.props(styles.categorySuggestionPrefix)}>
                        {prefix}
                      </span>
                    )}
                    <span {...stylex.props(styles.categorySuggestionName)}>
                      {suffix}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
});

const styles = stylex.create({
  field: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "center",
    gap: 4,
    minWidth: 160,
    height: 40,
    padding: "8px 12px",
    borderRadius: 34,
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-fg-secondary)",
  },
  navbarField: {
    minWidth: {
      default: null,
      "@media (max-width: 760px)": 0,
    },
  },
  overlayField: {
    backgroundColor: {
      default: "var(--color-bg-primary)",
      "@media (max-width: 760px)": "var(--color-bg-secondary)",
    },
  },
  input: {
    width: "100%",
    minWidth: 0,
    borderWidth: 0,
    outlineWidth: 0,
    backgroundColor: "transparent",
    color: "var(--color-fg-primary)",
    fontSize: 16,
    lineHeight: "24px",
    "::placeholder": {
      color: "var(--color-fg-secondary)",
    },
  },
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 60,
    overflowY: "auto",
    backgroundColor: {
      default: "var(--color-overlay)",
      "@media (max-width: 760px)": "var(--color-bg-primary)",
    },
  },
  overlayBar: {
    position: {
      default: "absolute",
      "@media (max-width: 760px)": "static",
    },
    top: {
      default: 16,
      "@media (max-width: 760px)": null,
    },
    left: {
      default: "calc((100vw - var(--layout-max-width)) / 2 + 313px)",
      "@media (max-width: 1180px)": "50%",
      "@media (max-width: 760px)": null,
    },
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    width: {
      default: 705,
      "@media (max-width: 1180px)": "min(705px, calc(100vw - 32px))",
      "@media (max-width: 760px)": "100%",
    },
    maxWidth: {
      default: "calc(100vw - 32px)",
      "@media (max-width: 760px)": 760,
    },
    marginInline: {
      default: null,
      "@media (max-width: 760px)": "auto",
    },
    padding: {
      default: 0,
      "@media (max-width: 760px)": "8px 16px",
    },
    transform: {
      default: null,
      "@media (max-width: 1180px)": "translateX(-50%)",
      "@media (max-width: 760px)": "none",
    },
  },
  closeButton: {
    flex: "0 0 auto",
    display: {
      default: "none",
      "@media (max-width: 760px)": "inline-flex",
    },
  },
  hints: {
    position: {
      default: "absolute",
      "@media (max-width: 760px)": "static",
    },
    top: {
      default: 64,
      "@media (max-width: 760px)": null,
    },
    left: {
      default: "calc((100vw - var(--layout-max-width)) / 2 + 313px)",
      "@media (max-width: 1180px)": "50%",
      "@media (max-width: 760px)": null,
    },
    width: {
      default: 705,
      "@media (max-width: 1180px)": "min(705px, calc(100vw - 32px))",
      "@media (max-width: 760px)": "100%",
    },
    maxWidth: {
      default: "calc(100vw - 32px)",
      "@media (max-width: 760px)": 760,
    },
    marginInline: {
      default: null,
      "@media (max-width: 760px)": "auto",
    },
    padding: {
      default: "12px 0",
      "@media (max-width: 760px)": "8px 0 24px",
    },
    borderRadius: {
      default: 20,
      "@media (max-width: 760px)": 0,
    },
    backgroundColor: "var(--color-bg-primary)",
    transform: {
      default: null,
      "@media (max-width: 1180px)": "translateX(-50%)",
      "@media (max-width: 760px)": "none",
    },
  },
  hintHeading: {
    padding: {
      default: "4px 20px",
      "@media (max-width: 760px)": "4px 16px",
    },
    color: "var(--color-fg-secondary)",
    fontSize: 12,
    lineHeight: "20px",
  },
  hintRow: {
    display: "block",
    width: "100%",
    minHeight: {
      default: 48,
      "@media (max-width: 760px)": 40,
    },
    padding: {
      default: "12px 20px",
      "@media (max-width: 760px)": "10px 16px",
    },
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": "var(--color-bg-secondary)",
      ":focus-visible": "var(--color-bg-secondary)",
    },
    color: "var(--color-fg-primary)",
    fontSize: {
      default: 16,
      "@media (max-width: 760px)": 14,
    },
    fontWeight: 500,
    lineHeight: {
      default: "24px",
      "@media (max-width: 760px)": "20px",
    },
    textAlign: "left",
    outline: {
      default: null,
      ":hover": 0,
      ":focus-visible": 0,
    },
  },
  hintDivider: {
    height: 1,
    margin: {
      default: "8px 20px",
      "@media (max-width: 760px)": "8px 16px",
    },
    borderRadius: 16,
    backgroundColor: "var(--color-divider-light)",
  },
  categorySuggestion: {
    display: "flex",
    gap: 4,
  },
  categorySuggestionPrefix: {
    fontWeight: 500,
  },
  categorySuggestionName: {
    fontWeight: 600,
  },
});
