import type { Error as ErrorDto } from '@/data/openapi/models'
import {
  CatalogRequestError,
  type CatalogRequestErrorKind,
} from '@/domain/entities/catalog-request-error'

export const ErrorDtoToCatalogRequestErrorMapperExtension = {
  toEntity(error: ErrorDto, kind: CatalogRequestErrorKind): CatalogRequestError {
    return new CatalogRequestError(kind, error.code, error.message, error.data)
  },
}
