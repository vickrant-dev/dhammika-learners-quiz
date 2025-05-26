'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { quizData } from "@/app/utils/quizData"; // Make sure this path is correct
import { quizPaper } from "@/app/utils/quizChoice"; // Make sure this path is correct
import { supabase } from "@/app/utils/supabase";
import {
    Award,
    RotateCcw,
    ChevronLeft,
    Home,
    ChevronRight,
    Clock,
} from "lucide-react";
import { quizDatasm as quiz1Datasm } from "../../utils/sinhala/quizDatasm";
import { quiz2Datasm } from "../../utils/sinhala/quiz2Datasm";
import { quiz3Datasm } from "../../utils/sinhala/quiz3Datasm";
import { quiz4Datasm } from "../../utils/sinhala/quiz4Datasm";
import Image from "next/image";

export default function ResultsSm() {
    const router = useRouter();
    const { quizLink } = useParams();
    const [quizNumber, setQuizNumber] = useState(Number(quizLink));

    // const fetchUser = async () => {
    //     const {
    //         data: { user: currentUser },
    //         error: userError,
    //     } = await supabase.auth.getUser();

    //     if (userError || !currentUser) {
    //         console.log("Error getting user:", userError?.message);
    //         router.push("/student/login");
    //         return;
    //     }

    //     console.log("uid:", currentUser.id);
    // };

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    const quizDataMap = {
        1: quiz1Datasm,
        2: quiz2Datasm,
        3: quiz3Datasm,
        4: quiz4Datasm,
    };

    const quizData = quizDataMap[Number(quizLink)] || quiz1Datasm;

    const wrongAnswers = localStorage.getItem("WrongAnswers");
    const wrongAnswersObj = JSON.parse(wrongAnswers);

    const restartQuiz = () => {
        router.replace(`/dashboard/sm/quizCenter/quiz/${quizLink}`);
    };

    const handlePrevQuiz = () => {
        const newQuiz = quizNumber - 1;
        setQuizNumber(newQuiz);
        router.push(`/dashboard/sm/quizCenter/quiz/${newQuiz}`);
    };

    const handleNextQuiz = () => {
        const newQuiz = quizNumber + 1;
        setQuizNumber(newQuiz);
        router.push(`/dashboard/sm/quizCenter/quiz/${newQuiz}`);
    };

    const handleHome = () => {
        router.push(`/dashboard/sm/quizCenter`);
    };

    useEffect(() => {
        if (localStorage.getItem("quizCompleted") !== "true") {
            router.push(`/dashboard/sm/quizCenter/quiz/${quizLink}`);
        }
    }, [router, quizLink]);

    const results = localStorage.getItem("quizScore");
    const storedResults = Number(results || 0);

    const timeTaken = Number(localStorage.getItem("time-taken") || 0);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    const scorePercentage = Math.round((storedResults / quizData.length) * 100);

    let performanceMessage = "";
    if (scorePercentage >= 80) {
        performanceMessage = "විශිෂ්ට වැඩක්!";
    } else if (scorePercentage >= 60) {
        performanceMessage = "හොඳ වැඩක්!";
    } else if (scorePercentage >= 40) {
        performanceMessage = "ලස්සන උත්සාහයක්!";
    } else {
        performanceMessage = "දිගටම පුහුණු වන්න!";
    }

    return (
        <>
            <div className="flex -mt-[0.28rem] pl-[2.25rem] pr-4 lg:pr-8 md:pr-8 sm:pr-4 ">
                <div className="w-full border border-base-300 rounded-2xl shadow-lg/4 p-6 sm:p-8 space-y-6 sm:space-y-8 bg-base-100">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3 text-gray-800">
                            <Award size={30} className="text-primary" />
                            <h2 className="text-lg sm:text-xl font-semibold">
                                ප්‍රශ්න විචාරාත්මක ප්‍රතිඵල
                            </h2>
                        </div>
                        <button
                            onClick={restartQuiz}
                            className="btn btn-soft flex items-center gap-2 text-sm bg-base-300 hover:bg-base-300/50 text-gray-800 cursor-pointer rounded-lg transition-all duration-150 ease-in-out border-2"
                        >
                            <RotateCcw size={16} />
                            යළි අරඹන්න
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
                                <span>ස්කෝර්</span>
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
                                ගත වූ කාලය
                            </div>
                            <div className="text-sm">
                                {minutes > 0 &&
                                    `${minutes} ${minutes === 1 ? "මිනිත්තුව" : "විනාඩි"} `}
                                {seconds} තත්පර
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
                                පෙර ප්‍රශ්නාවලිය
                            </button>
                        ) : (
                            <div
                                className={`${quizNumber > 1 ? "flex" : "hidden"}`}
                            ></div>
                        )}

                        <button
                            className="btn btn-soft bg-base-300 text-base-content px-3.5 py-2 rounded-lg cursor-pointer text-md hover:bg-base-300/50 flex items-center gap-2 transition-all duration-150 ease-in-out border-2"
                            onClick={handleHome}
                        >
                            <Home size={19} className="-translate-y-[1px]" />
                            නිවස
                        </button>

                        {quizNumber < quizPaper.length && (
                            <button
                                className="btn btn-primary border-2 bg-primary text-primary-content rounded-lg cursor-pointer text-md flex items-center gap-2 transition-all duration-150 ease-in-out"
                                onClick={handleNextQuiz}
                            >
                                ඊළඟ ප්‍රශ්නාවලිය
                                <ChevronRight
                                    size={19}
                                    className="-translate-y-[1px]"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="qa-container mt-10 pl-[2.25rem] pb-1 pr-8">
                <div className="heading mb-10">
                    <p className="text-xl font-semibold">
                        ඔබ වැරදියට තේරුම් ගත් ප්‍රශ්න
                    </p>
                </div>
                {/* Question + Image */}
                {Object.entries(wrongAnswersObj).map(([key, value]) => (
                    <div key={key + value} className="mb-20">
                        <div className="img-container flex flex-col sm:flex-row gap-5 items-start">
                            {quizData[key].src && (
                                <Image
                                    src={quizData[key].src}
                                    width={130}
                                    alt="quizImage"
                                    className="rounded-md"
                                />
                            )}
                            <div className="q-container text-base sm:text-lg font-medium">
                                <p>
                                    {+key + 1}. {quizData[key].question}
                                    {/* + --> shorthand for taking it as a number */}
                                </p>
                            </div>
                        </div>
                        {/* Answers */}
                        <div className="a-container mt-6 sm:mt-8 flex flex-col gap-4">
                            {quizData[key].answers.map((answer, index) => (
                                <li
                                    className={`list-none transition-all duration-150 ease-in-out border border-primary/20 p-4 rounded-lg select-none text-sm sm:text-base ${answer.correct ? "bg-green-500 text-base-100" : "bg-none"} ${index === value ? "bg-red-500 text-base-100" : "bg-none"}`}
                                    key={index}
                                >
                                    {answer.text}
                                </li>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
