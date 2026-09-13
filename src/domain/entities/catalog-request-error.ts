export type CatalogRequestErrorKind = 'invalid-request' | 'not-found'

export class CatalogRequestError extends Error {
  constructor(
    readonly kind: CatalogRequestErrorKind,
    readonly code: string,
    message: string,
    readonly data?: Record<string, unknown>,
  ) {
    super(message)
    this.name = 'CatalogRequestError'
  }
}
