'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { quizPaper } from '../../utils/quizChoice';
import { Timer, NotebookPen, ChevronRight } from 'lucide-react';

export default function QuizCenter() {
    const router = useRouter();
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
        <div className="quiz-center-container">
            <div className="quiz-center-header mt-7 mb-5">
                <h1 className='text-2xl font-semibold'>Quiz Center</h1>
                <p className='text-sm text-neutral-500'>
                    Select a quiz category to test your knowledge and skills
                </p>
            </div>

            <div className="quiz-cards-grid grid grid-cols-2 gap-5 mb-10">
                {quizPaper.map((quiz, quizIndex) => (
                    <div className="quiz-card border border-base-300 shadow-lg/6 p-5 rounded-2xl" key={quizIndex}>
                        <div className="quiz-card-content mb-5">
                            <div className="quiz-card-badge bg-primary w-fit py-1 px-2.5 rounded-md text-base-100 text-md font-semibold">
                                {`Quiz ${quizIndex + 1}`}
                            </div>
                            <h3 className="quiz-card-title my-3 text-xl">
                                {quiz.title}
                            </h3>
                            <p className="quiz-card-description text-neutral-500 mb-5">
                                {quiz.description}
                            </p>

                            <div className="quiz-card-details flex items-center gap-10 bg-primary/10 w-full py-3 px-4 rounded-lg">
                                <div className="detail-item flex items-center justify-center gap-1 ">
                                    <Timer size={20} className="detail-icon" />
                                    <span className='translate-y-[1px]'>{quiz.duration} mins</span>
                                </div>
                                <div className="detail-item flex items-center justify-center gap-1 ">
                                    <NotebookPen size={20} className="detail-icon" />
                                    <span>{quiz.questions} Questions</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="quiz-start-button flex items-center justify-center text-center text-base-100 w-full bg-primary transition-all duration-150 ease-in-out hover:bg-primary/75 cursor-pointer gap-2 py-3 rounded-lg"
                            onClick={() => handleClick(quiz.link)}
                        >
                            <span>Start Quiz</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
