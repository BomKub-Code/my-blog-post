"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function CreateCategoryPage() {
  const router = useRouter()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState('')

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Please enter a category name.')
      return
    }

    setIsSubmitting(true)

    // Simulate API call to save category
    setTimeout(() => {
      setIsSubmitting(false)
        
      toast.success('Create category', {
        description: 'Category has been successfully created.',
        style: {
          '--toast-close-button-start': 'auto',
          '--toast-close-button-end': '0px',
          '--toast-close-button-transform': 'translate(35%, -35%)',
        },
        classNames: {
          toast: '!bg-[#10b981] !text-white !border-[#10b981]',
          title: '!text-white font-semibold',
          description: '!text-white/90 whitespace-pre-line',
          icon: '!text-white',
          closeButton: '!bg-white/20 !text-white !border-white/30 hover:!bg-white/30',
        },
      })
      router.push('/admin/categories')
    }, 800)
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in zoom-in-[0.99] duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create category</h1>
        <div className="flex w-full sm:w-auto">
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 rounded-full text-sm font-semibold bg-[#2c2c2c] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            Save
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[var(--code-bg)] rounded-xl border border-[var(--border)] shadow-sm p-4 sm:p-6 md:p-10 flex flex-col gap-8 min-h-[500px]">
        {/* Category name */}
        <div className="flex flex-col gap-2 max-w-lg">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category name</label>
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="h-11 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
    </div>
  )
}
