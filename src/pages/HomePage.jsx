import { NavBar, HeroSection, Footer } from '@/components/Layout'
import ArticleSection from '@/components/ArticleSection'
import LatestArticles from '@/components/LatestArticles'

function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <LatestArticles />
      <Footer />
    </>
  )
}

export default HomePage
