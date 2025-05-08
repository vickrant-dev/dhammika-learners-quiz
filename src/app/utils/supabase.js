import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Use createClientComponentClient for client-side components
export const supabase = createClientComponentClient()

// import { cookies } from 'next/headers'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// export const createSupabaseServerClient = () => {
//   return createServerComponentClient({ cookies })
// }