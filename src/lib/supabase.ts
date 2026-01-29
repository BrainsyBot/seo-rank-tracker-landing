import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      sites: {
        Row: {
          id: string
          user_id: string
          domain: string
          name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          domain: string
          name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          domain?: string
          name?: string | null
          created_at?: string
        }
      }
      keywords: {
        Row: {
          id: string
          site_id: string
          keyword: string
          created_at: string
        }
        Insert: {
          id?: string
          site_id: string
          keyword: string
          created_at?: string
        }
        Update: {
          id?: string
          site_id?: string
          keyword?: string
          created_at?: string
        }
      }
      rank_checks: {
        Row: {
          id: string
          keyword_id: string
          rank: number | null
          checked_at: string
        }
        Insert: {
          id?: string
          keyword_id: string
          rank?: number | null
          checked_at?: string
        }
        Update: {
          id?: string
          keyword_id?: string
          rank?: number | null
          checked_at?: string
        }
      }
    }
  }
}
