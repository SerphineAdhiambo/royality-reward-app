// supabase.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
