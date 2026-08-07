"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Mail, Lock, User, AtSign, Eye, EyeOff, Loader2 } from 'lucide-react'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { NavBar } from '@/components/Layout'
import FormField from '@/components/FormField'
import { formInputClass, cn } from '@/lib/utils'
import { emailExists } from '@/lib/fakeAuth'
import { useAuth } from '@/lib/AuthContext'
import { toast } from 'sonner'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  
  if (!values.username.trim()) errors.username = 'Please enter a username.'
  else if (/\s/.test(values.username)) errors.username = 'Username cannot contain spaces.'

  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.password) errors.password = 'Please enter a password.'
  else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}

// Password strength calculation helper
function calculateStrength(password) {
  let score = 0
  if (!password) return 0
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return Math.min(score, 4)
}

function SignUpPage() {
  const router = useRouter()
  const { user, register } = useAuth()
  const [values, setValues] = useState({ name: '', username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const strengthScore = calculateStrength(values.password)

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

    // Check if email already exists
    if (emailExists(values.email)) {
      setErrors({ email: 'This email is already registered.' })
      toast.error('Email already in use')
      setIsSubmitting(false)
      return
    }

    // Call register from AuthContext
    const result = await register(values)
    
    if (result.success) {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast.success('Account created successfully!')
    } else {
      setIsSubmitting(false)
      toast.error('Something went wrong')
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8fafc]">
        <NavBar />
        <main className="flex grow items-center justify-center p-4">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-gray-900/5 animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="size-10 text-green-500 animate-in zoom-in delay-150 duration-500" />
            </div>
            <h1 className="mb-3 text-3xl font-bold text-gray-900 tracking-tight">
              Welcome aboard!
            </h1>
            <p className="mb-8 text-base text-gray-600">
              Your account has been successfully created. You're ready to start exploring.
            </p>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full h-12 rounded-xl bg-black px-6 text-sm font-semibold text-white shadow-md hover:bg-gray-900 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-900/20 transition-all duration-200"
            >
              Continue to Home
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] dark:bg-[var(--bg)] transition-colors">
      <NavBar />
      
      <main className="flex grow items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white dark:bg-[var(--code-bg)] shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10 lg:min-h-[760px] transition-all animate-in fade-in zoom-in-[0.98] duration-700 ease-out fill-mode-both">
          
          {/* Left: Illustration / Brand Panel (Desktop Only) */}
          <div className="relative hidden w-1/2 flex-col justify-between bg-black dark:bg-[#0a0a0a] p-12 lg:flex">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2070&auto=format&fit=crop" 
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
                "Start writing, no matter what. The water does not flow until the faucet is turned on."
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-300">— Louis L'Amour</span>
              </div>
            </div>
          </div>

          {/* Right: Sign Up Form */}
          <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-1/2 lg:p-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-[var(--text-h)] transition-colors">Create an account</h1>
                <p className="mt-3 text-base text-gray-600 dark:text-[var(--text)] transition-colors">
                  Join us today and start sharing your stories.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Full Name" error={errors.name}>
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 size-5" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={values.name}
                      onChange={handleChange('name')}
                      className={formInputClass(Boolean(errors.name), true, false)}
                    />
                  </FormField>

                  <FormField label="Username" error={errors.username}>
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 size-5" />
                    <input
                      type="text"
                      placeholder="janedoe"
                      value={values.username}
                      onChange={handleChange('username')}
                      className={formInputClass(Boolean(errors.username), true, false)}
                    />
                  </FormField>
                </div>

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
                    placeholder="Create a strong password"
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
                
                {/* Password Strength Meter */}
                {values.password && (
                  <div className="mt-1 animate-in slide-in-from-top-1 fade-in duration-200">
                    <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            "h-full flex-1 transition-all duration-300",
                            strengthScore >= level 
                              ? strengthScore <= 2 ? "bg-amber-400 dark:bg-amber-500" : strengthScore === 3 ? "bg-blue-400 dark:bg-blue-500" : "bg-green-500 dark:bg-green-600"
                              : "bg-transparent"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      {strengthScore <= 2 ? 'Weak password' : strengthScore === 3 ? 'Good password' : 'Strong password'}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-black dark:bg-white px-6 text-sm font-semibold text-white dark:text-black shadow-md hover:bg-gray-900 dark:hover:bg-gray-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-900/20 dark:focus:ring-white/20 disabled:opacity-70 disabled:shadow-none transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800 transition-colors"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-[var(--code-bg)] px-4 text-gray-500 dark:text-gray-400 transition-colors">Or sign up with</span>
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

              <p className="mt-8 text-center text-sm font-medium text-gray-600 dark:text-[var(--text)] transition-colors">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-black dark:text-white hover:underline underline-offset-4">
                  Log in
                </Link>
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default SignUpPage
