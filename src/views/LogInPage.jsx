"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { NavBar } from '@/components/Layout'
import FormField from '@/components/FormField'
import { formInputClass } from '@/lib/utils'
import { useAuth } from '@/lib/AuthContext'
import { toast } from 'sonner'

function validate(values) {
  const errors = {}
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  if (!values.password) errors.password = 'Please enter your password.'
  return errors
}

function LogInPage() {
  const router = useRouter()
  const { user, login } = useAuth()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    
    const result = await login(values.email, values.password)
    
    if (!result.success) {
      setIsSubmitting(false)
      if (result.reason === 'not_found') {
        setErrors({ email: "We couldn't find an account with that email." })
        toast.error('Account not found')
      } else {
        setErrors({ password: 'Incorrect password. Please try again.' })
        toast.error('Incorrect password')
      }
      return
    }
    
    toast.success('Welcome back!')
    // router.push('/') // Not strictly needed if useEffect handles redirect, but good for UX
    router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] dark:bg-[var(--bg)] transition-colors">
      <NavBar />
      
      <main className="flex grow items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white dark:bg-[var(--code-bg)] shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10 lg:h-[720px] transition-all animate-in fade-in zoom-in-[0.98] duration-700 ease-out fill-mode-both">
          
          {/* Left: Illustration / Brand Panel (Desktop Only) */}
          <div className="relative hidden w-1/2 flex-col justify-between bg-black dark:bg-[#0a0a0a] p-12 lg:flex">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Workspace" 
                className="h-full w-full object-cover opacity-60 mix-blend-overlay dark:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black/90"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white tracking-tight">hh.</h2>
            </div>
            
            <div className="relative z-10 text-white">
              <blockquote className="text-2xl font-medium leading-relaxed">
                "Knowledge grows when it is shared. Join our community of writers and readers today."
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="size-10 rounded-full border-2 border-black bg-gray-200"></div>
                  <div className="size-10 rounded-full border-2 border-black bg-gray-300"></div>
                  <div className="size-10 rounded-full border-2 border-black bg-gray-400"></div>
                </div>
                <span className="text-sm font-medium text-gray-300">Join 10,000+ members</span>
              </div>
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-1/2 lg:p-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-[var(--text-h)] transition-colors">Welcome back</h1>
                <p className="mt-3 text-base text-gray-600 dark:text-[var(--text)] transition-colors">
                  Please enter your details to sign in.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <FormField label="Email" error={errors.email}>
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 size-5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange('email')}
                    className={formInputClass(Boolean(errors.email), true, false)}
                  />
                </FormField>

                <FormField label="Password" error={errors.password}>
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 size-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={values.password}
                    onChange={handleChange('password')}
                    className={formInputClass(Boolean(errors.password), true, true)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                  </button>
                </FormField>

                <div className="flex items-center justify-between mt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="size-4.5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-black dark:text-white focus:ring-black dark:focus:ring-white focus:ring-2 transition-colors cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-[var(--text)] group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
                  </label>
                  <button type="button" className="text-sm font-semibold text-black dark:text-white hover:underline underline-offset-4 transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-black dark:bg-white px-6 text-sm font-semibold text-white dark:text-black shadow-md hover:bg-gray-900 dark:hover:bg-gray-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-900/20 dark:focus:ring-white/20 disabled:opacity-70 disabled:shadow-none transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800 transition-colors"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-[var(--code-bg)] px-4 text-gray-500 dark:text-gray-400 transition-colors">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[var(--bg)] px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700">
                  <SiGoogle className="size-4.5 text-[#DB4437]" />
                  Google
                </button>
                <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[var(--bg)] px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700">
                  <SiGithub className="size-4.5" />
                  GitHub
                </button>
              </div>

              <p className="mt-10 text-center text-sm font-medium text-gray-600 dark:text-[var(--text)] transition-colors">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-bold text-black dark:text-white hover:underline underline-offset-4">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default LogInPage
