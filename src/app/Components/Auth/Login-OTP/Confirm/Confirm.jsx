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

        const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', userId)
            .single();

        if (profileError || userProfile?.role !== 'admin') {
            setError('Access denied. Only admins can log in.');
            await supabase.auth.signOut();
            setLoading(false);
            return;
        }

        router.push('/admin');
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-base-content px-4 overflow-hidden">
            {/* Background image and overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-70 scale-110"
                style={{ backgroundImage: "url('/bg-images/road-bg.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black/30 z-0"></div>

            {/* OTP Card */}
            <div className="relative z-10 bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl border border-base-300 p-8 max-w-md w-full space-y-6">
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
                        className="input input-bordered w-full text-center text-lg tracking-widest bg-gray-50"
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
