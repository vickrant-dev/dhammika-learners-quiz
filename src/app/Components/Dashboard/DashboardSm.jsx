import { CircleCheck, Clock4, Trophy } from 'lucide-react';

export default function DashboardSm () {

    return (
        <>
            <div id="dashboard-container">
                <h1 className='text-2xl mt-10 font-semibold'>උපකරණ පුවරුව</h1>
                <div id="dashboard-cards" className='mt-7 flex items-center justify-between gap-5' >
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">සමස්ත ප්රගතිය</div>
                            <div className="stat-value flex items-center justify-between">
                                <p className='font-bold' >75%</p>
                                <CircleCheck className='text-success' size={27} />
                            </div>
                            <div className="stat-prog mb-1">
                                <progress className="progress progress-success w-full" value="75" max="100"></progress>
                            </div>
                            <div className="stat-desc">මොඩියුල 4 න් 3 ක් සම්පූර්ණයි</div>
                        </div>
                    </div>
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">ප්‍රශ්න විචාරාත්මක කාර්ය සාධනය</div>
                            <div className="stat-value flex items-center justify-between">
                                <p className='font-bold' >95%</p>
                                <Trophy className='text-orange-500' size={27} />
                            </div>
                            <div className="stat-prog mb-1">
                                <progress className="progress progress-success w-full" value="95" max="100"></progress>
                            </div>
                            <div className="stat-desc">ප්‍රශ්නාවලිය 4ක් හරහා සාමාන්‍ය ලකුණු</div>
                        </div>
                    </div>
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">ඊළඟ පාඩම</div>
                            <div className="stat-value flex items-center justify-between">
                                <p className='font-bold' >මොඩියුලය 4</p>
                                <Clock4 className='text-blue-500' size={27} />
                            </div>
                            <div className="stat-prog mb-1">
                                <p>අධිවේගී මාර්ග ධාවනය</p>
                            </div>
                            <div className="stat-desc">2024 මැයි 15 දිනට සැලසුම් කර ඇත</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}