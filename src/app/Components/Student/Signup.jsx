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

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

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
                    options: {
                        emailRedirectTo: "https://dhammika-learners-next.vercel.app/student/login"
                    } 
                });
        
                if (signUpError) {
                    setError(signUpError.message);
                    setLoading(false);
                    return;
                }

                const userID = signUpData?.user?.id;
                const { data:regUserData, error:regUserErr } = await supabase
                    .from("registered_users")
                    .update({
                        auth_student_id: userID
                    })
                    .eq("email_copy", email)
                
                if (regUserErr) {
                    console.log("Error updating registered users: ", regUserErr.message);
                    setLoading(false);
                    return;
                }
                
                setLoading(false);
                console.log("updated reg users successfully");
                router.push('/student/emailConfirm');
            }
            else {
                console.log('Your email is not registered. Please contact the institution to get it registered.');
                setLoading(false);
            }

        }

    };

    return (
        <div className="relative flex min-h-screen items-center bg-base-content justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-70 scale-110"
                style={{
                    backgroundImage:
                        "url('/bg-images/cyberpunk-wallpaper-2.jpg')",
                }}
            ></div>

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/30 z-0"></div>

            {/* Signup Form Card */}
            <div className="relative z-10 flex flex-col lg:w-1/3 overflow-hidden rounded-3xl shadow-xl border border-base-300 bg-white/85 backdrop-blur-sm">
                <div className="w-full md:p-6 p-6 sm:p-6 lg:p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Image src={logo} width={80} height={80} alt="Logo" />
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-sm text-base-content/60">
                            Enter your details to sign up
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

                        <div className="text-right text-xs text-base-content/60">
                            <Link
                                href="/student/login"
                                className="hover:underline"
                            >
                                Already have an account?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full py-5.5 rounded-xl normal-case text-sm sm:text-base"
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
