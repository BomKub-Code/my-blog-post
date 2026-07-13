import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { NavBar } from '@/components/Layout'
import FormField from '@/components/FormField'
import { formInputClass } from '@/lib/utils'
import { emailExists, registerUser } from '@/lib/fakeAuth'

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

function SignUpPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ name: '', username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (emailExists(values.email)) {
      setErrors({ email: 'This email is already in use.' })
      return
    }

    setIsSubmitting(true)

    // This assignment's scope has no real auth backend yet — simulate the request.
    setTimeout(() => {
      registerUser(values)
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 600)
  }

  if (isSuccess) {
    return (
      <>
        <NavBar />
        <div className="mx-6 my-10 flex justify-center">
          <div className="w-full max-w-md rounded-2xl bg-(--code-bg) p-8 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="size-8" />
            </div>
            <h1 className="m-0! mb-2 text-2xl font-bold text-(--text-h)">
              Registration success!
            </h1>
            <p className="mb-6 text-sm text-(--text)">
              Your account has been successfully created.
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80"
            >
              Continue
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar />
      <div className="mx-6 my-10 flex justify-center">
        <div className="w-full max-w-md rounded-2xl bg-(--code-bg) p-8">
          <h1 className="m-0! mb-6 text-center text-2xl font-bold text-(--text-h)">
            Sign up
          </h1>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <FormField label="Name" error={errors.name}>
              <input
                type="text"
                placeholder="Full name"
                value={values.name}
                onChange={handleChange('name')}
                className={formInputClass(Boolean(errors.name))}
              />
            </FormField>

            <FormField label="Username" error={errors.username}>
              <input
                type="text"
                placeholder="Username"
                value={values.username}
                onChange={handleChange('username')}
                className={formInputClass(Boolean(errors.username))}
              />
            </FormField>

            <FormField label="Email" error={errors.email}>
              <input
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange('email')}
                className={formInputClass(Boolean(errors.email))}
              />
            </FormField>

            <FormField label="Password" error={errors.password}>
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange('password')}
                className={formInputClass(Boolean(errors.password))}
              />
            </FormField>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-60"
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-(--text)">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-(--text-h) underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
