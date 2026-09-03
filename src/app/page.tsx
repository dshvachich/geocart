import { MainPage } from '@/app-shell/pages/main/main-page'
import { getHomePageData } from '@/data/home-page'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const homePageData = await getHomePageData()

  return (
    <MainPage
      categories={homePageData.categories}
      products={homePageData.products}
    />
  )
}
