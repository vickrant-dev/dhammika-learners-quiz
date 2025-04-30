export async function debugAuthState(supabase) {
    try {
      // Get the current session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()
  
      if (sessionError) {
        console.error("Session error:", sessionError.message)
        return { success: false, error: sessionError.message }
      }
  
      if (!session) {
        console.log("No active session found")
        return { success: false, error: "No active session" }
      }
  
      // Get the user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
  
      if (userError) {
        console.error("User error:", userError.message)
        return { success: false, error: userError.message }
      }
  
      // Check user role in the users table
      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()
  
      if (profileError) {
        console.error("Profile error:", profileError.message)
        return {
          success: false,
          error: profileError.message,
          user,
          session,
        }
      }
  
      // Return all debug info
      return {
        success: true,
        user,
        session,
        userProfile,
        jwt: session.access_token,
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      return { success: false, error: error.message }
    }
  }
  