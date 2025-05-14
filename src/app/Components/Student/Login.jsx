'use client';

import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        setLoading(true);

        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            setError(signInError.message);
            setLoading(false)
            return;
        }

        const userId = signInData.user.id;

        // 🔒 CHECK: Make sure this is a registered student
        const { data: registeredUser, error: regUserErr } = await supabase
            .from("registered_users")
            .select("email_copy")
            .eq("auth_student_id", userId)
            .single();

        if (regUserErr || !registeredUser) {
            setError("Access denied. Only students can log in here.");
            await supabase.auth.signOut(); // Optional: Log out just in case
            setLoading(false);
            return;
        }

        // const { data:updateStdData, error:updateStdErr } = await supabase
        //     .from('registered_users')
        //     .update({ auth_student_id: userId })
        //     .eq('email_copy', email);

        // if(updateStdErr) {
        //     console.log(updateStdErr.message);
        //     return;
        // }

        router.push('/dashboard');
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    
    };

    return (
        <div className="relative flex min-h-screen items-center bg-base-content justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Blurred Background Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-70 scale-110"
                style={{
                    backgroundImage:
                        "url('/bg-images/cyberpunk-wallpaper-2.jpg')",
                }}
            ></div>

            {/* Optional Overlay (for contrast) */}
            <div className="absolute inset-0 bg-black/30 z-0"></div>

            {/* Content Card */}
            <div className="relative z-10 flex flex-col lg:w-1/3 overflow-hidden rounded-3xl shadow-xl border border-base-300 bg-white/85 backdrop-blur-sm">
                <div className="w-full md:p-6 p-6 sm:p-6 lg:p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Image src={logo} width={80} height={80} alt="Logo" />
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-base-content/60">
                            Please login to your account
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="form-control w-full">
                            <div className="form-control w-full relative">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="input input-bordered w-full bg-gray-50 px-3 py-3 sm:py-4 text-sm sm:text-base rounded-lg pr-10 focus:outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon
                                        className="cursor-pointer"
                                        size={20}
                                    />
                                ) : (
                                    <EyeIcon
                                        className="cursor-pointer"
                                        size={20}
                                    />
                                )}
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        {/* <div className="text-right text-xs text-base-content/60">
                            <Link href="/student/login/forgot-password" className="hover:underline">
                                Forgot password?
                            </Link>
                        </div> */}

                        <button
                            type="submit"
                            className="btn btn-primary w-full py-5.5 rounded-xl normal-case text-sm sm:text-base"
                            disabled={loading ? true : false}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
