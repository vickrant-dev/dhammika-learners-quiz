"use client"; // Ensure it runs in the browser

import React, { useEffect, useState } from "react";
import { quizDatasm as quiz1Datasm } from "../../utils/sinhala/quizDatasm";
import { quiz2Datasm } from "../../utils/sinhala/quiz2Datasm";
import { quiz3Datasm } from "../../utils/sinhala/quiz3Datasm";
import { quiz4Datasm } from "../../utils/sinhala/quiz4Datasm";
import Timer from "./Timer";
import { useRouter, useParams } from "next/navigation";
import "./QuizStyles.css";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function QuizSm() {
    const router = useRouter();
    const { quizLink } = useParams();

    const [user, setUser] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [usersAnswers, setUsersAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const [counter, setCounter] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState({});

    const quizDataMap = {
        1: quiz1Datasm,
        2: quiz2Datasm,
        3: quiz3Datasm,
        4: quiz4Datasm,
    };

    const quizData = quizDataMap[quizLink] || quiz1Datasm;

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const { data: { user: currentUser }, error } = await supabase.auth.getUser();
    //         if (error || !currentUser) {
    //             console.log("Error:", error?.message);
    //             router.push("/student/login");
    //         } else {
    //             setUser(currentUser);
    //             console.log("User authenticated:", currentUser);
    //         }
    //     };

    //     fetchUser();
    // }, []);

    const handleAnswerCheck = (e, ans, i) => {
        setCounter(counter + 1);
        if (ans.correct) {
            setUsersAnswers({ ...usersAnswers, [currentQuestion]: i });
            setScore((prevScore) => prevScore + 1);
            e.target.classList.add("correct");
        } else {
            setUsersAnswers({ ...usersAnswers, [currentQuestion]: i });
            e.target.classList.add("wrong");
            setWrongAnswers({ ...wrongAnswers, [currentQuestion]: i });
            [...e.target.parentElement.children].forEach((el) => {
                if (el.dataset.isCorrect === "true") {
                    el.classList.add("correct");
                }
            });
        }

        [...e.target.parentElement.children].forEach((el) => {
            el.classList.add("disabled");
        });
    };

    const handleNext = () => {
        if (currentQuestion !== quizData.length - 1) {
            if (usersAnswers[currentQuestion] !== undefined) {
                document.querySelectorAll(".a-container li").forEach((li) => {
                    li.classList.remove("correct", "wrong", "disabled");
                });
                setCurrentQuestion(currentQuestion + 1);
            } else {
                alert("Please answer the current question before proceeding.");
            }
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            document.querySelectorAll(".a-container li").forEach((li) => {
                li.classList.remove("correct", "wrong", "disabled");
            });
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        if (usersAnswers[currentQuestion] !== undefined) {
            setIsSubmitted(true);
            localStorage.setItem("quizCompleted", "true");
            localStorage.setItem("quizScore", score.toString());
            localStorage.setItem("WrongAnswers", JSON.stringify(wrongAnswers));
            router.replace(`/dashboard/sm/quizCenter/quiz/${quizLink}/results`);
        } else {
            alert("Please answer the current question before submitting.");
        }
    };

    const handleTimeUp = () => {
        let currentScore = 0;
        quizData.forEach((quizEl, index) => {
            if (usersAnswers[index] === quizEl.ans) {
                currentScore++;
            }
        });

        setScore(currentScore);
        setIsSubmitted(true);
        localStorage.setItem("quizCompleted", "true");
        localStorage.setItem("quizScore", currentScore);
        router.replace(`/dashboard/quizCenter/quiz/${quizLink}/results`); // ✅ Updated navigation
    };

   const handleTimeElapsed = (time) => {
       setTimeTaken(time);
       localStorage.setItem("time-taken", time);
   };

    return (
        <>
            <div className="quiz flex -mt-[0.28rem] pl-[2.25rem] pr-4 lg:pr-8 md:pr-8 sm:pr-4 mb-7 gap-3">
                <div className="quiz-container w-full bg-primary-content/18 rounded-xl overflow-hidden border border-base-300 shadow-lg/6 backdrop-blur-sm bg-opacity-90">
                    {/* Header */}
                    <div className="heading p-4 sm:p-6 border-b border-neutral/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-semibold">
                            ප්‍රශ්නාවලිය
                        </h2>
                        <Timer
                            onTimeUp={handleTimeUp}
                            isSubmitted={isSubmitted}
                            onTimeElapsed={handleTimeElapsed}
                        />
                    </div>

                    {/* Question/Answer Body */}
                    <div className="qa-container p-4 sm:p-6">
                        {/* Question + Image */}
                        <div className="img-container flex flex-col sm:flex-row gap-5 items-start">
                            {quizData[currentQuestion].src && (
                                <Image
                                    src={quizData[currentQuestion].src}
                                    width={130}
                                    alt="quizImage"
                                    className="rounded-md"
                                />
                            )}
                            <div className="q-container text-base sm:text-lg font-medium">
                                <p>
                                    {currentQuestion + 1}.{" "}
                                    {quizData[currentQuestion].question}
                                </p>
                            </div>
                        </div>

                        {/* Answers */}
                        <div className="a-container mt-6 sm:mt-8 flex flex-col gap-4">
                            {quizData[currentQuestion].answers.map(
                                (answer, index) => (
                                    <li
                                        className="list-none transition-all duration-150 ease-in-out border border-primary/20 hover:bg-primary-content/70 p-4 rounded-lg cursor-pointer text-sm sm:text-base"
                                        key={index}
                                        onClick={(e) =>
                                            handleAnswerCheck(e, answer, index)
                                        }
                                        data-is-correct={`${answer.correct}`}
                                    >
                                        {answer.text}
                                    </li>
                                )
                            )}
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="p-4 sm:p-6 border-t border-neutral/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <p className="text-sm text-base-content/90">
                            {currentQuestion + 1} of {quizData.length} questions
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button
                                onClick={handleBack}
                                className={`w-full sm:w-[100px] rounded-md ${
                                    currentQuestion > 0
                                        ? "back-btn active"
                                        : "back-btn"
                                } border border-primary/50 btn btn-primary bg-primary-content/50 text-primary`}
                            >
                                ආපසු
                            </button>
                            <button
                                onClick={
                                    currentQuestion === quizData.length - 1
                                        ? handleSubmit
                                        : handleNext
                                }
                                className="w-full sm:w-[100px] rounded-md next-btn btn btn-primary"
                            >
                                {currentQuestion === quizData.length - 1
                                    ? "ඉදිරිපත් කරන්න"
                                    : "ඊළඟ"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="qa-table bg-primary-content/18 rounded-xl overflow-hidden border border-base-300 shadow-lg/6 backdrop-blur-sm bg-opacity-90 p-5">
                    <div className="heading border-b border-neutral/10 pt-1.25 pb-2 gap-2">
                        <h2 className="text-md font-semibold">
                            ඔබේ ප්‍රශ්න විචාරාත්මක ප්‍රගතිය
                        </h2>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-7">
                        {quizData.map((_, i) => (
                            <div
                                key={i}
                                className={`w-6.5 h-6.5 text-sm flex items-center justify-center rounded-lg border border-base-content ${counter >= i + 1 ? "bg-blue-500 text-base-100" : "bg-none"}`}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
