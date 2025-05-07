'use client';

import { useEffect, useRef, useState } from 'react';
import { quizPapersm as quizPaper } from '../../utils/sinhala/quizChoicesm';
import { Timer, NotebookPen, ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from "@/app/utils/supabase";

export default function QuizCenterSm() {

    const router = useRouter();
    const pathname = usePathname();

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
        <div className="quiz-center-container">
            <div className="quiz-center-header mt-7 mb-5">
                <h1 className="text-2xl font-semibold">ප්‍රශ්නාවලි මධ්‍යස්ථානය</h1>
                <p className="text-sm text-neutral-500">
                    ඔබගේ දැනුම සහ කුසලතා පරීක්ෂා කිරීමට ප්‍රශ්නාවලි කාණ්ඩයක් තෝරන්න
                </p>
            </div>

            <div className="quiz-cards-grid grid grid-cols-2 gap-5 mb-10">
                {quizPaper.map((quiz, quizIndex) => (
                    <div
                        className="quiz-card border border-base-300 shadow-lg/6 p-5 rounded-2xl"
                        key={quizIndex}
                    >
                        <div className="quiz-card-content mb-5">
                            <div className="quiz-card-badge bg-primary w-fit py-1 px-2.5 rounded-md text-base-100 text-md font-semibold">
                                {`ප්‍රශ්නාවලිය ${quizIndex + 1}`}
                            </div>
                            <h3 className="quiz-card-title my-3 text-xl">{quiz.title}</h3>
                            <p className="quiz-card-description text-neutral-500 mb-5">
                                {quiz.description}
                            </p>

                            <div className="quiz-card-details flex items-center gap-10 bg-primary/10 w-full py-3 px-4 rounded-lg">
                                <div className="detail-item flex items-center justify-center gap-1 ">
                                    <Timer size={20} className="detail-icon" />
                                    <span className="translate-y-[1px]">
                                        මිනිත්තු {quiz.duration}
                                    </span>
                                </div>
                                <div className="detail-item flex items-center justify-center gap-1 ">
                                    <NotebookPen size={20} className="detail-icon" />
                                    <span>ප්‍රශ්න {quiz.questions}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="quiz-start-button flex items-center justify-center text-center text-base-100 w-full bg-primary transition-all duration-150 ease-in-out hover:bg-primary/75 cursor-pointer gap-2 py-3 rounded-lg"
                            onClick={() => handleClick(quiz.link)}
                        >
                            <span>ප්‍රශ්නාවලිය ආරම්භ කරන්න</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
