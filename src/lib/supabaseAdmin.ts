import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!url || !serviceRole) {
  // In local dev this file may be imported; it's expected that SUPABASE_SERVICE_ROLE_KEY
  // is set for server-only operations. If not present, calls that require admin privileges
  // will throw when used.
}

export const supabaseAdmin = createClient(url, serviceRole)

export default supabaseAdmin
