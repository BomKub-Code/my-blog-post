import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const tabs = ['Highlight', 'Cat', 'Inspiration', 'General']

function ArticleSection() {
  return (
    <section className="mx-6 my-10 text-left">
      <div className="rounded-2xl bg-[var(--code-bg)] p-4">
        <h2 className="!m-0 mb-4 !text-left text-lg font-semibold text-[var(--text-h)]">
          Latest articles
        </h2>

        <div className="hidden items-center justify-between sm:flex">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  index === 0
                    ? 'bg-white text-[var(--text-h)] shadow-sm'
                    : 'text-[var(--text)] hover:bg-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-56">
            <Input
              type="text"
              placeholder="Search"
              className="h-10 rounded-full bg-white pr-9"
            />
            <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[var(--text)]" />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="h-10 rounded-lg bg-white pr-9"
            />
            <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[var(--text)]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[var(--text-h)]">
              Category
            </span>
            <Select defaultValue="Highlight">
              <SelectTrigger className="h-10 w-full rounded-lg bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tabs.map((tab) => (
                  <SelectItem key={tab} value={tab}>
                    {tab}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArticleSection
