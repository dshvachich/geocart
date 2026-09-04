import { HomePage } from '@/app-shell/pages/main/home-page'
import { getRequestLocale } from '@/app/locale'
import { getInitialHomePageData } from '@/data/home-page'

export const dynamic = 'force-dynamic'

export default async function HomeRoute() {
  const locale = await getRequestLocale()
  const initialHomePageData = await getInitialHomePageData({ locale })

  return <HomePage initialData={initialHomePageData} />
}
