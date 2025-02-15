import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY")

// Server-side client
export const createServerSupabaseClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Client-side helper
export const createBrowserSupabaseClient = createClientComponentClient

export type Activity = {
  id?: string
  event_id?: string
  athlete_id: number
  event_time: string
  activity_type: string
  event_type: string
  object_type: string
  object_id: number
  updates: string // Record<string, any>
  created_at?: string
}

