import { createContext, useContext, useState, useEffect } from 'react'
import { verifyCredentials, registerUser as fakeRegisterUser } from './fakeAuth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // On mount, check if there's a logged-in user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('blog-post-app:session')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (_err) {
        localStorage.removeItem('blog-post-app:session')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    const result = verifyCredentials(email, password)
    if (result.success) {
      // Omit password from session storage for basic security best practice
      const { password: _pw, ...userWithoutPassword } = result.user
      setUser(userWithoutPassword)
      localStorage.setItem('blog-post-app:session', JSON.stringify(userWithoutPassword))
      return { success: true }
    }
    return result
  }

  const register = async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    fakeRegisterUser(userData)
    // Auto-login after registration
    const { password: _pw, ...userWithoutPassword } = userData
    setUser(userWithoutPassword)
    localStorage.setItem('blog-post-app:session', JSON.stringify(userWithoutPassword))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('blog-post-app:session')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
