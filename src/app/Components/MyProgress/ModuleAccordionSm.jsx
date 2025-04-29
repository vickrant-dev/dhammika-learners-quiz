import { useState } from "react";
import { CheckCircle, CheckCircle2, ChevronDown, Circle, CircleCheck, Clock4 } from "lucide-react";
import "../../App.css";

export default function AccordionSm() {
    const accordionItems = [
        {
            title: "මොඩියුලය 1",
            badge: "සම්පූර්ණ කළා",
            desc: "වාහනයක් ආරක්ෂිතව ක්‍රියාත්මක කිරීමේ මූලික කරුණු ඉගෙන ගන්න",
            content: [
                { task: 'කාර්යය 1', done: true },
                { task: 'කාර්යය 2', done: true},
                { task: 'කාර්යය 3', done: true},
            ],
            completed: 100
        },
        {
            title: "මොඩියුලය 2",
            badge: "සම්පූර්ණ කළා",
            desc: "වාහනයක් ආරක්ෂිතව ක්‍රියාත්මක කිරීමේ මූලික කරුණු ඉගෙන ගන්න",
            content: [
                { task: 'කාර්යය 1', done: true },
                { task: 'කාර්යය 2', done: true },
                { task: 'කාර්යය 3', done: true },
            ],
            completed: 100
        },
        {
            title: "මොඩියුලය 3",
            badge: "පොරොත්තුවෙන්",
            desc: "වාහනයක් ආරක්ෂිතව ක්‍රියාත්මක කිරීමේ මූලික කරුණු ඉගෙන ගන්න",
            content: [
                { task: 'කාර්යය 1', done: false },
                { task: 'කාර්යය 2', done: false },
                { task: 'කාර්යය 3', done: false },
            ],
            completed: 0
        },
    ];

    const [openItems, setOpenItems] = useState({});

    const handleOpen = (index) => {
        setOpenItems((prevOpenItems) => ({
            ...prevOpenItems, [index]: !prevOpenItems[index],
        }));
    };

    return (
        <>
            <div
                id="Accordion"
                className="cursor-pointer flex flex-col gap-5 w-full mt-10 mb-10 "
            >
                {accordionItems.map((item, index) => {

                    const completedTasks = item.content.filter((task) => task.done).length;
                    const completionPercentage = Math.round((completedTasks / item.content.length) * 100, 10);

                    return (
                        <div
                            key={index}
                            id="AccordionItem"
                            className="overflow-y-hidden overflow-x-hidden shadow-md/4 border border-base-300 rounded-2xl p-5 "
                        >
                            <div
                                id="AccordionTrigger"
                                onClick={() => handleOpen(index)}
                                className="flex items-center justify-between font-semibold pb-1"
                            >
                                <span className="text-2xl flex items-center gap-4" >
                                    {item.title} 
                                    {completionPercentage < 100 ? 
                                    <div className="badge px-2.5 text-base-100 bg-orange-500 rounded-xl">පොරොත්තුවෙන්</div> 
                                    :
                                    <div className="badge px-2.5 text-base-100 bg-green-500 rounded-xl">සම්පූර්ණ කළා</div> }
                                    
                                </span>
                                <i>
                                    <ChevronDown className={`transition-all duration-300 ease-out ${
                                        openItems[index] ? "rotate-180 " : "rotate-0"
                                    }`} />
                                </i>
                            </div>
                            <div id="desc">
                                <span className="text-sm text-neutral-500" >{item.desc}</span>
                            </div>
                            <div className="prog">
                                <div className="prog-details flex items-center justify-between w-[440px] mt-4">
                                    <span className="flex items-center gap-3" >
                                        {completionPercentage < 100 ? 
                                        <Clock4 size={22} className="text-orange-500" />
                                            :
                                        <CheckCircle2 size={22} className="text-green-500"/>
                                        }
                                        <p>{item.completed < 100 ? "නියමිත දිනය" : "සම්පූර්ණ කළ දිනය"} March 27, 2024</p>
                                    </span>
                                    <p>{completionPercentage}%</p>
                                </div>
                                <div className="prog-bar mt-1">
                                    <progress className="progress text-green-500 w-110" value={completionPercentage} max="100"></progress>
                                </div>
                            </div>
                            <div
                                id="AccordionContent"
                                className={`transition-all duration-300 ease-out translate-y-5 ${
                                    openItems[index] ? "pb-5 h-fit opacity-100 " : "pb-0 h-0 opacity-0"
                                }`}
                            >
                                { item.content.map((it, index, array) => (
                                    <>
                                        <div className={`flex items-center gap-3 pl-2.5 ${index !== array.length - 1 ? "mb-5" : "mb-0"}`} >
                                            {!it.done ? 
                                            <Circle size={20} className="text-neutral-500 opacity-65 select-none" />
                                                :
                                            <CircleCheck size={20} className="text-green-600" />
                                            } 
                                            {!it.done ?
                                            <p className="text-neutral-500 opacity-65 select-none">{it.task}</p>
                                                :
                                            <p className="text-neutral-600">{it.task}</p>
                                            }                                       
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    )

                })}
            </div>
        </>
    );
}
