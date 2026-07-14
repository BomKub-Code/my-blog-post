import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import HomePage from './pages/HomePage'
import ViewPostPage from './pages/ViewPostPage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'

// กำหนดเส้นทาง (routes) ทั้งหมดของแอป และวาง Toaster ไว้นอก Routes
// เพื่อให้ toast notification (เช่นตอนกด copy link) แสดงได้จากทุกหน้า
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* :postId เป็น dynamic param อ่านค่าด้วย useParams() ใน ViewPostPage */}
        <Route path="/post/:postId" element={<ViewPostPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  )
}

export default App
