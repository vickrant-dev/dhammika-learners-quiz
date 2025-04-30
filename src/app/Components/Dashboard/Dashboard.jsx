import { supabase } from "@/app/utils/supabase";
import { CircleCheck, Clock4, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const checkStudent = async () => {

        const { data: { session }, error } = await supabase.auth.getSession();

        console.log('Session:', session);

        if (error) {
            console.log("Error checking auth session:", error.message);
            return;
        }

        if (!session) {
            console.log("No active session found");
            return;
        }

        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

        if (userError || !currentUser) {
            console.log("Error getting user:", userError?.message);
            return;
        }

        console.log("Authenticated user:", currentUser);

        // Use currentUser.id to get student_id_inherited and use that to fetch relevant data

    }

    checkStudent();

    },[]);

    return (
        <>
            <div id="dashboard-container">
                <h1 className="text-2xl mt-10 font-semibold">Dashboard</h1>
                <div
                    id="dashboard-cards"
                    className="mt-7 flex items-center justify-between gap-5"
                >
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">
                                Overall Progress
                            </div>
                            <div className="stat-value flex items-center justify-between">
                                <p className="font-bold">75%</p>
                                <CircleCheck
                                    className="text-success"
                                    size={27}
                                />
                            </div>
                            <div className="stat-prog mb-1">
                                <progress
                                    className="progress progress-success w-full"
                                    value="75"
                                    max="100"
                                ></progress>
                            </div>
                            <div className="stat-desc">
                                3 of 4 modules completed
                            </div>
                        </div>
                    </div>
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">
                                Quiz Performance
                            </div>
                            <div className="stat-value flex items-center justify-between">
                                <p className="font-bold">95%</p>
                                <Trophy className="text-orange-500" size={27} />
                            </div>
                            <div className="stat-prog mb-1">
                                <progress
                                    className="progress progress-success w-full"
                                    value="95"
                                    max="100"
                                ></progress>
                            </div>
                            <div className="stat-desc">
                                Average score across 4 quizzes
                            </div>
                        </div>
                    </div>
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">
                                Next Lesson
                            </div>
                            <div className="stat-value flex items-center justify-between">
                                <p className="font-bold">Module 4</p>
                                <Clock4 className="text-blue-500" size={27} />
                            </div>
                            <div className="stat-prog mb-1">
                                <p>Highway Driving</p>
                            </div>
                            <div className="stat-desc">
                                Scheduled for May 15, 2024
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
