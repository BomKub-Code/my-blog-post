import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FileText, Folder, User, Bell, KeyRound, ExternalLink, LogOut, Users, Menu, X } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { label: 'Article management', icon: <FileText className="size-4" />, path: '/admin/articles' },
    { label: 'Member management', icon: <Users className="size-4" />, path: '/admin/members' },
    { label: 'Category management', icon: <Folder className="size-4" />, path: '/admin/categories' },
    { label: 'Profile', icon: <User className="size-4" />, path: '/admin/profile' },
    { label: 'Notification', icon: <Bell className="size-4" />, path: '/admin/notifications' },
    { label: 'Reset password', icon: <KeyRound className="size-4" />, path: '/admin/reset-password' },
  ]

  return (
    <div className="min-h-screen bg-[#f1f2f4] dark:bg-[var(--bg)] transition-colors">
      
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#efefef] dark:bg-[var(--code-bg)] text-sm font-medium border-r border-[var(--border)] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-8 pb-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-[var(--text-h)]">hh.</h1>
            <span className="mt-1 text-sm font-semibold text-orange-400">Admin panel</span>
          </div>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="size-6" />
          </button>
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? 'bg-[#e2e2e2] dark:bg-white/10 text-gray-900 dark:text-white font-semibold'
                    : 'text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-300 dark:border-gray-700 p-4 space-y-1">
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="flex w-full items-center gap-3 px-4 py-3 rounded-md text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ExternalLink className="size-4" />
            hh. website
          </button>
          <button 
            type="button" 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-md text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col lg:ml-64 min-h-screen">
        {/* Mobile Header (Hamburger Menu) */}
        <header className="lg:hidden flex items-center p-4 border-b border-[var(--border)] bg-[#f1f2f4] dark:bg-[var(--bg)] sticky top-0 z-10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5 rounded-md"
          >
            <Menu className="size-6" />
          </button>
          <span className="ml-4 font-semibold text-gray-900 dark:text-[var(--text-h)]">Admin panel</span>
        </header>

        <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
