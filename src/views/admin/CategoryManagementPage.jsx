"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Cat' },
    { id: 2, name: 'General' },
    { id: 3, name: 'Inspiration' },
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openDeleteModal = (category) => {
    setCategoryToDelete(category)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (categoryToDelete) {
      setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id))
      toast.success('Success', {
        description: 'Category has been successfully deleted',
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
    }
    setIsDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-[0.99] duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category management</h1>
        <Link 
          to="/admin/categories/create" 
          className="flex items-center gap-2 bg-[#2c2c2c] hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200 w-full sm:w-auto justify-center"
        >
          <Plus className="size-4" />
          Create category
        </Link>
      </div>

      <div className="bg-white dark:bg-[var(--code-bg)] rounded-xl border border-[var(--border)] shadow-sm flex flex-col flex-1 overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search.." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-10 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 focus-visible:ring-gray-200"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f9fafb] dark:bg-black/10 text-gray-500 dark:text-gray-400 font-medium">
              <tr>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)]">Category</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)] text-right w-[100px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-gray-900 dark:text-gray-300">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-500">No categories found.</td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 w-full" title={category.name}>
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="hover:text-gray-900 dark:hover:text-white transition-colors">
                          <Edit2 className="size-4" />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(category)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete category</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Do you want to delete this category?</p>
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
