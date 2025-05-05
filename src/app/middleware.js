// src/middleware.js
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const pathname = req.nextUrl.pathname;
    console.log("Middleware: pathname =", pathname);
    console.log("Middleware: session =", session);

    if ((pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) && !session) {
        return NextResponse.redirect(new URL("/student/login", req.url));
    }

    const user = session?.user;

    if (!user) {
        return NextResponse.redirect(new URL("/student/login", req.url));
    }

    if (pathname.startsWith("/admin")) {
        const { data: userProfile, error } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single();

        if (error || userProfile?.role !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (pathname.startsWith("/dashboard")) {
        const { data: studentProfile, error } = await supabase
            .from("students")
            .select("role")
            .eq("id", user.id)
            .single();

        if (error || studentProfile?.role !== "student") {
            return NextResponse.redirect(new URL("/student/login", req.url));
        }
    }

    return res;
}

export const config = {
    matcher: ["/admin", "/admin/:path*", "/dashboard", "/dashboard/:path*"],
};
