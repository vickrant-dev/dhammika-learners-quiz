import React, { useEffect, useState } from 'react'
import { quizDatatm as quiz1Datatm } from '../../utils/tamil/quizDatatm'
import { quiz2Datatm } from '../../utils/tamil/quiz2Datatm'
import { quiz3Datatm } from '../../utils/tamil/quiz3Datatm'
import { quiz4Datatm } from '../../utils/tamil/quiz4Datatm'
import Timer from './Timer';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css'
import './QuizStyles.css';

export default function QuizTm() {

    const navigate = useNavigate();

    const { quizLink } = useParams();

    const quizDataMap = {
        1: quiz1Datatm,
        2: quiz2Datatm,
        3: quiz3Datatm,
        4: quiz4Datatm,
    }

    const quizData = quizDataMap[quizLink] || quiz1Datatm;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [usersAnswers, setUsersAnswers] = useState({});
    const [score, setScore] = useState(0);

    const [timeTaken, setTimeTaken] = useState(0);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleAnswerCheck = (e, ans, i) => {

        if(ans.correct){
            setUsersAnswers({...usersAnswers, [currentQuestion]: i});
            setScore((prevScore) => prevScore + 1);
            e.target.classList.add("correct");
        }
        else{
            setUsersAnswers({...usersAnswers, [currentQuestion]: i});

            e.target.classList.add("wrong");
            [...e.target.parentElement.children].forEach(el => {
                if(el.dataset.isCorrect === "true"){
                    el.classList.add("correct");
                }
            })
        }

        [...e.target.parentElement.children].forEach(el => {
            el.classList.add("disabled");
        })

    }

    const handleNext = () => {
        if (currentQuestion !== quizData.length - 1) {
            if(usersAnswers[currentQuestion] !== undefined){
                document.querySelectorAll(".a-container li").forEach(li => {
                    li.classList.remove("correct", "wrong", "disabled");
                })
                setCurrentQuestion(currentQuestion + 1); 
            }
            else{
                alert("Please answer the current question before proceeding.")
            }
        }
    }

    const handleBack = () => {
        if (currentQuestion > 0) {
            document.querySelectorAll(".a-container li").forEach((li) => {
              li.classList.remove("correct", "wrong", "disabled")
            })
      
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const handleSubmit = () => {
        if(usersAnswers[currentQuestion] !== undefined){
            setIsSubmitted(true);
            localStorage.setItem("quizCompleted", "true");
            localStorage.setItem("quizScore", score);
            navigate(`/quizCenter/quiz/${quizLink}/results`, {replace: true});
        }
        else{
            alert("Please answer the current question before proceeding.")
        }
    }

    const handleTimeUp = () => {
    
        let currentScore = 0;


        quizData.forEach((quizEl, index) => {
            if(usersAnswers[index] === undefined) {
                return;
            }
            else if(usersAnswers[index] === quizEl.ans){
                console.log(usersAnswers);
                currentScore++;
            }
        });

        setScore(currentScore);

        setIsSubmitted(true);

        localStorage.setItem("quizCompleted", "true");
        localStorage.setItem("quizScore", currentScore);
        navigate(`/quizCenter-tm/quiz/tm/${quizLink}/results`, {replace: true});
            
    }

    const handleTimeElapsed = (time) => {
        setTimeTaken(time);
        localStorage.setItem("time-taken", time);
    }

    useEffect(() => {

        if(currentQuestion in usersAnswers) {
            const answerIndex = usersAnswers[currentQuestion];
            const answerElements = document.querySelectorAll(".a-container li");

            answerElements.forEach((el, elIndex) => {

                el.classList.add("disabled");

                if(elIndex === answerIndex) {
                    if(el.dataset.isCorrect === "true"){
                        el.classList.add("correct");
                    }
                    else{
                        el.classList.add("wrong");

                        answerElements.forEach(ansEl => {
                            if(ansEl.dataset.isCorrect === 'true'){
                                ansEl.classList.add("correct");
                            }
                        })

                    }
                }
                
            })
        }

    }, [currentQuestion, usersAnswers]);

     return (
         <>
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
                             <img
                                 src={
                                     quizData[currentQuestion].src
                                         ? quizData[currentQuestion].src
                                         : ""
                                 }
                                 width={quizData[currentQuestion].src ? 130 : 0}
                                 alt={
                                     quizData[currentQuestion].src
                                         ? "quizImage"
                                         : ""
                                 }
                                 style={{
                                     display: quizData[currentQuestion].src
                                         ? "flex"
                                         : "none",
                                 }}
                             />

                             <div
                                 className="q-container text-xl font-medium"
                                 style={{
                                     marginLeft: quizData[currentQuestion].src
                                         ? "3rem"
                                         : "0",
                                 }}
                             >
                                 <p>
                                     {currentQuestion + 1}.{" "}
                                     {quizData[currentQuestion].question}
                                 </p>
                             </div>
                         </div>
                         <div className="a-container mt-8 flex flex-col gap-4">
                             {quizData[currentQuestion].answers.map(
                                 (answer, index) => (
                                     <li
                                         className="list-none transition-all duration-150 ease-in-out border border-primary/20 hover:bg-primary-content/70 p-4.25 rounded-lg cursor-pointer"
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
                     <div className="p-6 border-t border-neutral/10 flex items-center justify-between back-next mt-1 ">
                         <p className="text-sm text-base-content/90">
                             <span>
                                 {currentQuestion + 1} of {quizData.length}{" "}
                                 questions
                             </span>
                         </p>

                         <div className="flex gap-3">
                             <button
                                 onClick={handleBack}
                                 className={` rounded-md ${
                                     currentQuestion > 0
                                         ? "back-btn active"
                                         : "back-btn"
                                 } border border-primary/50 btn btn-primary bg-primary-content/50 text-primary w-[100px]`}
                             >
                                 {currentQuestion > 0 ? "Back" : "Back"}
                             </button>

                             <button
                                 onClick={
                                     currentQuestion === quizData.length - 1
                                         ? handleSubmit
                                         : handleNext
                                 }
                                 className=" rounded-md next-btn btn btn-primary w-[100px]"
                             >
                                 {currentQuestion === quizData.length - 1
                                     ? "Submit"
                                     : "Next"}
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
         </>
     );

}