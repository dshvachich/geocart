import { NextResponse } from 'next/server'
import { catalogRepository } from '@/data/repositories'
import { normalizeLocale } from '@/domain/types/locale'

export const dynamic = 'force-dynamic'

const DEFAULT_LIMIT = 6
const MAX_LIMIT = 50

const parseLimit = (value: string | null) => {
  const parsed = Number(value)

  if (!Number.isFinite(parsed)) {
    return DEFAULT_LIMIT
  }

  return Math.min(Math.max(Math.trunc(parsed), 1), MAX_LIMIT)
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')?.trim() ?? ''
  const locale = normalizeLocale(
    url.searchParams.get('locale') ?? request.headers.get('accept-language'),
  )

  if (!query) {
    return NextResponse.json({ suggestions: [] })
  }

  const suggestions = await catalogRepository.getSearchSuggestions({
    query,
    locale,
    limit: parseLimit(url.searchParams.get('limit')),
  })

  return NextResponse.json({ suggestions })
}
