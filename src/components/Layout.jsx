import { Menu } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { SiGithub, SiGoogle } from 'react-icons/si'
import { Link } from 'react-router-dom'
import heroImage from '../assets/img1.jpg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <Link to="/" className="text-lg font-semibold text-(--text-h)">
        hh.
      </Link>

      <div className="hidden items-center gap-3 sm:flex">
        <Link
          to="/login"
          className="rounded-full border border-(--border) px-5 py-2 text-sm font-medium text-(--text-h) hover:bg-black/5"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/80"
        >
          Sign up
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex size-9 items-center justify-center rounded-full hover:bg-black/5 sm:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5 text-(--text-h)" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-(--anchor-width) min-w-56 p-2">
          <DropdownMenuItem
            render={<Link to="/login" />}
            className="justify-center rounded-full border border-(--border) py-2.5 text-sm font-medium text-(--text-h)"
          >
            Log in
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link to="/signup" />}
            className="mt-2 justify-center rounded-full bg-black py-2.5 text-sm font-medium text-white focus:bg-black/80 focus:text-white"
          >
            Sign up
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

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
          src={heroImage}
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

function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-between border-t border-[var(--border)] px-6 py-6 text-sm text-[var(--text-h)]">
      <span>Get in touch</span>
      <div className="flex items-center gap-3">
        <a
          href="#"
          aria-label="LinkedIn"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
        >
          <FaLinkedin size={14} />
        </a>
        <a
          href="#"
          aria-label="GitHub"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
        >
          <SiGithub size={14} />
        </a>
        <a
          href="#"
          aria-label="Google"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
        >
          <SiGoogle size={14} />
        </a>
      </div>
      <Link to="/" className="underline underline-offset-2">
        Home page
      </Link>
    </footer>
  )
}

export { NavBar, HeroSection, Footer }
