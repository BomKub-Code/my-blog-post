import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const category = searchParams.get('category')
    const keyword = searchParams.get('keyword')

    // คำนวณช่วงแถวที่จะดึงข้อมูล (0-indexed)
    const from = (page - 1) * limit
    const to = from + limit - 1

    // เริ่มต้นสร้าง Query ดึงข้อมูลจาก Supabase
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })

    // กรองตามหมวดหมู่ (ถ้ามี)
    if (category) {
      query = query.eq('category', category)
    }

    // กรองคำค้นหา ค้นจาก Title หรือ Description (ถ้ามี)
    if (keyword) {
      query = query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`)
    }

    // เรียงลำดับตาม ID เพื่อให้เหมือนการเรียงดั้งเดิม
    query = query.order('id', { ascending: true })

    // ทำ Pagination
    query = query.range(from, to)

    const { data: posts, count, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const totalPosts = count || 0
    const totalPages = Math.ceil(totalPosts / limit)
    const nextPage = page < totalPages ? page + 1 : null

    return NextResponse.json({
      totalPosts,
      totalPages,
      currentPage: page,
      limit,
      posts,
      nextPage
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
