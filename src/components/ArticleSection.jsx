import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import BlogCard from '@/components/BlogCard'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

const categories = ['Highlight', 'Cat', 'Inspiration', 'General']
const LIMIT = 6

function ArticleSection() {
  const [category, setCategory] = useState('Highlight')
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [keyword, setKeyword] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchBoxRef = useRef(null)

  useEffect(() => {
    let ignore = false

    setIsLoading(true)
    setError(null)
    setPosts([])

    api
      .get('/posts', {
        params: {
          page: 1,
          limit: LIMIT,
          ...(category !== 'Highlight' && { category }),
        },
      })
      .then((response) => {
        if (ignore) return
        setPosts(response.data.posts)
        setPage(1)
        setHasMore(response.data.currentPage < response.data.totalPages)
      })
      .catch(() => {
        if (!ignore) setError('Failed to load articles. Please try again later.')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [category])

  function handleLoadMore() {
    const nextPage = page + 1

    setIsLoading(true)
    setError(null)

    api
      .get('/posts', {
        params: {
          page: nextPage,
          limit: LIMIT,
          ...(category !== 'Highlight' && { category }),
        },
      })
      .then((response) => {
        setPosts((prev) => [...prev, ...response.data.posts])
        setPage(nextPage)
        setHasMore(response.data.currentPage < response.data.totalPages)
      })
      .catch(() => {
        setError('Failed to load articles. Please try again later.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    const trimmedKeyword = keyword.trim()

    if (!trimmedKeyword) {
      setSearchResults([])
      setIsSearchOpen(false)
      return
    }

    let ignore = false
    setIsSearching(true)

    const timeoutId = setTimeout(() => {
      api
        .get('/posts', { params: { keyword: trimmedKeyword, limit: 6 } })
        .then((response) => {
          if (ignore) return
          setSearchResults(response.data.posts)
          setIsSearchOpen(true)
        })
        .catch(() => {
          if (!ignore) setSearchResults([])
        })
        .finally(() => {
          if (!ignore) setIsSearching(false)
        })
    }, 350)

    return () => {
      ignore = true
      clearTimeout(timeoutId)
    }
  }, [keyword])

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function renderSearchResults() {
    return (
      <div className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-xl bg-(--bg) text-left shadow-lg ring-1 ring-(--border)">
        {isSearching && (
          <p className="px-4 py-3 text-sm text-(--text)">Searching...</p>
        )}
        {!isSearching && searchResults.length === 0 && (
          <p className="px-4 py-3 text-sm text-(--text)">No articles found.</p>
        )}
        {!isSearching &&
          searchResults.map((result) => (
            <Link
              key={result.id}
              to={`/post/${result.id}`}
              onClick={() => setIsSearchOpen(false)}
              className="block px-4 py-3 text-sm text-(--text-h) hover:bg-(--code-bg)"
            >
              {result.title}
            </Link>
          ))}
      </div>
    )
  }

  return (
    <section className="mx-6 my-10 text-left">
      <div ref={searchBoxRef} className="rounded-2xl bg-(--code-bg) p-4">
        <h2 className="!m-0 mb-4 !text-left text-lg font-semibold text-[var(--text-h)]">
          Latest articles
        </h2>

        <div className="hidden items-center justify-between sm:flex">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  category === cat
                    ? 'bg-white text-[var(--text-h)] shadow-sm'
                    : 'text-[var(--text)] hover:bg-white/60'
                }`}
                disabled={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-56">
            <Input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onFocus={() => keyword.trim() && setIsSearchOpen(true)}
              className="h-10 rounded-full bg-white pr-9"
            />
            <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[var(--text)]" />
            {isSearchOpen && renderSearchResults()}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onFocus={() => keyword.trim() && setIsSearchOpen(true)}
              className="h-10 rounded-lg bg-white pr-9"
            />
            <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[var(--text)]" />
            {isSearchOpen && renderSearchResults()}
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[var(--text-h)]">
              Category
            </span>
            <Select value={category} onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="h-10 w-full rounded-lg bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {error && <p className="mt-10 text-center text-sm text-red-500">{error}</p>}

      {!error && isLoading && posts.length === 0 && (
        <p className="mt-10 text-center text-sm text-(--text)">Loading articles...</p>
      )}

      {!error && posts.length > 0 && (
        <>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                description={post.description}
                author={post.author}
                date={formatDate(post.date)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="hover:text-muted-foreground font-medium underline"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'View more'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ArticleSection
