'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type SearchSuggestion, SearchSuggestionType } from '@/domain/entities'
import { uiAssets } from './assets'

type SuggestionsResponse = {
  suggestions?: SearchSuggestion[]
}

const SEARCH_LIMIT = 6

const getSuggestionLabel = (suggestion: SearchSuggestion) =>
  suggestion.label?.trim() || suggestion.id

const splitCategoryLabel = (label: string, query: string) => {
  const normalizedQuery = query.trim()

  if (
    !normalizedQuery ||
    !label.toLowerCase().startsWith(normalizedQuery.toLowerCase())
  ) {
    return {
      prefix: '',
      suffix: label,
    }
  }

  return {
    prefix: label.slice(0, normalizedQuery.length),
    suffix: label.slice(normalizedQuery.length),
  }
}

export const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const trimmedQuery = query.trim()

  const productSuggestions = useMemo(
    () =>
      suggestions.filter(
        (suggestion) => suggestion.type === SearchSuggestionType.product,
      ),
    [suggestions],
  )
  const categorySuggestions = useMemo(
    () =>
      suggestions.filter(
        (suggestion) => suggestion.type === SearchSuggestionType.category,
      ),
    [suggestions],
  )

  const updateQuery = useCallback((value: string) => {
    setQuery(value)

    if (!value.trim()) {
      setSuggestions([])
    }
  }, [])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setSuggestions([])
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeSearch, isOpen])

  useEffect(() => {
    if (!isOpen || !trimmedQuery) {
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      const params = new URLSearchParams({
        q: trimmedQuery,
        limit: String(SEARCH_LIMIT),
      })

      try {
        const response = await fetch(
          `/api/search/suggestions?${params.toString()}`,
          {
            signal: controller.signal,
          },
        )
        const payload = (await response.json()) as SuggestionsResponse

        setSuggestions(payload.suggestions ?? [])
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setSuggestions([])
        }
      }
    }, 180)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [isOpen, trimmedQuery])

  return (
    <>
      <label
        className="search-field navbar-search-field"
        aria-label="Search products"
      >
        <Image src={uiAssets.search} alt="" width={24} height={24} />
        <input
          placeholder="Search products"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </label>

      {isOpen && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSearch()
            }
          }}
        >
          <div className="search-overlay-bar">
            <label
              className="search-field search-overlay-field"
              aria-label="Search products"
            >
              <Image src={uiAssets.search} alt="" width={24} height={24} />
              <input
                ref={inputRef}
                placeholder="Search products"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />
            </label>
            <button
              className="icon-button search-close-button"
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
            >
              <Image src={uiAssets.close} alt="" width={24} height={24} />
            </button>
          </div>

          {trimmedQuery && (
            <div className="search-hints">
              <div className="search-hint-heading">Products</div>
              {productSuggestions.map((suggestion) => (
                <button
                  className="search-hint-row"
                  key={`${suggestion.type}-${suggestion.id}`}
                  type="button"
                >
                  {getSuggestionLabel(suggestion)}
                </button>
              ))}

              {productSuggestions.length > 0 &&
                categorySuggestions.length > 0 && (
                  <div className="search-hint-divider" />
                )}

              {categorySuggestions.length > 0 && (
                <div className="search-hint-heading">Categories</div>
              )}
              {categorySuggestions.map((suggestion) => {
                const label = getSuggestionLabel(suggestion)
                const { prefix, suffix } = splitCategoryLabel(
                  label,
                  trimmedQuery,
                )

                return (
                  <button
                    className="search-hint-row category-suggestion"
                    key={`${suggestion.type}-${suggestion.id}`}
                    type="button"
                  >
                    {prefix && (
                      <span className="category-suggestion-prefix">
                        {prefix}
                      </span>
                    )}
                    <span className="category-suggestion-name">{suffix}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </>
  )
}
