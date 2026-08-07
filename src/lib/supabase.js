import { createClient } from '@supabase/supabase-js'

// Supabase client — มี fallback เผื่อกรณี env variable โหลดไม่ทันในบาง environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://frjuqnvqffgksqislhge.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyanVxbnZxZmZna3NxaXNsaGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzQ2MDksImV4cCI6MjEwMTY1MDYwOX0.7TataIHllcwqVoqvZZXEAg2aIBSVd7HEVeWO_dkYSlc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
