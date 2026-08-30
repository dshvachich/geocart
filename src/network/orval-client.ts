import type { AxiosError, AxiosRequestConfig } from 'axios'
import { httpClient } from './http-client'

export type ErrorType<Error> = AxiosError<Error>
export type BodyType<BodyData> = BodyData

export const orvalClient = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const response = await httpClient.request<T>({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
    },
  })

  return response.data
}
