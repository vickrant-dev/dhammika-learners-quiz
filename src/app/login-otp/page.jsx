'use client';

import { useState } from "react";
import Link from "next/link";
import logo from "../assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const supabase = createClientComponentClient();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: false, // prevent unwanted user creation
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage("Redirecting...");
            router.push(`/login-otp/confirm?email=${encodeURIComponent(email)}`)     
        }

        setLoading(false);
    };

    return (
        <div className="relative flex min-h-screen items-center bg-base-content justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background and overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-70 scale-110"
                style={{ backgroundImage: "url('/bg-images/road-bg.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black/30 z-0"></div>

            {/* Login Card */}
            <div className="relative z-10 flex flex-col lg:w-1/3 overflow-hidden rounded-3xl shadow-xl border border-base-300 bg-white/85 backdrop-blur-sm">
                <div className="w-full md:p-6 p-6 sm:p-6 lg:p-8">
                    <div className="flex justify-center mb-6">
                        <Image src={logo} width={80} height={80} alt="Logo" />
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-base-content">Welcome Back</h2>
                        <p className="mt-2 text-sm text-base-content/60">Sign in with your email</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="form-control w-full">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="input input-bordered w-full bg-gray-50 px-3 py-3 sm:py-4 text-sm sm:text-base rounded-lg pr-10 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {message && <p className="text-green-600 text-sm">{message}</p>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary w-full py-5.5 rounded-xl normal-case text-sm sm:text-base"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                    <div className="mt-5 login-option">
                        <Link href="/login">
                            <p className="font-sm flex items-center justify-center underline underline-offset-2 text-sm">Login with Password</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
