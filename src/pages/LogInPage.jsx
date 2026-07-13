import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavBar } from '@/components/Layout'
import FormField from '@/components/FormField'
import { formInputClass } from '@/lib/utils'
import { verifyCredentials } from '@/lib/fakeAuth'

function validate(values) {
  const errors = {}

  if (!values.email.trim()) errors.email = 'Please enter your email.'
  if (!values.password) errors.password = 'Please enter your password.'

  return errors
}

function LogInPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    setIsSubmitting(true)

    // This assignment's scope has no real auth backend yet — simulate the request.
    setTimeout(() => {
      const result = verifyCredentials(values.email, values.password)

      if (!result.success) {
        setIsSubmitting(false)
        if (result.reason === 'not_found') {
          setErrors({ email: "We couldn't find an account with that email." })
        } else {
          setErrors({ password: 'Incorrect password. Please try again.' })
        }
        return
      }

      setIsSubmitting(false)
      navigate('/')
    }, 600)
  }

  return (
    <>
      <NavBar />
      <div className="mx-6 my-10 flex justify-center">
        <div className="w-full max-w-md rounded-2xl bg-(--code-bg) p-8">
          <h1 className="m-0! mb-6 text-center text-2xl font-bold text-(--text-h)">
            Log in
          </h1>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-(--text)">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-(--text-h) underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LogInPage
