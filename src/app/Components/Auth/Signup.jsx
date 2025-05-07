'use client';

import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
            return;
        }

        const user = signUpData.user;

        if (!user) {
            setError("Signup failed. No user returned.");
            setLoading(false);
            return;
        }

        const { error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    id: user.id,
                    email,
                    role: 'admin',
                },
            ]);

        if (insertError) {
            setError("Failed to save user role: " + insertError.message);
            await supabase.auth.signOut();
            setLoading(false);
            return;
        }

        router.push('/admin');
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-base-content">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/bg-images/road-bg.jpg')" }}></div>
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            <div className="relative z-10 flex flex-col w-1/3 overflow-hidden rounded-3xl shadow-xl border border-base-300 bg-white/80 backdrop-blur-md">
                <div className="w-full p-6 sm:p-8">
                    <div className="flex justify-center mb-6">
                        <Image src={logo} width={80} height={80} alt="Logo" />
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
                            Admin Signup
                        </h2>
                        <p className="mt-2 text-sm text-base-content/60">
                            Create your admin account
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSignup}>
                        <div className="form-control w-full">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="input input-bordered w-full bg-gray-50 px-3 py-3 sm:py-4 text-sm sm:text-base rounded-lg focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control w-full relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input input-bordered w-full bg-gray-50 px-3 py-3 sm:py-4 text-sm sm:text-base rounded-lg pr-10 focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary w-full py-5.5 rounded-xl normal-case text-sm sm:text-base"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-base-content/60">
                        Already have an account? <Link href="/login" className="text-primary hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
