"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { toast } from 'sonner'
import { Copy, SmilePlus, X } from 'lucide-react'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { NavBar, Footer } from '@/components/Layout'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

// Assignment scope: no real auth system yet — every visitor is treated as logged out.
const isLoggedIn = false

function ViewPostPage({ postId: propPostId }) {
  const params = useParams()
  const postId = propPostId || params?.postId
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // ดึงข้อมูลโพสต์ตาม postId จาก URL ทุกครั้งที่ postId เปลี่ยน
  useEffect(() => {
    if (!postId) return
    let ignore = false

    setIsLoading(true)
    setError(null)
    setPost(null)

    api
      .get(`/posts/${postId}`)
      .then((response) => {
        if (!ignore) setPost(response.data)
      })
      .catch(() => {
        if (!ignore) setError('Post not found.')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [postId])

  // ปุ่ม like/comment ต้อง login ก่อน — ถ้ายังไม่ login ให้เปิด dialog ชวนสมัคร/เข้าสู่ระบบแทน
  function requireLogin() {
    if (isLoggedIn) return true
    setIsLoginDialogOpen(true)
    return false
  }

  // คัดลอกลิงก์หน้าปัจจุบันไปยัง clipboard แล้วโชว์สถานะ "Copied!" ชั่วคราว 2 วินาที
  async function handleCopyLink() {
    await navigator.clipboard.writeText(window.location.href)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)

    toast.success('Copied!', {
      description: 'This article has been copied to your clipboard.',
      closeButton: true,
      style: {
        '--toast-close-button-start': 'auto',
        '--toast-close-button-end': '0px',
        '--toast-close-button-transform': 'translate(35%, -35%)',
      },
      classNames: {
        toast: '!bg-green-600 !text-white !border-green-600',
        title: '!text-white',
        description: '!text-white/90',
        icon: '!text-white',
        closeButton: '!bg-white/20 !text-white !border-white/30 hover:!bg-white/30',
      },
    })
  }

  // เช็ค typeof window เผื่อโค้ดนี้ถูกรันฝั่ง server (SSR) ที่ไม่มี window object
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  // สร้างลิงก์แชร์ไปแต่ละแพลตฟอร์มจาก URL ของโพสต์ปัจจุบัน (encode กันอักขระพิเศษพัง URL)
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title ?? '')}`

  return (
    <>
      <NavBar />

      <article className="mx-6 my-10 text-left">
        {isLoading && (
          <p className="text-center text-sm text-(--text)">Loading article...</p>
        )}

        {!isLoading && error && (
          <div className="text-center">
            <p className="text-sm text-red-500">{error}</p>
            <Link href="/" className="mt-4 inline-block underline">
              Back to home
            </Link>
          </div>
        )}

        {!isLoading && !error && post && (
          <div className="mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
            <img
              src={post.image}
              alt={post.title}
              className="mb-6 h-[212px] w-full rounded-md object-cover sm:h-[360px]"
            />

            <span className="mb-2 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-600">
              {post.category}
            </span>

            <h1 className="!m-0 mb-4 !text-left text-2xl font-bold text-(--text-h) sm:text-3xl">
              {post.title}
            </h1>

            <div className="flex items-center text-sm text-(--text)">
              <img
                className="mr-2 h-8 w-8 rounded-full"
                src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                alt={post.author}
              />
              <span>{post.author}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>{formatDate(post.date)}</span>
            </div>

            <div className="markdown">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-(--code-bg) p-4 sm:flex-row">
              <button
                type="button"
                onClick={() => requireLogin()}
                className="flex items-center gap-2 rounded-full border border-(--border) bg-(--bg) px-4 py-2 text-sm font-medium text-(--text-h) hover:bg-black/5"
              >
                <SmilePlus className="size-4" />
                {post.likes.toLocaleString()}
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 rounded-full border border-(--border) bg-(--bg) px-4 py-2 text-sm font-medium text-(--text-h) hover:bg-black/5"
                >
                  <Copy className="size-4" />
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>

                <a
                  href={facebookShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-black/80"
                >
                  <FaFacebook size={16} />
                </a>
                <a
                  href={linkedInShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-black/80"
                >
                  <FaLinkedin size={16} />
                </a>
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-black/80"
                >
                  <FaTwitter size={16} />
                </a>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="m-0! mb-3 text-left! text-lg font-semibold text-(--text-h)">
                Comment
              </h3>
              <textarea
                placeholder="What are your thoughts?"
                rows={4}
                className="w-full resize-none rounded-xl border border-(--border) p-4 text-sm text-(--text-h) placeholder:text-(--text) focus:border-(--text-h) focus:outline-none"
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => requireLogin()}
                  className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-black/80"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </article>

      <Footer />

      {/* Dialog ที่โผล่มาเมื่อกด like/comment โดยยังไม่ login (ดู requireLogin ด้านบน) */}
      <AlertDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <AlertDialogContent>
          <AlertDialogCancel
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3 rounded-full"
          >
            <X className="size-4" />
          </AlertDialogCancel>

          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              Create an account to continue
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogAction className="w-full rounded-full">
            Create account
          </AlertDialogAction>

          <AlertDialogDescription className="text-center">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLoginDialogOpen(false)}
              className="font-semibold underline"
            >
              Log in
            </button>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ViewPostPage
