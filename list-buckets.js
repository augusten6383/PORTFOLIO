// list-buckets.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
// load .env.local explicitly so local env vars are available when running this script
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)
async function run() {
  const r = await supabase.storage.getBuckets()
  console.log('buckets:', r.data)
  if (r.error) console.error('error:', r.error)
}
run()