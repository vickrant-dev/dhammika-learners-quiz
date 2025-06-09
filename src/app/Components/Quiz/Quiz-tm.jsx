'use client';

import React, { useEffect, useState } from 'react';
import { quizDatatm as quiz1Datatm } from '../../utils/tamil/quizDatatm';
import { quiz2Datatm } from '../../utils/tamil/quiz2Datatm';
import { quiz3Datatm } from '../../utils/tamil/quiz3Datatm';
import { quiz4Datatm } from '../../utils/tamil/quiz4Datatm';
import Timer from './Timer';
import './QuizStyles.css';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from "next/navigation";

export default function QuizTm() {
    const router = useRouter();
    const { quizLink } = useParams();

    const quizDataMap = {
        "1": quiz1Datatm,
        "2": quiz2Datatm,
        "3": quiz3Datatm,
        "4": quiz4Datatm,
    };

    const quizData = quizDataMap[quizLink] || quiz1Datatm;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [usersAnswers, setUsersAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [counter, setCounter] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState({});

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

    //     console.log("Authenticated user:", currentUser);
    // };

    // useEffect(() => {
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
            setWrongAnswers({ ...wrongAnswers, [currentQuestion]: i });
            e.target.classList.add("wrong");
            [...e.target.parentElement.children].forEach((el) => {
                if (el.dataset.isCorrect === "true") {
                    el.classList.add("correct");
                }
            });
        }
        [...e.target.parentElement.children].forEach((el) =>
            el.classList.add("disabled")
        );
    };

    const handleNext = () => {
        document.querySelectorAll(".a-container li").forEach((li) => {
            li.classList.remove("correct", "wrong", "disabled");
        });
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            document.querySelectorAll(".a-container li").forEach((li) =>
                li.classList.remove("correct", "wrong", "disabled")
            );
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        const totalQuestions = quizData.length;
        const answeredQuestions = Object.keys(usersAnswers).length;

        if (answeredQuestions < totalQuestions) {
            alert("Please answer all questions before submitting the quiz.");
            return;
        }

        setIsSubmitted(true);
        localStorage.setItem("quizCompleted", "true");
        localStorage.setItem("quizScore", score);
        localStorage.setItem("WrongAnswers", JSON.stringify(wrongAnswers));
        router.replace(`/dashboard/quizCenter/quiz/${quizLink}/results`);
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
        localStorage.setItem("WrongAnswers", JSON.stringify(wrongAnswers));
        router.replace(`/dashboard/tm/quizCenter/quiz/${quizLink}/results`);
    };

    const handleTimeElapsed = (time) => {
        setTimeTaken(time);
        localStorage.setItem("time-taken", time);
    };

    useEffect(() => {
        if (currentQuestion in usersAnswers) {
            const answerIndex = usersAnswers[currentQuestion];
            const answerElements = document.querySelectorAll(".a-container li");
            answerElements.forEach((el, elIndex) => {
                el.classList.add("disabled");
                if (elIndex === answerIndex) {
                    el.classList.add(
                        el.dataset.isCorrect === "true" ? "correct" : "wrong"
                    );
                    if (el.dataset.isCorrect !== "true") {
                        answerElements.forEach((ansEl) => {
                            if (ansEl.dataset.isCorrect === "true") {
                                ansEl.classList.add("correct");
                            }
                        });
                    }
                }
            });
        }
    }, [currentQuestion, usersAnswers]);

    return (
        <>
            <div className="quiz flex -mt-[0.28rem] pl-[2.25rem] pr-4 lg:pr-8 md:pr-8 sm:pr-4 mb-7 gap-3">
                <div className="quiz-container w-full bg-primary-content/18 rounded-xl overflow-hidden border border-base-300 shadow-lg/6 backdrop-blur-sm bg-opacity-90">
                    {/* Header */}
                    <div className="heading p-4 sm:p-6 border-b border-neutral/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-semibold">
                            Quiz
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
                                Back
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
                                    ? "Submit"
                                    : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="qa-table bg-primary-content/18 rounded-xl overflow-hidden border border-base-300 shadow-lg/6 backdrop-blur-sm bg-opacity-90 p-5">
                    <div className="heading border-b border-neutral/10 pt-1.25 pb-2 gap-2">
                        <h2 className="text-md font-semibold">
                            உங்கள் வினாடி வினா முன்னேற்றம்
                        </h2>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-7">
                        {quizData.map((_, i) => {
                            const isAnswered = usersAnswers[i] !== undefined;
                            const bgColor = isAnswered
                                ? "bg-blue-500 text-base-100"
                                : "bg-gray-300 text-gray-800";

                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        document
                                            .querySelectorAll(".a-container li")
                                            .forEach((li) =>
                                                li.classList.remove(
                                                    "correct",
                                                    "wrong",
                                                    "disabled"
                                                )
                                            );
                                        setCurrentQuestion(i);
                                    }}
                                    className={`cursor-pointer w-6.5 h-6.5 text-sm flex items-center justify-center rounded-lg border border-base-content ${bgColor} hover:brightness-90 transition`}
                                    title={`Go to question ${i + 1}`}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
