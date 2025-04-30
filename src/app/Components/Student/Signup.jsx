'use client';

import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import logo from "../../assets/logo.png";
import Image from "next/image";
import cityroad_2 from "../../assets/city-road-2.jpg";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        // check if that email already exists
        
        console.log(email)
        console.log(password);
        
        // check form validity
        if(email !== null) {

            const { data:studentsData, error:studentsDataErr } = await supabase
                .from('registered_users')
                .select('email_copy')
                .eq('email_copy', email);

            console.log('students data:',studentsData);

            if(studentsData[0].email_copy === email && studentsData) {
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: email,
                    password: password, 
                });
        
                if (signUpError) {
                    setError(signUpError.message);
                    return;
                }
        
                router.push('/student/login');
            }
            else {
                console.log('Your email is not registered. Please contact the institution to get it registered.')
            }

        }

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-100 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-fit max-w-6xl overflow-hidden rounded-3xl shadow-xl border border-base-300">
                {/* Left Column - Image */}
                <div className="hidden lg:block lg:w-1/2 bg-gray-100">
                    <Image
                        src={cityroad_2}
                        className="h-full w-full object-cover"
                        alt="City road"
                    />
                </div>

                {/* Right Column - Login Form */}
                <div className="w-full lg:w-1/2 bg-white md:p-6 p-6 sm:p-6 lg:p-12">
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
                    <form className="space-y-5" onSubmit={handleSignup}>
                        <div className="form-control w-full">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="input input-bordered w-full bg-gray-50 px-3 py-3 sm:py-4 text-sm sm:text-base rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control w-full relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input input-bordered w-full bg-gray-50 px-3 py-3 sm:py-4 text-sm sm:text-base rounded-lg pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="cursor-pointer" size={20} />
                                ) : (
                                    <EyeIcon className="cursor-pointer" size={20} />
                                )}
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="text-right text-xs text-base-content/60">
                            <Link href="#" className="hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full py-5.5 rounded-xl normal-case text-sm sm:text-base"
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
