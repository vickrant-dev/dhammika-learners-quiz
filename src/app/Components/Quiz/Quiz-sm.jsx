"use client"; // Ensure it runs in the browser

import React, { useEffect, useState } from "react";
import { quizDatasm as quiz1Datasm } from "../../utils/sinhala/quizDatasm";
import { quiz2Datasm } from "../../utils/sinhala/quiz2Datasm";
import { quiz3Datasm } from "../../utils/sinhala/quiz3Datasm";
import { quiz4Datasm } from "../../utils/sinhala/quiz4Datasm";
import Timer from "./Timer";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/app/utils/supabase";
import "./QuizStyles.css";

export default function QuizSm() {
    const router = useRouter();
    const params = useParams();
    const quizLink = params.quizLink;

    const [user, setUser] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [usersAnswers, setUsersAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const quizDataMap = {
        1: quiz1Datasm,
        2: quiz2Datasm,
        3: quiz3Datasm,
        4: quiz4Datasm,
    };

    const quizData = quizDataMap[quizLink] || quiz1Datasm;

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user: currentUser }, error } = await supabase.auth.getUser();
            if (error || !currentUser) {
                console.log("Error:", error?.message);
                router.push("/student/login");
            } else {
                setUser(currentUser);
                console.log("User authenticated:", currentUser);
            }
        };

        fetchUser();
    }, []);

    const handleAnswerCheck = (index, answer) => {
        if (selectedAnswers[currentQuestion] !== undefined) return;

        const isCorrect = answer.correct;
        const newAnswers = { ...usersAnswers, [currentQuestion]: index };
        setUsersAnswers(newAnswers);
        setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: { index, isCorrect } });

        if (isCorrect) setScore((prev) => prev + 1);
    };

    const handleNext = () => {
        if (usersAnswers[currentQuestion] !== undefined) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            alert("Please answer the current question before proceeding.");
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        if (usersAnswers[currentQuestion] !== undefined) {
            setIsSubmitted(true);
            localStorage.setItem("quizCompleted", "true");
            localStorage.setItem("quizScore", score.toString());

            router.push(`/dashboard/sm/quizCenter/quiz/${quizLink}/results`);
        } else {
            alert("Please answer the current question before submitting.");
        }
    };

    const handleTimeUp = () => {
        let currentScore = 0;

        quizData.forEach((quizEl, index) => {
            if (usersAnswers[index] === quizEl.ans) currentScore++;
        });

        setScore(currentScore);
        setIsSubmitted(true);
        localStorage.setItem("quizCompleted", "true");
        localStorage.setItem("quizScore", currentScore.toString());

        router.push(`/dashboard/sm/quizCenter/quiz/${quizLink}/results`);
    };

    const handleTimeElapsed = (time) => {
        setTimeTaken(time);
        localStorage.setItem("time-taken", time.toString());
    };

    return (
        <div className="quiz flex items-center my-7">
            <div className="quiz-container w-full bg-primary-content/18 rounded-xl overflow-hidden border border-base-300 shadow-lg/6 backdrop-blur-sm bg-opacity-90">
                <div className="heading p-6 border-b border-neutral/10 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Quiz</h2>
                    <Timer
                        onTimeUp={handleTimeUp}
                        isSubmitted={isSubmitted}
                        onTimeElapsed={handleTimeElapsed}
                    />
                </div>

                <div className="qa-container p-6">
                    <div className="img-container flex">
                        {quizData[currentQuestion].src && (
                            <img
                                src={quizData[currentQuestion].src}
                                width={130}
                                alt="quiz"
                            />
                        )}
                        <div className="q-container text-xl font-medium ml-6">
                            <p>
                                {currentQuestion + 1}.{" "}
                                {quizData[currentQuestion].question}
                            </p>
                        </div>
                    </div>

                    <div className="a-container mt-8 flex flex-col gap-4">
                        {quizData[currentQuestion].answers.map((answer, index) => {
                            const selected = selectedAnswers[currentQuestion];
                            const isSelected = selected?.index === index;
                            const isCorrect = answer.correct;

                            let className =
                                "list-none transition-all duration-150 ease-in-out border border-primary/20 hover:bg-primary-content/70 p-4.25 rounded-lg cursor-pointer";

                            if (selected) {
                                className += " disabled";
                                if (isSelected && isCorrect) className += " correct";
                                else if (isSelected) className += " wrong";
                                else if (isCorrect) className += " correct";
                            }

                            return (
                                <li
                                    key={index}
                                    className={className}
                                    onClick={() => handleAnswerCheck(index, answer)}
                                >
                                    {answer.text}
                                </li>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 border-t border-neutral/10 flex items-center justify-between mt-1">
                    <p className="text-sm text-base-content/90">
                        {currentQuestion + 1} of {quizData.length} questions
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={handleBack}
                            className={`rounded-md btn btn-primary w-[100px] ${
                                currentQuestion > 0
                                    ? "bg-primary-content/50 text-primary"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={currentQuestion === 0}
                        >
                            Back
                        </button>

                        <button
                            onClick={
                                currentQuestion === quizData.length - 1
                                    ? handleSubmit
                                    : handleNext
                            }
                            className="rounded-md btn btn-primary w-[100px]"
                        >
                            {currentQuestion === quizData.length - 1
                                ? "Submit"
                                : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
