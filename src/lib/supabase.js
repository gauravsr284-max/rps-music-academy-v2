
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase configuration missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel Environment Variables.'
  )
}

export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

export const STORAGE_BUCKETS = {
  chatAttachments: 'academy-chat-attachments',
  studyMaterials: 'academy-study-materials',
  teacherDocuments: 'academy-teacher-documents',
  studentDocuments: 'academy-student-documents'
}
