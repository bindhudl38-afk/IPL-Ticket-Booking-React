import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kjczwosruhaqlnemabss.supabase.co'

const supabaseKey = 'sb_publishable_PDkc4D2h6KAPPfwWYR6OpA_7t-VzKiN'

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)