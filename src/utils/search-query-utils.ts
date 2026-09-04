export const SEARCH_PAGE_PATH = '/search'
export const SEARCH_FILTERS_PAGE_PATH = '/search/filters'

export type RouteSearchParams = Record<
  string,
  string | string[] | undefined
>

export type SearchQueryParams = Record<string, string | undefined>

const RESERVED_SEARCH_PARAM_KEYS = new Set([
  'category',
  'cursor',
  'limit',
  'q',
  'sort',
  'sortOrder',
])

const toSingleValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

const isPresentParamValue = (
  value: string | undefined,
): value is string => value !== undefined && value.trim().length > 0

export const normalizeSearchParams = (
  params: RouteSearchParams | undefined,
): SearchQueryParams => {
  if (!params) {
    return {}
  }

  return Object.entries(params).reduce<SearchQueryParams>(
    (accumulator, [key, value]) => {
      const normalizedValue = toSingleValue(value)

      if (!isPresentParamValue(normalizedValue)) {
        return accumulator
      }

      accumulator[key] = normalizedValue
      return accumulator
    },
    {},
  )
}

export const getSearchFilterParams = (params: SearchQueryParams) =>
  Object.entries(params).reduce<Record<string, string>>(
    (accumulator, [key, value]) => {
      if (RESERVED_SEARCH_PARAM_KEYS.has(key) || !isPresentParamValue(value)) {
        return accumulator
      }

      accumulator[key] = value
      return accumulator
    },
    {},
  )

export const createSearchHref = (
  params: SearchQueryParams,
  path = SEARCH_PAGE_PATH,
) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (isPresentParamValue(value)) {
      searchParams.set(key, value)
    }
  })

  const query = searchParams.toString()

  if (!query) {
    return path
  }

  return `${path}?${query}`
}

export const removeSearchParam = (
  params: SearchQueryParams,
  key: string,
) => {
  const nextParams = { ...params }

  delete nextParams[key]
  return nextParams
}

export const setSearchParam = (
  params: SearchQueryParams,
  key: string,
  value: string | undefined,
) => {
  const nextParams = { ...params }

  if (!isPresentParamValue(value)) {
    delete nextParams[key]
    return nextParams
  }

  nextParams[key] = value
  delete nextParams.cursor
  return nextParams
}

export const toggleCommaSeparatedSearchParam = ({
  key,
  params,
  value,
}: {
  key: string
  params: SearchQueryParams
  value: string
}) => {
  const currentValues =
    params[key]
      ?.split(',')
      .map((item) => item.trim())
      .filter(Boolean) ?? []
  const hasValue = currentValues.includes(value)
  const nextValues = hasValue
    ? currentValues.filter((item) => item !== value)
    : [...currentValues, value]

  return setSearchParam(params, key, nextValues.join(','))
}
