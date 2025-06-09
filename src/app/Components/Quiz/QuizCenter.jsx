'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { quizPaper } from '../../utils/quizChoice';
import { Timer, NotebookPen, ChevronRight, ArrowLeft } from 'lucide-react';

export default function QuizCenter() {

    const router = useRouter();

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

    //     const uid = currentUser?.id;
    //     console.log("uid:", uid);
    //     console.log("Authenticated user:", currentUser);
    // };

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    const pathname = usePathname(); // optional: in case you need current path for language handling

    const [active, setActive] = useState(false);
    const chooserRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (chooserRef.current && !chooserRef.current.contains(event.target)) {
                setActive(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (quizLink) => {
        router.push(`${pathname}/quiz/${quizLink}`);
    };

    return (
        <>
            <div className="quiz-center-container pr-4 lg:pr-8 md:pr-6 sm:pr-6 pl-[2.25rem] ">
                <div className="quiz-center-header mb-5">
                    <h1 className="text-2xl font-semibold">Quiz Center</h1>
                    <p className="text-sm text-neutral-500">
                        Select a quiz category to test your knowledge and skills
                    </p>
                </div>

                <div className="quiz-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mb-10">
                    {quizPaper.map((quiz, quizIndex) => (
                        <div
                            className="quiz-card border border-base-300 shadow-lg/6 p-5 rounded-2xl flex flex-col justify-between"
                            key={quizIndex}
                        >
                            <div className="quiz-card-content mb-5">
                                <h3 className="quiz-card-title mb-3 text-xl">
                                    {quiz.title}
                                </h3>
                                <p className="quiz-card-description text-neutral-500 mb-5 text-sm">
                                    {quiz.description}
                                </p>

                                <div className="quiz-card-details flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-10 bg-primary/10 w-full py-3 px-4 rounded-lg text-sm">
                                    <div className="detail-item flex items-center gap-2">
                                        <Timer size={20} />
                                        <span>{quiz.duration} mins</span>
                                    </div>
                                    <div className="detail-item flex items-center gap-2">
                                        <NotebookPen size={20} />
                                        <span>{quiz.questions} Questions</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="quiz-start-button flex items-center justify-center text-center text-base-100 w-full bg-primary transition-all duration-150 ease-in-out hover:bg-primary/75 cursor-pointer gap-2 py-3 rounded-lg mt-auto"
                                onClick={() => handleClick(quiz.link)}
                            >
                                <span>Start Quiz</span>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
    
}
