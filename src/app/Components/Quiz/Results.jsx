'use client'
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { useParams, useRouter } from "next/navigation";
import { quizData } from "../../utils/quizData";
import { quizPaper } from "../../utils/quizChoice";
import {
    Award,
    RotateCcw,
    ChevronLeft,
    Home,
    ChevronRight,
    Clock,
} from "lucide-react";

export default function Results() {

    const router = useRouter();

    const fetchUser = async () => {
        const {
            data: { user: currentUser },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !currentUser) {
            console.log("Error getting user:", userError?.message);
            router.push("/student/login");
            return;
        }

        const uid = currentUser?.id;
        console.log("uid:", uid);
        console.log("Authenticated user:", currentUser);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const { quizLink } = useParams();
    const [quizNumber, setQuizNumber] = useState(quizLink);

    const restartQuiz = () => {
        router.push(`/dashboard/quizCenter/quiz/${quizLink}`);
    };

    const handlePrevQuiz = () => {
        const newQuiz = Number.parseInt(quizNumber) - 1;
        setQuizNumber((quizNumber) => quizNumber - 1);
        router.push(`/dashboard/quizCenter/quiz/${newQuiz}`);
    };

    const handleNextQuiz = () => {
        const newQuiz = Number.parseInt(quizNumber) + 1;
        setQuizNumber((quizNumber) => quizNumber + 1);
        router.push(`/dashboard/quizCenter/quiz/${newQuiz}`);
    };

    const handleHome = () => {
        router.push(`/dashboard/quizCenter`);
    };

    useEffect(() => {
        if (localStorage.getItem("quizCompleted") !== "true") {
            router.push(`/dashboard/quizCenter/quiz/${quizLink}`);
        }
    }, [router, quizLink]);

    const results = localStorage.getItem("quizScore");
    const storedResults = Number.parseInt(results);

    const timeTaken = localStorage.getItem("time-taken");
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    // Calculate percentage for progress bar
    const scorePercentage = Math.round((storedResults / quizData.length) * 100);

    // Determine performance message
    let performanceMessage = "";
    if (scorePercentage >= 80) {
        performanceMessage = "Excellent work!";
    } else if (scorePercentage >= 60) {
        performanceMessage = "Good job!";
    } else if (scorePercentage >= 40) {
        performanceMessage = "Nice effort!";
    } else {
        performanceMessage = "Keep practicing!";
    }

    return (
        <>
            <div className="flex -mt-[0.28rem] pl-[1.25rem] lg:pl-[2.25rem] md:pl-[2.25rem] sm:pl-[2.25rem] pr-4 lg:pr-8 md:pr-8 sm:pr-4 ">
                <div className="w-full border border-base-300 rounded-2xl shadow-lg/4 p-6 sm:p-8 space-y-6 sm:space-y-8 bg-base-100">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3 text-gray-800">
                            <Award size={30} className="text-primary" />
                            <h2 className="text-lg sm:text-xl font-semibold">
                                Quiz Results
                            </h2>
                        </div>
                        <button
                            onClick={restartQuiz}
                            className="btn btn-soft flex items-center gap-2 text-sm bg-base-300 hover:bg-base-300/50 text-gray-800 cursor-pointer rounded-lg transition-all duration-150 ease-in-out border-2"
                        >
                            <RotateCcw size={16} />
                            Restart
                        </button>
                    </div>

                    {/* Performance Message */}
                    <div className="flex items-center justify-center font-medium text-base sm:text-lg text-primary text-center">
                        {performanceMessage}
                    </div>

                    {/* Score Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="text-3xl sm:text-4xl font-semibold text-neutral">
                            {storedResults}/{quizData.length}
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>Score</span>
                                <span>{scorePercentage}%</span>
                            </div>
                            <progress
                                className="progress progress-neutral w-full h-2"
                                value={scorePercentage}
                                max="100"
                            ></progress>
                        </div>
                    </div>

                    {/* Time Taken */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-gray-700">
                        <Clock size={24} className="text-primary" />
                        <div>
                            <div className="text-sm font-medium">
                                Time Taken
                            </div>
                            <div className="text-sm">
                                {minutes > 0 &&
                                    `${minutes} ${minutes === 1 ? "minute" : "minutes"} `}
                                {seconds} seconds
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-4 border-t border-gray-200 gap-4 sm:gap-0">
                        {quizNumber > 1 ? (
                            <button
                                className="btn btn-soft bg-base-300 text-base-content px-3.5 py-2 rounded-md cursor-pointer text-md hover:bg-base-300/50 hover:text-neutral flex items-center gap-2 transition border-2"
                                onClick={handlePrevQuiz}
                            >
                                <ChevronLeft
                                    size={19}
                                    className="-translate-y-[1px]"
                                />
                                Previous Quiz
                            </button>
                        ) : (
                            <div className={`${quizNumber > 1 ? "flex" :"hidden"}`}></div>
                        )}

                        <button
                            className="btn btn-soft bg-base-300 text-base-content px-3.5 py-2 rounded-lg cursor-pointer text-md hover:bg-base-300/50 flex items-center gap-2 transition-all duration-150 ease-in-out border-2"
                            onClick={handleHome}
                        >
                            <Home size={19} className="-translate-y-[1px]" />
                            Home
                        </button>

                        {quizNumber < quizPaper.length && (
                            <button
                                className="btn btn-primary border-2 bg-primary text-primary-content rounded-lg cursor-pointer text-md flex items-center gap-2 transition-all duration-150 ease-in-out"
                                onClick={handleNextQuiz}
                            >
                                Next Quiz
                                <ChevronRight
                                    size={19}
                                    className="-translate-y-[1px]"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
    
}
