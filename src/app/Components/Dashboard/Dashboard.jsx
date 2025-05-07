import { supabase } from "@/app/utils/supabase";
import { CircleCheck, Clock4, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const [assiData, setAssiData] = useState([]);
    const [lessonsData, setLessonsData] = useState([]);
    const [loading, setLoading] = useState({
        progressLoading: false,
        lessonsLoading: false,
    });
    const router = useRouter(); // Define the router

    useEffect(() => {
        const fetchUser = async () => {
            setLoading((prev) => ({
                ...prev,
                progressLoading: true,
            }));

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

            // Fetch student id based on currentUser.id
            const { data: studentID, error: studentIDError } = await supabase
                .from("registered_users")
                .select("student_id_inherited")
                .eq("auth_student_id", currentUser.id);

            if (studentIDError) {
                console.log("Error fetching studentID Data");
                router.push("/student/login");
                setLoading((prev) => ({
                    ...prev,
                    progressLoading: false,
                }));
                return;
            } else if(studentID) {
                console.log("Student ID:", studentID[0].student_id_inherited);
            }

            fetchAssi(studentID[0].student_id_inherited);
        };

        const fetchAssi = async (stdID) => {
            const { data: assignments, error: assignErr } = await supabase
                .from("student_module_assignments")
                .select("*")
                .eq("student_id", stdID);

            if (assignErr) {
                console.log(
                    "Error fetching assignments data:",
                    assignErr?.message
                );
                setLoading((prev) => ({
                    ...prev,
                    progressLoading: false,
                }));
                return;
            }

            console.log("Assignments data:", assignments);
            setAssiData(assignments);
            setLoading((prev) => ({
                ...prev,
                progressLoading: false,
            }));
            
            fetchLessons(stdID);
        };

        const fetchLessons = async (stdID) => {

            const { data:lessonsDataDB, error:lessonsErr } = await supabase
                .from("lessons")
                .select("*")
                .eq("student_id", stdID);

            if (lessonsErr) {
                console.log('Error fetching lessson');
                router.push("/student/login");
                return;
            }

            setLessonsData(lessonsDataDB);
            console.log('lessons data:', lessonsDataDB);

        }

        fetchUser();
    }, []);

    return (
        <>
            <div id="dashboard-container">
                <h1 className="text-2xl mt-10 font-semibold">Dashboard</h1>
                <div
                    id="dashboard-cards"
                    className="mt-7 flex justify-between gap-5"
                >   
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">
                                Overall Progress
                            </div>
                            {loading.progressLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-md"></span>
                                </>
                            ): ( 
                                <>        
                                    <div className="stat-value flex items-center justify-between">
                                        <p className="font-bold">
                                            {assiData?.length > 0
                                                ? (assiData.filter(
                                                    (mod) => mod.completed === "true"
                                                ).length /
                                                    assiData.length) *
                                                    100 +
                                                "%"
                                                : 0}
                                        </p>
                                        <CircleCheck
                                            className="text-success"
                                            size={27}
                                        />
                                    </div>
                                    <div className="stat-prog mb-1">
                                        <progress
                                            className="progress progress-success w-full"
                                            value={
                                                assiData?.length > 0
                                                    ? (assiData.filter(
                                                        (lesson) =>
                                                            lesson.completed ===
                                                            "true"
                                                    ).length /
                                                        assiData.length) *
                                                    100
                                                    : 0
                                            }
                                            max="100"
                                        ></progress>
                                    </div>
                                    <div className="stat-desc">
                                        {assiData.length > 0
                                            ? assiData.filter(
                                                (lesson) =>
                                                    lesson.completed === "true"
                                            ).length
                                            : 0}{" "}
                                        of {assiData.length > 0 ? assiData.length : 0}{" "}
                                        modules completed
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="stats shadow-md/5 border border-base-300 rounded-xl w-full">
                        <div className="stat">
                            <div className="stat-title text-sm mb-1.5">
                                Next Lesson
                            </div>
                            {loading.lessonsLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-md"></span>
                                </>
                            ): (
                                <>
                                    <div className="stat-value flex items-center justify-between">
                                        <p className="font-bold">
                                            {lessonsData?.find(
                                                (lesson) =>
                                                    lesson.status === "scheduled"
                                            )?.lesson_name || "Yet to be Scheduled"}
                                        </p>
                                        <Clock4 className="text-blue-500" size={27} />
                                    </div>
                                    <div className="stat-date">
                                        {lessonsData?.find(
                                            (lesson) => lesson.status === "scheduled"
                                        )?.scheduled_date || ""}
                                    </div>
                                    <div className="stat-time">
                                        {lessonsData
                                            ?.find(
                                                (lesson) =>
                                                    lesson.status === "scheduled"
                                            )
                                            ?.time?.split("+")[0]
                                            .slice(0, -3) || ""}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
