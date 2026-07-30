import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Image as ImageIcon, Loader2, Trash2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/lib/AuthContext'
import { toast } from 'sonner'

export default function CreateArticlePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    introduction: '',
    content: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'introduction' && value.length > 120) return // max 120 letters
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (val) => {
    setFormData(prev => ({ ...prev, category: val }))
  }

  const handleSave = async (isPublished) => {
    // Basic validation
    if (!formData.title || !formData.category || !formData.content) {
      toast.error('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)

    // Simulate API call to save article
    setTimeout(() => {
      setIsSubmitting(false)
      
      const successMessage = isPublished 
        ? 'Create article and published\nYour article has been successfully published'
        : 'Create article and saved as draft\nYou can publish article later'
        
      toast.success('Success', {
        description: successMessage,
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
      navigate('/admin/articles')
    }, 800)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(false)
    toast.success('Success', {
      description: 'Article has been successfully deleted',
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
    navigate('/admin/articles')
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in zoom-in-[0.99] duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create article</h1>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => handleSave(false)}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-center"
          >
            Save as draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#2c2c2c] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            Save and publish
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[var(--code-bg)] rounded-xl border border-[var(--border)] shadow-sm p-4 sm:p-6 md:p-10 flex flex-col gap-8">
        
        {/* Thumbnail Image */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Thumbnail image</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
            <div className="flex items-center justify-center w-full sm:w-64 h-40 bg-[#f3f4f6] dark:bg-black/20 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 shrink-0">
              <ImageIcon className="size-8 text-gray-400" />
            </div>
            <button className="w-full sm:w-auto px-5 py-2 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              Upload thumbnail Image
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <Select value={formData.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-1/2 h-11 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Highlight">Highlight</SelectItem>
              <SelectItem value="Cat">Cat</SelectItem>
              <SelectItem value="Inspiration">Inspiration</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Author name (Readonly) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Author name</label>
          <Input 
            value={user?.name || 'Unknown Author'} 
            readOnly 
            className="w-full sm:w-1/2 h-11 bg-gray-50 dark:bg-black/20 border-transparent text-gray-500"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <Input 
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Article title"
            className="h-11 border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Introduction */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Introduction (max 120 letters)
          </label>
          <textarea 
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            placeholder="Introduction"
            rows={3}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-transparent dark:text-white resize-none"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
          <textarea 
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            rows={12}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-transparent dark:text-white resize-none"
          />
        </div>

        {/* Delete Button (Visible if editing an existing article, but for now we'll just show it) */}
        <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
          <button 
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors group"
          >
            <Trash2 className="size-4" />
            <span className="underline underline-offset-4 decoration-gray-300 group-hover:decoration-red-400 dark:decoration-gray-700 dark:group-hover:decoration-red-600">Delete article</span>
          </button>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 max-w-[400px] w-full text-center relative shadow-xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="size-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete article</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Do you want to delete this article?</p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-6 py-2.5 min-w-[120px] rounded-full text-sm font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-6 py-2.5 min-w-[120px] rounded-full text-sm font-semibold bg-[#2c2c2c] hover:bg-black text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
