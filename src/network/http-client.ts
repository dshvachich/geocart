import axios, { type AxiosInstance } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.example.com'
const timeout = 15000

const serializeParams = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item))
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
