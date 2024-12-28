export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          email: string
          location: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          location: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          location?: string
          created_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          organization_id?: string
          created_at?: string
        }
      }
      members: {
        Row: {
          id: string
          name: string
          email: string
          team_id: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          team_id: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          team_id?: string
          image_url?: string | null
          created_at?: string
        }
      }
    }
  }
}