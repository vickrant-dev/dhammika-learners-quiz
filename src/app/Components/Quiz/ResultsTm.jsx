import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { quizData } from "../../utils/quizData";
import { quizPaper } from "../../utils/quizChoice";
import './QuizApp.css';
import {
    Award,
    RotateCcw,
    ChevronLeft,
    Home,
    ChevronRight,
    Clock,
} from "lucide-react";

export default function ResultsTm() {
    const navigate = useNavigate();
    const { quizLink } = useParams();
    const [quizNumber, setQuizNumber] = useState(quizLink);

    const restartQuiz = () => {
        navigate(`/quizCenter-tm/quiz/tm/${quizLink}`, { replace: true });
    };

    const handlePrevQuiz = () => {
        const newQuiz = Number.parseInt(quizNumber) - 1;
        setQuizNumber((quizNumber) => quizNumber - 1);
        navigate(`/quizCenter-tm/quiz/tm/${newQuiz}`);
    };

    const handleNextQuiz = () => {
        const newQuiz = Number.parseInt(quizNumber) + 1;
        setQuizNumber((quizNumber) => quizNumber + 1);
        navigate(`/quizCenter-tm/quiz/tm/${newQuiz}`);
    };

    const handleHome = () => {
        navigate(`/quizCenter-tm`);
    };

    useEffect(() => {
        if (localStorage.getItem("quizCompleted") !== "true") {
            navigate(`/quizCenter-tm/quiz/tm/${quizLink}`);
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
            <div className="results-container">
                <div className="results-card">
                    <div className="results-header">
                        <div className="results-title">
                            <Award size={40} className="results-icon" />
                            <h2>Quiz Results</h2>
                        </div>
                        <button
                            className="restart-button"
                            onClick={restartQuiz}
                        >
                            <RotateCcw size={18} />
                            <span>Restart</span>
                        </button>
                    </div>

                    <div className="results-summary">
                        <div className="performance-message">
                            <h3>{performanceMessage}</h3>
                        </div>

                        <div className="score-display">
                            <div className="score-circle">
                                <div className="score-number">
                                    {storedResults}
                                </div>
                                <div className="score-total">
                                    /{quizData.length}
                                </div>
                            </div>

                            <div className="score-progress">
                                <div className="progress-label">
                                    <span>Score</span>
                                    <span>{scorePercentage}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${scorePercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="time-display">
                            <Clock size={40} className="time-icon" />
                            <div className="time-details">
                                <span className="time-label">Time Taken</span>
                                <span className="time-value">
                                    {minutes > 0 &&
                                        `${minutes} ${
                                            minutes === 1 ? "minute" : "minutes"
                                        } `}
                                    {seconds} seconds
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="results-navigation">
                        {quizNumber > 1 && (
                            <button
                                className="nav-button prev-button"
                                onClick={handlePrevQuiz}
                            >
                                <ChevronLeft size={20} />
                                <span>Previous Quiz</span>
                            </button>
                        )}

                        <button
                            className="nav-button home-button"
                            onClick={handleHome}
                        >
                            <Home size={20} />
                            <span>Home</span>
                        </button>

                        {quizNumber < quizPaper.length && (
                            <button
                                className="nav-button next-button"
                                onClick={handleNextQuiz}
                            >
                                <span>Next Quiz</span>
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
