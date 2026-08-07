"use client"

import { Menu, Sun, Moon, LogOut, User, KeyRound, Bell, ChevronDown, ExternalLink } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { SiGithub, SiGoogle } from 'react-icons/si'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useAuth } from '@/lib/AuthContext'
import heroImage from '../assets/img1.jpg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex size-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] shadow-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="size-4.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}

function UserMenu({ user, logout }) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-4">
      {/* Notification Bell */}
      <button className="relative flex size-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
        <Bell className="size-4.5" />
        <span className="absolute top-2 right-2.5 size-1.5 rounded-full bg-red-500"></span>
      </button>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center gap-2 rounded-full border border-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors py-1 pl-1 pr-3"
          aria-label="User menu"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 border border-[var(--border)]">
            {/* If we have a real user image, we can put img here. For now, we use a placeholder or initials. The mockup shows a hippo image. Let's use it as a placeholder. */}
            <img 
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
              alt={user.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span className="hidden w-full h-full items-center justify-center text-sm font-bold uppercase bg-gray-200 dark:bg-gray-700 text-[var(--text-h)]">
              {user.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:block">
            {user.name}
          </span>
          <ChevronDown className="size-4 text-gray-500 dark:text-gray-400 hidden sm:block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 p-2 mt-1" align="end">
          <DropdownMenuItem asChild>
            <Link href="/settings/profile" className="flex items-center cursor-pointer">
              <User className="mr-3 size-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/settings/reset-password" className="flex items-center cursor-pointer">
              <KeyRound className="mr-3 size-4" />
              <span>Reset password</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center cursor-pointer">
              <ExternalLink className="mr-3 size-4" />
              <span>Admin panel</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logout()
              router.push('/login')
            }}
            className="cursor-pointer text-gray-900 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-white/10"
          >
            <LogOut className="mr-3 size-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// แถบเมนูบนสุด: โชว์ปุ่ม Log in / Sign up แบบเต็มบนจอกว้าง (sm ขึ้นไป)
// ส่วนจอเล็กจะซ่อนปุ่มแล้วใช้ dropdown menu (ไอคอน Menu) แทนเพื่อประหยัดพื้นที่
function NavBar() {
  const { user, logout } = useAuth()

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <Link href="/" className="text-lg font-semibold text-[var(--text-h)]">
        hh.
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {user ? (
          <UserMenu user={user} logout={logout} />
        ) : (
          <>
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/login"
                className="rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium text-[var(--text-h)] hover:bg-black/5 dark:hover:bg-white/10"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
              >
                Sign up
              </Link>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex size-9 items-center justify-center rounded-full hover:bg-black/5 sm:hidden dark:hover:bg-white/10"
                aria-label="Open menu"
              >
                <Menu className="size-5 text-[var(--text-h)]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--anchor-width)] min-w-56 p-2">
                <DropdownMenuItem
                  asChild
                  className="justify-center rounded-full border border-[var(--border)] py-2.5 text-sm font-medium text-[var(--text-h)]"
                >
                  <Link href="/login">Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="mt-2 justify-center rounded-full bg-black py-2.5 text-sm font-medium text-white focus:bg-black/80 focus:text-white dark:bg-white dark:text-black dark:focus:bg-white/80"
                >
                  <Link href="/signup">Sign up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  )
}

// ส่วน hero ด้านบนของหน้าแรก เป็น static content (ข้อความ+รูป) ล้วนๆ ไม่มี state
function HeroSection() {
  return (
    <section className="mx-6 mb-10 grid gap-8 rounded-3xl border border-(--border) p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
      <div className="flex flex-col justify-center gap-4 text-left">
        <p className="m-0! text-4xl leading-tight font-semibold text-(--text-h) lg:text-5xl">
          Stay Informed,
          <br />
          Stay Inspired
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-(--text)">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.3fr_1fr]">
        <img
          src={heroImage.src || heroImage}
          alt="Thompson P. with a cat"
          className="aspect-4/5 w-full rounded-2xl object-cover"
        />
        <div className="flex flex-col gap-3 text-left">
          <span className="text-xs text-(--text)">-Author</span>
          <span className="w-fit border-b border-(--text-h) pb-1 text-sm font-medium text-(--text-h)">
            Thompson P.
          </span>
          <p className="text-xs leading-relaxed text-(--text)">
            I am a pet enthusiast and freelance writer who specializes in
            animal behavior and care. With a deep love for cats, I enjoy
            sharing insights on feline companionship and wellness.
          </p>
          <p className="text-xs leading-relaxed text-(--text)">
            When I'm not writing, I spend time volunteering at my local
            animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </section>
  )
}

// ท้ายหน้า: ลิงก์ social (ยังไม่ผูก URL จริง เป็น href="#") กับลิงก์กลับหน้าแรก
function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-between border-t border-[var(--border)] px-6 py-6 text-sm text-[var(--text-h)]">
      <span>Get in touch</span>
      <div className="flex items-center gap-3">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black transition-colors"
        >
          <FaLinkedin size={14} />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black transition-colors"
        >
          <SiGithub size={14} />
        </a>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black transition-colors"
        >
          <SiGoogle size={14} />
        </a>
      </div>
      <Link href="/" className="underline underline-offset-2">
        Home page
      </Link>
    </footer>
  )
}

export { NavBar, HeroSection, Footer }
