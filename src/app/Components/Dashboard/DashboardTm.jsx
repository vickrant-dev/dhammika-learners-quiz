import { CircleCheck, Clock4, Trophy } from 'lucide-react';

export default function DashboardTm () {

    return (
        <>
            <div id="dashboard-container">
                <h1 className='text-2xl mt-10 font-semibold'>டாஷ்போர்டு</h1>
                <div id="dashboard-cards" className='mt-7 flex items-center justify-between gap-5' >
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">ஒட்டுமொத்த முன்னேற்றம்</div>
                            <div className="stat-value flex items-center justify-between">
                                <p className='font-bold' >75%</p>
                                <CircleCheck className='text-success' size={27} />
                            </div>
                            <div className="stat-prog mb-1">
                                <progress className="progress progress-success w-full" value="75" max="100"></progress>
                            </div>
                            <div className="stat-desc">4 தொகுதிகளில் 3 நிறைவடைந்தன</div>
                        </div>
                    </div>
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">வினாடி வினா செயல்திறன்</div>
                            <div className="stat-value flex items-center justify-between">
                                <p className='font-bold' >95%</p>
                                <Trophy className='text-orange-500' size={27} />
                            </div>
                            <div className="stat-prog mb-1">
                                <progress className="progress progress-success w-full" value="95" max="100"></progress>
                            </div>
                            <div className="stat-desc">4 வினாடி வினாக்களில் சராசரி மதிப்பெண்</div>
                        </div>
                    </div>
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">அடுத்த பாடம்</div>
                            <div className="stat-value flex items-center justify-between">
                                <p className='font-bold' >தொகுதி 4</p>
                                <Clock4 className='text-blue-500' size={27} />
                            </div>
                            <div className="stat-prog mb-1">
                                <p>நெடுஞ்சாலை ஓட்டுதல்</p>
                            </div>
                            <div className="stat-desc">மே 15, 2024 அன்று திட்டமிடப்பட்டுள்ளது</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}