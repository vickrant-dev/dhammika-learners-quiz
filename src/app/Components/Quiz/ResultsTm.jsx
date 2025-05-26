'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { quizData } from "../../utils/quizData"; // Adjust if needed
import { quizPaper } from "../../utils/quizChoice";
import { supabase } from "@/app/utils/supabase";
import {
    Award,
    RotateCcw,
    ChevronLeft,
    Home,
    ChevronRight,
    Clock,
} from "lucide-react";
import { quizDatatm as quiz1Datatm } from '../../utils/tamil/quizDatatm';
import { quiz2Datatm } from '../../utils/tamil/quiz2Datatm';
import { quiz3Datatm } from '../../utils/tamil/quiz3Datatm';
import { quiz4Datatm } from '../../utils/tamil/quiz4Datatm';
import Image from "next/image";

export default function ResultsTm() {
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

    //     console.log("uid:", currentUser?.id);
    // };

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    const quizDataMap = {
        1: quiz1Datatm,
        2: quiz2Datatm,
        3: quiz3Datatm,
        4: quiz4Datatm,
    };

    const quizData = quizDataMap[Number(quizLink)] || quiz1Datatm;

    const wrongAnswers = localStorage.getItem("WrongAnswers");
    const wrongAnswersObj = JSON.parse(wrongAnswers);

    const restartQuiz = () => {
        router.replace(`/dashboard/tm/quizCenter/quiz/${quizLink}`);
    };

    const handlePrevQuiz = () => {
        const newQuiz = quizNumber - 1;
        setQuizNumber(newQuiz);
        router.push(`/dashboard/tm/quizCenter/quiz/${newQuiz}`);
    };

    const handleNextQuiz = () => {
        const newQuiz = quizNumber + 1;
        setQuizNumber(newQuiz);
        router.push(`/dashboard/tm/quizCenter/quiz/${newQuiz}`);
    };

    const handleHome = () => {
        router.push(`/dashboard/tm/quizCenter`);
    };

    useEffect(() => {
        if (localStorage.getItem("quizCompleted") !== "true") {
            router.push(`/dashboard/tm/quizCenter/quiz/${quizLink}`);
        }
    }, [router, quizLink]);

    const results = (localStorage.getItem("quizScore") || 0);
    const storedResults = Number.parseInt(results);
    const timeTaken = Number(localStorage.getItem("time-taken") || 0);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const scorePercentage = Math.round((results / quizData.length) * 100);

    let performanceMessage = "";
    if (scorePercentage >= 80) {
        performanceMessage = "சிறப்பான பணி!";
    } else if (scorePercentage >= 60) {
        performanceMessage = "நல்ல வேலை!";
    } else if (scorePercentage >= 40) {
        performanceMessage = "நல்ல முயற்சி!";
    } else {
        performanceMessage = "தொடர்ந்து பயிற்சி செய்யுங்கள்!";
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
                                வினாடி வினா முடிவுகள்
                            </h2>
                        </div>
                        <button
                            onClick={restartQuiz}
                            className="btn btn-soft flex items-center gap-2 text-sm bg-base-300 hover:bg-base-300/50 text-gray-800 cursor-pointer rounded-lg transition-all duration-150 ease-in-out border-2"
                        >
                            <RotateCcw size={16} />
                            மறுதொடக்கம்
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
                                <span>மதிப்பெண்</span>
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
                                எடுக்கப்பட்ட நேரம்
                            </div>
                            <div className="text-sm">
                                {minutes > 0 &&
                                    `${minutes} ${minutes === 1 ? "நிமிடம்" : "நிமிடங்கள்"} `}
                                {seconds} வினாடிகள்
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
                                முந்தைய வினாடிவினா
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
                            வீடு
                        </button>

                        {quizNumber < quizPaper.length && (
                            <button
                                className="btn btn-primary border-2 bg-primary text-primary-content rounded-lg cursor-pointer text-md flex items-center gap-2 transition-all duration-150 ease-in-out"
                                onClick={handleNextQuiz}
                            >
                                அடுத்த வினாடிவினா
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
                        நீங்கள் தவறாகப் புரிந்து கொண்ட கேள்விகள்
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
