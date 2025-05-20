import { useEffect, useState } from "react";
import { CheckCircle, CheckCircle2, ChevronDown, Circle, CircleCheck, Clock4 } from "lucide-react";
import { supabase } from "@/app/utils/supabase";
import { useRouter } from "next/navigation";

export default function AccordionTm() {

    const router = useRouter();

    const [lessonsData, setLessonsData] = useState([]);
    const [assiData, setAssiData] = useState([]);
    const [modulesData, setModulesData] = useState([]);
    const [loading, setLoading] = useState({
        progressLoading: false,
        lessonsLoading: false,
    })

    const fetchUser = async () => {

        setLoading((prev) => ({
            ...prev,
            progressLoading: true
        }));

        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        
            if (userError || !currentUser) {
                console.log("Error getting user:", userError?.message);
                router.push('/student/login');
                setLoading((prev) => ({
                    ...prev,
                    progressLoading: false
                }));
                return;
            }

            const uid = currentUser?.id;
            console.log('uid:', uid);
            console.log("Authenticated user:", currentUser);

            // Fetch student id based on currentUser.id
        const {data:studentID, error:studentIDError} = await supabase
            .from("registered_users")
            .select("student_id_inherited")
            .eq("auth_student_id", currentUser.id);
        
            if (studentIDError) {
                console.log("Error fetching studentID Data");
                router.push('/student/login');
                setLoading((prev) => ({
                    ...prev,
                    progressLoading: false
                }));
                return;
            }
            else {
                console.log("Student ID:", studentID[0].student_id_inherited);
            }

            fetchAssi(studentID[0].student_id_inherited);

    }

    const fetchAssi = async (stdID) => {

        const { data: assignments, error: assignErr } = await supabase
            .from("student_module_assignments")
            .select("*")
            .eq("student_id", stdID);

        if (assignErr) {
            console.log("Error fetching assi data:", assignErr?.message);
            setLoading((prev) => ({
                ...prev,
                progressLoading: false
            }));
            return;
        }
        console.log("assi data:", assignments);
        setAssiData(assignments);

        const moduleIds = [
            ...new Set(assignments.map((assi) => assi.module_id)),
        ];

        const { data: modules, error: modulesErr } = await supabase
            .from("modules")
            .select("*")
            .in("id", moduleIds);

        if (modulesErr) {
            console.log("Error fetching modules data:", modulesErr.message);
        } else {
            console.log("Modules data:", modules);
            setModulesData(modules);
        }

        await fetchLessons(stdID);

        setLoading((prev) => ({
            ...prev,
            progressLoading: false,
        }));

    }

    // const fetchModules = async (moduleID) => {

    //     setLoading((prev) => ({
    //         ...prev,
    //         lessonsLoading: true
    //     }));

    //     console.log("Assi id:", moduleID);

    //     const { data: modules, error: modulesErr } = await supabase
    //         .from("modules")
    //         .select("*")
    //         .eq("id", moduleID);

    //     if (modulesErr) {
    //         console.log("Error fetching modules data:", modulesErr?.message);
    //         setLoading((prev) => ({
    //             ...prev,
    //             lessonsLoading: false
    //         }));
    //         return;
    //     }
    //     console.log("modules data:", modules);
    //     setModulesData(modules);
    //     setLoading((prev) => ({
    //         ...prev,
    //         lessonsLoading: false
    //     }));

    // }

    const fetchLessons = async (stdID) => {

        const { data:lessonsDataDB, error:lessonsDataErr } = await supabase
            .from("lessons")
            .select("*")
            .eq("student_id", stdID);
        
        if(lessonsDataErr) {
            console.log("Error fetching lessons for student: ", stdID);
            return;
        }

        setLessonsData(lessonsDataDB);
        

    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <>
            <div
                id="Accordion"
                className="cursor-pointer flex flex-col gap-5 w-full mt-7"
            >
                {loading.progressLoading ? (
                    <p className="flex items-center">
                        <span className="loading loading-spinner loading-md mr-3"></span>
                        Loading
                    </p>
                ) : (
                    assiData?.map((item, index) => {
                        const linkedModule = modulesData.find(
                            (mod) => mod.id == item.module_id
                        );
                        if (!linkedModule) return null;

                        return (
                            <div
                                key={`${index}-${linkedModule.id}`}
                                id="AccordionItem"
                                className="overflow-hidden shadow-md/4 border border-base-300 rounded-2xl p-5 w-full"
                            >
                                <div
                                    id="AccordionTrigger"
                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between font-semibold pb-1 gap-2"
                                >
                                    <div className="text-xl sm:text-2xl flex items-center gap-3">
                                        <p className="text-lg sm:text-xl font-medium">
                                            {linkedModule.name}
                                        </p>
                                        {item.completed === "false" ? (
                                            <div className="badge px-2.5 text-base-100 bg-orange-500 rounded-xl text-xs sm:text-sm">
                                                நிலுவையில் உள்ளது
                                            </div>
                                        ) : (
                                            <div className="badge px-2.5 text-base-100 bg-green-500 rounded-xl text-xs sm:text-sm">
                                                முடிக்கப்பட்டது
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div id="desc">
                                    <span className="text-sm sm:text-base text-neutral-500 block mt-1">
                                        {linkedModule.description}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="lessons-attended-sec mt-12 mb-10">
                {lessonsData
                    ?.filter((lessD) => lessD.status === "completed")
                    .map((lessD, index) => (
                        <div key={index} className="lesson-card w-full mt-5">
                            <div className="header">
                                <h1 className="text-xl sm:text-2xl font-semibold">
                                    கலந்துகொண்ட பாடங்கள்
                                </h1>
                                <p className="mt-2 text-sm sm:text-base text-neutral-500">
                                    உங்கள் ஓட்டுநர் பாடங்களைக் கண்காணிக்கவும்
                                </p>
                            </div>
                            <div className="content mt-5">
                                <div className="content-container flex flex-col sm:flex-row items-start sm:items-center justify-between border border-base-300 shadow-md/4 p-5 rounded-2xl gap-4 sm:gap-0">
                                    <div className="left">
                                        <div className="lesson-title flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            <h4 className="text-md sm:text-lg font-medium">
                                                {lessD.lesson_name}
                                            </h4>
                                            <div className="badge-md px-2.5 text-base-100 bg-green-500 rounded-full text-xs sm:text-sm">
                                                முடிக்கப்பட்டது
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="completed-date flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                                            <CheckCircle
                                                size={18}
                                                className="text-green-500"
                                            />
                                            <p>{lessD.scheduled_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
