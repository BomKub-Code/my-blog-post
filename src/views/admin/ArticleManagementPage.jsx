"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/lib/api'

export default function ArticleManagementPage() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  useEffect(() => {
    // โหลดข้อมูลแบบ mock (ดึงจาก API ที่มีอยู่แล้วก่อน สำหรับเดโม่)
    api.get('/posts')
      .then(res => {
        // Mock status ให้อยู่ในโหมด Published ทั้งหมดก่อน
        const mockData = res.data.posts.map(p => ({ ...p, status: 'Published' }))
        setArticles(mockData)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  // Filter logic
  const filteredArticles = articles.filter(article => {
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = categoryFilter === 'All' || article.category === categoryFilter
    const matchStatus = statusFilter === 'All' || article.status === statusFilter
    return matchSearch && matchCategory && matchStatus
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Article management</h1>
        <Link 
          to="/admin/articles/create" 
          className="flex items-center gap-2 bg-[#2c2c2c] hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200 w-full sm:w-auto justify-center"
        >
          <Plus className="size-4" />
          Create article
        </Link>
      </div>

      <div className="bg-white dark:bg-[var(--code-bg)] rounded-xl border border-[var(--border)] shadow-sm flex flex-col flex-1 overflow-hidden animate-in fade-in zoom-in-[0.99] duration-500">
        {/* Filters */}
        <div className="p-4 border-b border-[var(--border)] flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-10 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 focus-visible:ring-gray-200"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px] h-10 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[140px] h-10 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Category</SelectItem>
                <SelectItem value="Highlight">Highlight</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="Inspiration">Inspiration</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f9fafb] dark:bg-black/10 text-gray-500 dark:text-gray-400 font-medium">
              <tr>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)]">Article title</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)]">Category</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)]">Status</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-gray-900 dark:text-gray-300">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading articles...</td>
                </tr>
              ) : filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No articles found.</td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 w-full max-w-[400px] truncate" title={article.title}>
                      {article.title}
                    </td>
                    <td className="px-6 py-4">
                      {article.category}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500 font-medium">
                        <span className="size-1.5 rounded-full bg-green-600 dark:bg-green-500"></span>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="hover:text-gray-900 dark:hover:text-white transition-colors">
                          <Edit2 className="size-4" />
                        </button>
                        <button className="hover:text-red-600 transition-colors">
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
    </div>
  )
}
