import { supabase } from "@/app/utils/supabase";
import { CheckCircle, CheckCircle2, CircleAlert, FileWarning } from "lucide-react";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
    
    const [email, setEmail] = useState(null);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async(e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {  redirectTo: 'http://localhost:3000/login/forgot-password/reset',});
        setSent(true);
        setLoading(false);

    }

    useEffect(() => {
        console.log("Email: ", email);
    }, [email]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {!sent ? (<>    
                <div className="w-full max-w-sm p-6 bg-white rounded shadow">
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Forgot Password
                    </h2>
                    <form onSubmit={handlePasswordReset}>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                        {loading ? (
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                            >
                                Sending...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                            >
                                Send Reset Link
                            </button>
                        )}
                    </form>
                </div>
            </>) : (
                <>
                    <div className="w-full max-w-md p-6 bg-white rounded shadow">
                    <h2 className="flex flex-col items-center gap-3 text-2xl font-semibold text-center mb-4">
                        <CheckCircle2 className="text-green-500" size={38}/> Password Reset Email Sent
                    </h2>
                    <p className="text-orange-500 flex gap-3"><CircleAlert size={26}/> Warning - Open the link in the same browser.</p>
                </div>
                </>
            )}
        </div>
    );
}
