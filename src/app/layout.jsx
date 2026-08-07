import '../index.css'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/lib/AuthContext'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'blog-post-app',
  description: 'A blog post application built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div id="root">
              {children}
            </div>
            <Toaster position="bottom-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
