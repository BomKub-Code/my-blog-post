import { NavBar, HeroSection, Footer } from '@/components/Layout'
import ArticleSection from '@/components/ArticleSection'

// หน้าแรกของแอป ประกอบร่างจาก section ย่อยต่างๆ ตามลำดับที่ต้องการแสดงผล
// ตัว HomePage เองไม่มี state/logic ใดๆ ทำหน้าที่แค่จัดวาง component เท่านั้น
function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </>
  )
}

export default HomePage
