import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EmailConfirmation() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
            <div className="max-w-md w-full border border-base-300 bg-white rounded-2xl shadow-md/8 p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-base-200 p-4 rounded-full">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>
                </div>

                <h1 className="text-2xl font-medium mb-2">Check your email</h1>

                <p className="text-base-content/70 mb-6">
                    We've sent a confirmation link to your email address. Please
                    check your inbox to complete the verification process.
                </p>

                <div className="border-t border-base-200 pt-6 mt-6">
                    <Link
                        href="/student/login"
                        className="inline-flex items-center text-primary hover:underline font-medium"
                    >
                        Back to login
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
