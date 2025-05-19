'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function OtpVerifyPage() {
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const supabase = createClientComponentClient();

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (!email) {
            setError("Missing email. Please go back and start again.");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: otpCode,
            type: 'email',
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }
        setMessage('Login successful! Redirecting...');

        const userId = data.user.id;
        
        const { data: registeredUser, error: regUserErr } = await supabase
            .from("registered_users")
            .select("email_copy")
            .eq("auth_student_id", userId)
            .single();

        if (regUserErr || !registeredUser) {
            setError("Access denied. Only students can log in here.");
            await supabase.auth.signOut(); // Optional: Log out just in case ya know...
            setLoading(false);
            return;
        }

        router.push('/dashboard');
        setLoading(false);
    };

    // Fix otp login ui
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full space-y-6">
                <h2 className="text-center text-2xl font-bold text-base-content">
                    Enter OTP Code
                </h2>
                <p className="text-center text-sm text-base-content/70">
                    Check your email for a 6-digit verification code.
                </p>

                <form onSubmit={handleVerify} className="space-y-4">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d{6}"
                        maxLength={6}
                        className="input input-bordered w-full text-center text-lg tracking-widest"
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        required
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading || otpCode.length !== 6}
                    >
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </button>
                </form>
            </div>
        </div>
    );
}
