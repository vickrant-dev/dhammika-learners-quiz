import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Use createClientComponentClient for client-side components
export const supabase = createClientComponentClient()

// If you need a server-side client, create a separate export
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// export const serverSupabase = () => createServerComponentClient({ cookies });
