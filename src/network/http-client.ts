import axios, { type AxiosInstance } from 'axios'

const API_PREFIX = '/api'
const DEFAULT_API_BASE_URL = 'http://165.22.23.233:5555'
const timeout = 15000

const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, '')

const createBaseURL = (host: string) => {
  const normalizedHost = trimTrailingSlashes(host)

  if (normalizedHost.endsWith(API_PREFIX)) {
    return normalizedHost
  }

  return `${normalizedHost}${API_PREFIX}`
}

const baseURL = createBaseURL(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL,
)

const serializeParams = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return
    }

    if (Array.isArray(value)) {
      const items = value.filter((item) => item !== undefined && item !== null)

      if (items.length > 0) {
        searchParams.append(key, items.join(','))
      }
      return
    }

    if (typeof value === 'object') {
      Object.entries(value).forEach(([property, item]) => {
        if (item !== undefined && item !== null) {
          searchParams.append(`${key}[${property}]`, String(item))
        }
      })
      return
    }

    searchParams.append(key, String(value))
  })

  return searchParams.toString()
}

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: serializeParams,
  },
})
