import ViewPostPage from '@/views/ViewPostPage'

export default async function Page({ params }) {
  const resolvedParams = await params
  return <ViewPostPage postId={resolvedParams?.postId} />
}
