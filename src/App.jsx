import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/lib/AuthContext'
import HomePage from './pages/HomePage'
import ViewPostPage from './pages/ViewPostPage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import FrontendLayout from './components/FrontendLayout'
import AdminLayout from './components/AdminLayout'
import ArticleManagementPage from './pages/admin/ArticleManagementPage'
import CreateArticlePage from './pages/admin/CreateArticlePage'
import MemberManagementPage from './pages/admin/MemberManagementPage'
import CategoryManagementPage from './pages/admin/CategoryManagementPage'
import CreateCategoryPage from './pages/admin/CreateCategoryPage'

import UserSettingsLayout from './components/UserSettingsLayout'
import ProfilePage from './pages/user/ProfilePage'
import ResetPasswordPage from './pages/user/ResetPasswordPage'

// กำหนดเส้นทาง (routes) ทั้งหมดของแอป และวาง Toaster ไว้นอก Routes
// เพื่อให้ toast notification (เช่นตอนกด copy link) แสดงได้จากทุกหน้า
function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<FrontendLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:postId" element={<ViewPostPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LogInPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ArticleManagementPage />} />
              <Route path="articles" element={<ArticleManagementPage />} />
              <Route path="articles/create" element={<CreateArticlePage />} />
              <Route path="members" element={<MemberManagementPage />} />
              <Route path="categories" element={<CategoryManagementPage />} />
              <Route path="categories/create" element={<CreateCategoryPage />} />
              
              {/* Placeholder routes for navigation items */}
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notifications" element={<div className="p-8">Notifications Coming Soon</div>} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* User Settings Routes */}
            <Route path="/settings" element={<UserSettingsLayout />}>
              <Route index element={<ProfilePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
            </Route>
          </Routes>
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
