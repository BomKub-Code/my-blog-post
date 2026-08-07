import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params
    const postId = resolvedParams?.postId
    const numericId = parseInt(postId, 10)

    if (isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid Post ID' }, { status: 400 })
    }

    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', numericId)
      .single()

    if (error || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
