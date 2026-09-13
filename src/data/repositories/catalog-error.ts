import { isAxiosError } from 'axios'
import { ErrorDtoToCatalogRequestErrorMapperExtension } from '@/data/mappers/catalog-error.mapper'
import type { Error as ErrorDto } from '@/data/openapi/models'

export const rethrowCatalogRequestError = (error: unknown): void => {
  if (!isAxiosError<ErrorDto>(error)) {
    return
  }

  const response = error.response

  if (!response || (response.status !== 400 && response.status !== 404)) {
    return
  }

  if (
    typeof response.data?.code !== 'string' ||
    typeof response.data?.message !== 'string'
  ) {
    throw error
  }

  throw ErrorDtoToCatalogRequestErrorMapperExtension.toEntity(
    response.data,
    response.status === 404 ? 'not-found' : 'invalid-request',
  )
}
