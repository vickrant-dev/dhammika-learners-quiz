import { useRouter, useSearchParams } from "next/navigation";
import { Globe, Home, HomeIcon } from "lucide-react";
import Head from "next/head";
import { useEffect } from "react";

const languages = [
    { code: "en", label: "English" },
    { code: "tm", label: "தமிழ்" },
    { code: "sm", label: "සිංහල" },
];

export default function LanguagePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const active = searchParams.get('active');

    useEffect(() => {
        if (!active) {
            router.replace("/dashboard/barcode");
            return;
        }
    }, [active]);

    const handleLanguageSelect = (lang) => {
        if (lang !== "en") {
            router.push(`/dashboard/${lang}/quizCenter`);
            return;
        }
        router.push(`/dashboard/quizCenter`);
    };

    return (
        <>
            <div>
                <title>Choose Language</title>
            </div>
            <div className="h-100 flex flex-col items-center justify-center bg-white px-4">
                <div className="flex items-center gap-2 mb-6">
                    <Globe className="w-6 h-6 text-gray-700" />
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Choose Your Language
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang.code)}
                            className="btn btn-outline w-full py-3 text-lg font-medium rounded-xl shadow-sm hover:shadow-md border-1 transition-all"
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
