import { createClient } from '@supabase/supabase-js'
import { Course } from '../types'

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Support both the legacy ANON_KEY name and the new PUBLISHABLE_KEY name
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local'
    )
  }
  return createClient(url, key)
}

export async function getCourses(): Promise<Course[]> {
  const supabase = getClient()
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Course[]
}
