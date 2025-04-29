import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 text-center">
                <div className="relative mx-auto w-32 h-32">
                    <div className="absolute inset-0 flex items-center justify-center text-8xl font-extrabold text-indigo-300">
                        404
                    </div>
                </div>

                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Page not found
                </h2>

                <p className="mt-2 text-lg text-gray-600">
                    Oops! The page you're looking for doesn't exist.
                </p>

                <p className="text-sm text-gray-500">
                    It might have been moved or deleted, or perhaps there was a
                    typo in the URL.
                </p>

                <div className="mt-6">
                    <button
                        onClick={handleGoHome}
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Return to homepage
                    </button>
                </div>

                <div className="mt-6 text-sm">
                    <p className="text-gray-600">
                        Need help?{" "}
                        <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Contact support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
