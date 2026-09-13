import { NextResponse } from 'next/server'
import { CatalogRequestError } from '@/domain/entities/catalog-request-error'

export const createCatalogErrorResponse = (error: unknown) => {
  if (!(error instanceof CatalogRequestError)) {
    throw error
  }

  return NextResponse.json(
    { code: error.code, message: error.message, data: error.data },
    { status: error.kind === 'not-found' ? 404 : 400 },
  )
}
