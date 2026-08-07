import ViewPostPage from '@/views/ViewPostPage'

export const dynamic = 'force-dynamic'

export default async function Page({ params }) {
  const resolvedParams = await params
  return <ViewPostPage postId={resolvedParams?.postId} />
}
