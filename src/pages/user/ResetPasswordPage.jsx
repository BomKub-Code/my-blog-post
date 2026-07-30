import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'

export default function ResetPasswordPage() {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleReset = (e) => {
    e.preventDefault()
    
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('Please fill in all fields.')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match.')
      return
    }

    setIsConfirmOpen(true)
  }

  const confirmReset = () => {
    setIsConfirmOpen(false)
    setIsSubmitting(true)

    // Simulate password reset
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      
      toast.success('Password updated', {
        description: 'Your password has been successfully reset.',
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
    <div className="flex flex-col animate-in fade-in zoom-in-[0.99] duration-500 relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-lg font-bold text-[var(--text-h)] uppercase">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {user?.name || 'User'} <span className="font-normal text-gray-500">Reset password</span>
        </h1>
      </div>

      <div className="bg-[#f8f9fa] dark:bg-[var(--code-bg)] rounded-3xl p-8 sm:p-12 shadow-sm border border-[var(--border)] max-w-xl">
        <form onSubmit={handleReset} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Current password</label>
            <Input 
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current password"
              className="h-12 bg-white dark:bg-black/20 border-white dark:border-gray-700 focus-visible:ring-gray-200 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">New password</label>
            <Input 
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New password"
              className="h-12 bg-white dark:bg-black/20 border-white dark:border-gray-700 focus-visible:ring-gray-200 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirm new password</label>
            <Input 
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="h-12 bg-white dark:bg-black/20 border-white dark:border-gray-700 focus-visible:ring-gray-200 rounded-xl"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-semibold bg-[#2c2c2c] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Reset password
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 max-w-[400px] w-full text-center relative shadow-xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsConfirmOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="size-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirm password reset</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Are you sure you want to change your password?</p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setIsConfirmOpen(false)}
                className="px-6 py-2.5 min-w-[120px] rounded-full text-sm font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmReset}
                className="px-6 py-2.5 min-w-[120px] rounded-full text-sm font-semibold bg-[#2c2c2c] hover:bg-black text-white transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
