"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate saving profile
    setTimeout(() => {
      setIsSubmitting(false)
      
      toast.success('Saved profile', {
        description: 'Your profile has been successfully updated.',
        style: {
          '--toast-close-button-start': 'auto',
          '--toast-close-button-end': '0px',
          '--toast-close-button-transform': 'translate(35%, -35%)',
        },
        classNames: {
          toast: '!bg-[#10b981] !text-white !border-[#10b981]',
          title: '!text-white font-semibold',
          description: '!text-white/90',
          icon: '!text-white',
          closeButton: '!bg-white/20 !text-white !border-white/30 hover:!bg-white/30',
        },
      })
    }, 800)
  }

  return (
    <div className="flex flex-col animate-in fade-in zoom-in-[0.99] duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-lg font-bold text-[var(--text-h)] uppercase">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {user?.name || 'User'} <span className="font-normal text-gray-500">Profile</span>
        </h1>
      </div>

      <div className="bg-[#f8f9fa] dark:bg-[var(--code-bg)] rounded-3xl p-8 sm:p-12 shadow-sm border border-[var(--border)] max-w-xl">
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          
          {/* Avatar Section */}
          <div className="flex flex-col gap-4 mb-2">
            <div className="flex items-center gap-6">
              <div className="size-24 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden flex-shrink-0">
                <img 
                  src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Upload profile picture
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-12 bg-white dark:bg-black/20 border-white dark:border-gray-700 focus-visible:ring-gray-200 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Username</label>
            <Input 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="h-12 bg-white dark:bg-black/20 border-white dark:border-gray-700 focus-visible:ring-gray-200 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
            <Input 
              name="email"
              value={formData.email}
              readOnly
              className="h-12 bg-transparent border-transparent text-gray-400 focus-visible:ring-transparent px-0"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-semibold bg-[#2c2c2c] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
