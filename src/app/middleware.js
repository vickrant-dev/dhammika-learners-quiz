// import { NextResponse } from "next/server";
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// export async function middleware(req) {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });
//     const pathname = req.nextUrl.pathname;

//     // Get the user session
//     const {
//         data: { session },
//     } = await supabase.auth.getSession();

//     console.log("Middleware: pathname =", pathname);
//     console.log("Middleware: session exists =", !!session);

//     // If no session and trying to access protected routes, redirect to login
//     if (!session) {
//         console.log("No session, redirecting to login");
//         return NextResponse.redirect(new URL("/student/login", req.url));
//     }

//     const user = session.user;

//     // Check admin routes
//     if (pathname.startsWith("/admin")) {
//         try {
//             const { data: userProfile, error } = await supabase
//                 .from("users")
//                 .select("role")
//                 .eq("id", user.id)
//                 .single();

//             console.log("Admin check:", userProfile, error);

//             if (error || userProfile?.role !== "admin") {
//                 console.log("Not admin, redirecting");
//                 return NextResponse.redirect(
//                     new URL("/student/login", req.url)
//                 );
//             }
//         } catch (err) {
//             console.error("Error checking admin role:", err);
//             return NextResponse.redirect(new URL("/student/login", req.url));
//         }
//     }

//     // Check dashboard routes
//     if (pathname.startsWith("/dashboard")) {
//         try {
//             const { data: studentProfile, error } = await supabase
//                 .from("students")
//                 .select("role")
//                 .eq("id", user.id)
//                 .single();

//             console.log("Student check:", studentProfile, error);

//             if (error || studentProfile?.role !== "student") {
//                 console.log("Not student, redirecting");
//                 return NextResponse.redirect(
//                     new URL("/student/login", req.url)
//                 );
//             }
//         } catch (err) {
//             console.error("Error checking student role:", err);
//             return NextResponse.redirect(new URL("/student/login", req.url));
//         }
//     }

//     return res;
// }

// export const config = {
//     matcher: ["/admin", "/admin/:path*", "/dashboard", "/dashboard/:path*"],
// };