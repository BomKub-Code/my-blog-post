import { createClient } from '@supabase/supabase-js'

// Supabase client — ใช้ได้ทั้งฝั่ง Server (API Route Handlers) และ Client Components
// อ่านค่าจาก Environment Variables ที่ตั้งไว้ใน .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
