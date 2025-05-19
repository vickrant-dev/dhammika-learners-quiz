"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabase"; // make sure this client was created with
// auth: { flowType: "pkce" }

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    /* ----------------------------------------------------------
     * 1.  When the user lands here from the email link,
     *     Supabase redirects with   ?code=XXXX&type=recovery
     *     (PKCE)  → we must exchange that code for a session.
     * --------------------------------------------------------- */
    // useEffect(() => {
    //     const code = searchParams.get("code");
    //     if (!code) return; // implicit-flow links fall through
    //     // ⚠️ one-shot – don’t wrap in setInterval etc.
    //     supabase.auth
    //         .exchangeCodeForSession(code) // creates an authenticated session
    //         .then(({ error }) => {
    //             if (error)
    //                 console.error("PKCE exchange failed:", error.message);
    //         });
    // }, [searchParams]);

    /* ----------------------------------------------------------
     * 2.  Let the user choose a new password and update it.
     * --------------------------------------------------------- */

    const getSession = async () => {

        const { data, error } = await supabase.auth.getSession(); // ← actual reset
        console.log(data);

    }

    useEffect(() => {
        getSession();
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password }); // ← actual reset
        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Password updated! You can now sign in.");
        router.push("/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        New password
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        required
                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded
                       hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Updating…" : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
