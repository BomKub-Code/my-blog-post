"use client"

import { useState, useEffect } from 'react'
import { Search, Trash2, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function MemberManagementPage() {
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // โหลดรายชื่อจาก localStorage ผ่าน api mock ที่จะเพิ่มให้ (หรือจำลองข้อมูลตรงนี้ไปก่อน)
    const loadMembers = () => {
      try {
        const storedUsersStr = localStorage.getItem('blog-post-app:users')
        if (storedUsersStr) {
          const parsed = JSON.parse(storedUsersStr)
          // Data is stored as an object { email: { ...user } }
          const usersArray = Object.values(parsed)
          setMembers(usersArray)
        }
      } catch (err) {
        console.error('Failed to load members', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    // Simulate slight network delay
    setTimeout(loadMembers, 400)
  }, [])

  // Filter logic
  const filteredMembers = members.filter(member => {
    if (!member) return false
    const term = searchTerm.toLowerCase()
    const nameMatch = member.name ? member.name.toLowerCase().includes(term) : false
    const emailMatch = member.email ? member.email.toLowerCase().includes(term) : false
    return nameMatch || emailMatch
  })

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-[0.99] duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Member management</h1>
      </div>

      <div className="bg-white dark:bg-[var(--code-bg)] rounded-xl border border-[var(--border)] shadow-sm flex flex-col flex-1 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search members by name or email..." 
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
                <th className="px-6 py-4 font-medium border-b border-[var(--border)]">Name</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)]">Username</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)]">Email</th>
                <th className="px-6 py-4 font-medium border-b border-[var(--border)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-gray-900 dark:text-gray-300">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading members...</td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No members found.</td>
                </tr>
              ) : (
                filteredMembers.map((member, index) => (
                  <tr key={index} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold uppercase">
                          {member.name.charAt(0)}
                        </div>
                        {member.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      @{member.username}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 text-gray-400" />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="hover:text-red-600 transition-colors" title="Delete member">
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
