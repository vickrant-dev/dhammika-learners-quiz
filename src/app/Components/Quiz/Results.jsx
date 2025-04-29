import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate();
    const { quizLink } = useParams();
    const [quizNumber, setQuizNumber] = useState(quizLink);

    const restartQuiz = () => {
        navigate(`/quizCenter/quiz/${quizLink}`);
    };

    const handlePrevQuiz = () => {
        const newQuiz = Number.parseInt(quizNumber) - 1;
        setQuizNumber((quizNumber) => quizNumber - 1);
        navigate(`/quizCenter/quiz/${newQuiz}`);
    };

    const handleNextQuiz = () => {
        const newQuiz = Number.parseInt(quizNumber) + 1;
        setQuizNumber((quizNumber) => quizNumber + 1);
        navigate(`/quizCenter/quiz/${newQuiz}`);
    };

    const handleHome = () => {
        navigate(`/quizCenter`);
    };

    useEffect(() => {
        if (localStorage.getItem("quizCompleted") !== "true") {
            navigate(`/quizCenter/quiz/${quizLink}`);
        }
    }, [navigate]);

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
            <div className="flex mt-10">
                <div className="w-full max-w-xl border border-base-300 rounded-2xl shadow-lg/4 p-8 space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-800">
                            <Award size={26} className="text-primary" />
                            <h2 className="text-xl font-semibold">
                                Quiz Results
                            </h2>
                        </div>
                        <button
                            onClick={restartQuiz}
                            className="btn btn-soft flex items-center gap-2 text-sm bg-base-300 hover:bg-base-300/50 text-gray-800 cursor-pointer rounded-lg transition-all duration-150 ease-in-out"
                        >
                            <RotateCcw size={16} />
                            Restart
                        </button>
                    </div>

                    {/* Performance Message */}
                    <div className="flex items-center justify-center font-medium text-lg text-primary">
                        {performanceMessage}
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="text-4xl font-semibold text-neutral">
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

                    {/* Time Display */}
                    <div className="flex items-center gap-4 text-gray-700">
                        <Clock size={28} className="text-primary" />
                        <div>
                            <div className="text-sm font-medium">
                                Time Taken
                            </div>
                            <div className="text-sm">
                                {minutes > 0 &&
                                    `${minutes} ${
                                        minutes === 1 ? "minute" : "minutes"
                                    } `}
                                {seconds} seconds
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className={`flex ${quizNumber > 1 ? "justify-between" : "justify-between"} items-center pt-4 border-t border-gray-200`}>
                        {quizNumber > 1 ? (
                            <button
                                className="btn btn-soft bg-base-300 text-base-content px-3.5 py-2 rounded-md cursor-pointer text-md hover:bg-base-300/50  hover:text-neutral flex items-center gap-2 transition"
                                onClick={handlePrevQuiz}
                            >
                                <ChevronLeft size={19} className="-translate-y-[1px]" />
                                Previous
                            </button>
                        ) : (
                            ""
                        )}

                        <button
                            className={`btn btn-soft bg-base-300 text-base-content px-3.5 py-2 rounded-lg cursor-pointer text-md hover:bg-base-300/50 flex items-center gap-2 transition-all duration-150 ease-in-out`}
                            onClick={handleHome}
                        >
                            <Home size={19} className="-translate-y-[1px]" />
                            Home
                        </button>

                        {quizNumber < quizPaper.length && (
                            <button
                                className="btn btn-soft bg-primary text-primary-content rounded-lg cursor-pointer text-md hover:bg-primary/75 flex items-center gap-2 transition-all duration-150 ease-in-out"
                                onClick={handleNextQuiz}
                            >
                                Next
                                <ChevronRight size={19} className="-translate-y-[1px]" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
