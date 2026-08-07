"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, KeyRound } from 'lucide-react'
import { NavBar } from '@/components/Layout'

export default function UserSettingsLayout({ children }) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Profile', icon: <User className="size-4" />, path: '/settings/profile' },
    { label: 'Reset password', icon: <KeyRound className="size-4" />, path: '/settings/reset-password' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f2f4] dark:bg-[var(--bg)] transition-colors">
      <NavBar />
      
      <div className="flex flex-1 mx-auto w-full max-w-7xl pt-8 px-4 sm:px-6 lg:px-8 gap-12">
        {/* Left Sidebar Menu */}
        <aside className="hidden w-64 flex-col sm:flex animate-in fade-in slide-in-from-left-4 duration-500">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'text-gray-900 dark:text-white font-semibold'
                      : 'text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-2xl">
          {children}
        </main>
      </div>
    </div>
  )
}
