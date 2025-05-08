"use client";

import {
    Calendar,
    CheckCircle2,
    CircleAlert,
    Download,
    Plus,
    Search,
    Settings,
    Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { debugAuthState } from "../../utils/debug-auth";

export default function AdminStudents() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        fullName: false,
        phoneNumber: false,
        formIncomplete: false,
        alreadyExists: false,
        editField: false,
    });
    const [unexpectedErr, setUnexpectedErr] = useState({
        unexpectedError1: false,
        unexpectedError2: false,
        unexpectedError3: false,
    });
    const [success, setSuccess] = useState({
        addStudent: false,
        deleteStudent: false,
        editProfile: false,
    });
    const [loading, setLoading] = useState(false);
    const [studentsData, setStudentsData] = useState([]);
    const [studentsForm, setStudentsForm] = useState({
        full_name: "",
        nic: "",
        email: "",
        phone_number: "",
        address: "",
    });
    const [studentsModule, setStudentsModule] = useState([
        { module: "" },
        { module: "" },
        { module: "" },
    ]);
    const [modulesData, setModulesData] = useState([]);

    const [editForm, setEditForm] = useState({
        full_name: "",
        phone_number: "",
        address: "",
    }) 

    // Add this function to your component
    // const debugAuth = async () => {
    //     const result = await debugAuthState(supabase);
    //     console.log("Auth Debug Result:", result);

    //     // If you have the JWT, you can decode it at jwt.io to see the claims
    //     if (result.jwt) {
    //         console.log("JWT for manual inspection:", result.jwt);
    //     }

    //     return result;
    // };

    // Check authentication on component mount
    useEffect(() => {
        const checkUser = async () => {
            setLoading(true);

            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error("Error checking auth session:", error.message);
                router.push("/login");
                setLoading(false);
                return;
            }

            if (!session) {
                console.log("No active session found");
                router.push("/login");
                setLoading(false);
                return;
            }

            const {
                data: { user: currentUser },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !currentUser) {
                console.error("Error getting user:", userError?.message);
                router.push("/login");
                setLoading(false);
                return;
            }

            console.log("Authenticated user:", currentUser);
            setUser(currentUser);
            setLoading(false);

            // Check if user has admin role
            const { data: userProfile, error: profileError } = await supabase
                .from("users")
                .select("role")
                .eq("id", currentUser.id)
                .single();

            if (profileError || userProfile?.role !== "admin") {
                console.log("Access denied. Only admins can access this page.");
                await supabase.auth.signOut();
                router.push("/login");
                setLoading(false);
                return;
            }
            fetchStudentsData();
            fetchModules();
        };

        checkUser();
    }, []);

    const fetchStudentsData = async () => {
        setLoading(true);

        try {
            const { data, error } = await supabase.from("students").select("*");

            if (error) {
                console.log("Error fetching students data:", error.message);
                setUnexpectedErr((prev) => ({
                    ...prev,
                    unexpectedError1: true,
                }));
                setLoading(false);
                return;
            }

            if (data) {
                console.log("Data", data);
                await Promise.all(
                    data.map(async (d) => {
                        const lessonCount = await fetchStdLess(d.id);
                        d.studentLessonCount = lessonCount;
                    })
                );
                await Promise.all(
                    data.map(async (sD) => {
                        const scheduledDate = await fetchScheduledDate(sD.id);
                        sD.scheduled_date = scheduledDate;
                    })
                );
                setStudentsData(data);
            }
        } catch (error) {
            console.error("Unexpected error fetching students:", error);
            setUnexpectedErr((prev) => ({
                ...prev,
                unexpectedError1: true,
            }));
        }

        setLoading(false);
    };

    const fetchStdLess = async (stdID) => {
        console.log("Getting lessons for:", stdID);

        try {
            const { data, error } = await supabase
                .from("lessons")
                .select("*")
                .eq("student_id", stdID)
                .eq("status", "completed");

            if (error) {
                console.error(`Error fetching lessons for ${stdID}:`, error);
                return 0;
            } else {
                console.log(`Lessons for ${stdID}:`, data);
                return data.length;
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return 0;
        }
    };

    const fetchScheduledDate = async (stdID) => {
        console.log("Getting scheduled date for student");

        try {
            const { data, error } = await supabase
                .from("lessons")
                .select("*")
                .eq("student_id", stdID)
                .eq("status", "scheduled");

            if (error) {
                console.error(`Error fetching lessons for ${stdID}:`, error);
                return 0;
            } else {
                console.log(`Lessons for ${stdID}:`, data);
                return data.length > 0
                    ? data.map((item) => item.scheduled_date).sort()[0]
                    : "Yet to be scheduled";
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return 0;
        }
    };

    const fetchModules = async () => {
        try {
            const { data, error } = await supabase.from("modules").select("*");

            if (error) {
                console.log("Error fetching modules data:", error?.message);
                setUnexpectedErr((prev) => ({
                    ...prev,
                    unexpectedError2: true,
                }));
                return;
            }

            if (data) {
                console.log("Modules Data:", data);
                setModulesData(data);
            }
        } catch (error) {
            console.error("Unexpected error fetching modules:", error);
            setUnexpectedErr((prev) => ({
                ...prev,
                unexpectedError2: true,
            }));
        }
    };

    const handleStudentsModules = (e, i) => {
        const { name, checked } = e.target;

        console.log(name);
        console.log(checked);

        setStudentsModule((prev) =>
            prev.map((item, index) =>
                index === i
                    ? { ...item, [name]: checked, module_id: modulesData[i].id }
                    : item
            )
        );

        console.log(studentsModule);
    };

    const handleStudentForm = (e) => {
        const { name, value } = e.target;

        setStudentsForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // This is the corrected handleAddStudent function
    const handleAddStudent = async () => {
        console.log("Adding new student");
        setLoading(true);

        try {
            // First, verify the user is authenticated and has admin role
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                console.error("Authentication error:", userError?.message);
                setLoading(false);
                // Show authentication error message
                return;
            }

            // Verify admin role
            const { data: userProfile, error: profileError } = await supabase
                .from("users")
                .select("role")
                .eq("id", user.id)
                .single();

            if (profileError || userProfile?.role !== "admin") {
                console.error("Access denied. Only admins can insert data.");
                setLoading(false);
                // Show permission error message
                return;
            }

            // Start a Supabase transaction using RPC
            const { data, error } = await supabase.rpc(
                "add_student_with_modules",
                {
                    student_data: studentsForm,
                    auth_user_id: user.id,
                    module_assignments: studentsModule
                        .filter((mod) => mod.module !== "")
                        .map((mod) => ({
                            module_id: mod.module_id,
                            completed: "false",
                        })),
                }
            );

            if (error) {
                console.log("Error in transaction:", error?.message);
                setAlert((prev) => ({
                    ...prev,
                    alreadyExists: true,
                }));
                setLoading(false);
                return;
            }

            if (data) {
                setSuccess((prev) => ({
                    ...prev,
                    addStudent: true,
                }));
                console.log("Transaction successful:", data);
                fetchStudentsData();
                setAlert((prev) => ({
                    ...prev,
                    fullName: false,
                    phoneNumber: false,
                    formIncomplete: false,
                    alreadyExists: false,
                }));
                setUnexpectedErr((prev) => ({
                    ...prev,
                    unexpectedError1: false,
                    unexpectedError2: false,
                    unexpectedError3: false,
                }));
                setStudentsForm((prev) => ({
                    ...prev,
                    full_name: "",
                    nic: "",
                    email: "",
                    phone_number: "",
                    address: "",
                }));
                setStudentsModule([
                    { module: "" },
                    { module: "" },
                    { module: "" },
                ]);
            }
        } catch (error) {
            console.error("Unexpected error adding student:", error);
            setUnexpectedErr((prev) => ({
                ...prev,
                unexpectedError3: true,
            }));
        }

        setLoading(false);
    };

    const clearAddStudentField = () => {
        setStudentsForm({
            full_name: "",
            nic: "",
            email: "",
            phone_number: "",
            address: "",
        });

        setStudentsModule([{ module: "" }, { module: "" }, { module: "" }]);

        setAlert({
            fullName: false,
            phoneNumber: false,
            formIncomplete: false,
            alreadyExists: false,
        });
        setSuccess({
            addStudent: false,
            deleteStudent: false,
        });
    };

    const handleDeleteStudent = async (stdID) => {
        if (!stdID) {
            console.log("Invalid student id:", stdID);
            return;
        }

        try {

            // Deleting it in registered users
            const { error:regErr } = await supabase
                .from("registered_users")
                .delete()
                .eq("student_id_inherited", stdID);
            
            if(regErr) {
                console.log("Error deleting student in reg:", regErr.message);
                return;
            }

            // Deleting it in students table
            const { error } = await supabase
                .from("students")
                .delete()
                .eq("id", stdID);

            if (error) {
                console.log("Error deleting student:", error.message);
                return;
            }

            console.log("Student deleted successfully");
            setSuccess((prev) => ({
                ...prev,
                deleteStudent: true,
            }));
            setTimeout(() => {
                setSuccess((prev) => ({
                    ...prev,
                    deleteStudent: false,
                }));
            }, 5000);
            fetchStudentsData();
        } catch (error) {
            console.log(
                "Unexpected error occured while deleting student:",
                error
            );
        }
    };

    const editModal = async (stData) => {

        setEditForm({
            full_name: stData.full_name,
            email: stData.email,
            phone_number: stData.phone_number,
            address: stData.address,
            nic: stData.nic   
        });

    }

    const ediProfileChange = async (e) => {

        const { name, value } = e.target;
        
        console.log(name);
        console.log(value);

        setEditForm((prev) => ({
            ...prev,
            [name]: value
        }))        

    }

    const handleSaveEditProfile = async (stdID) => {
        // Step 1: Validate the editForm
        const { full_name, phone_number, address, nic } = editForm;

        if (!full_name || !phone_number || !address) {
            // If any field is empty, show an alert or return early
            setAlert((prev) => ({
                ...prev,
                editField: true,
            }))
            return;
        }

        // Step 2: Proceed with database update if all fields are filled
        try {
            
            const { data:newStdData, error:newStdErr } = await supabase
                .from('students')
                .update({
                    full_name: editForm.full_name,
                    phone_number: editForm.phone_number,
                    address: editForm.address,
                    nic: editForm.nic
                })
                .eq("id", stdID)

            if (newStdErr) {
                console.log("Error updating students table");
            }

            console.log("Student updated successfully");
            setAlert((prev) => ({
                ...prev,
                editField: false,
            }));
            setSuccess((prev) => ({
                ...prev,
                editProfile: true
            }))
            fetchStudentsData();
            
            setTimeout(() => {
                setSuccess((prev) => ({
                    ...prev,
                    editProfile: false,
                }))
            }, 5000);

        } catch (error) {
            console.log("Error updating student:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 1024);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);      

    return (
        <div className="min-h-screen bg-base-100">
        <div className="container px-8">
            {/* Page Header */}
            <div className="pb-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-primary-focus">
                    Students
                </h1>
            </div>

            {/* Student Management Section */}
            <div className="bg-base-100 rounded-2xl border border-base-300 shadow-lg p-4 md:p-6 mb-6">
                <div className="mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-primary-focus mb-1">
                        Student Management
                    </h2>
                    <p className="text-sm md:text-md text-base-content/65">
                        View and manage all registered students
                    </p>
                </div>

                {/* Search and Action Buttons */}
                <div className="flex flex-col md:flex-row mb-6">
                    {/* <div className="w-full md:w-1/2">
                        <label className="input border border-base-200 shadow-md rounded-lg h-[47px] bg-base-100 focus:outline-none focus-within:outline-none focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 flex items-center">
                            <Search className="mr-1 mb-[1px] text-primary" size={18} />
                            <input
                                type="search"
                                required
                                placeholder="Search students..."
                                className="w-full focus:border-none active:border-none focus:outline-none active:outline-none"
                            />
                        </label>
                    </div> */}
                    <div className="flex flex-wrap gap-3 justify-normal md:w-1/2">
                        <button
                            onClick={() => document.getElementById("add_new_student").showModal()}
                            className="btn btn-primary rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            {isMobile ? (
                                <>
                                    <Plus size={18} />
                                </>
                            ) : (
                                <>
                                    <Plus size={18} className="mr-2" /> New Student
                                </>
                            )}
                        </button>
                        {/* <button className="btn btn-neutral rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                            {isMobile ? (
                                <>
                                    <Download size={18}/>
                                </>
                            ) : (
                                <>
                                    <Download size={18} className="mr-2" /> Export
                                </>
                            )}
                        </button> */}
                    </div>
                </div>

                {/* Student List - Responsive Cards for Mobile, Table for Larger Screens */}
                <div className="rounded-2xl border border-base-200 shadow-sm bg-base-100 overflow-hidden">
                    {/* Table for medium and large screens */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="border-b border-base-300 bg-base-100/80">
                                    <th className="text-base-content/70 font-medium">Student</th>
                                    <th className="text-base-content/70 font-medium">No of Lessons Attended</th>
                                    <th className="text-base-content/70 font-medium">Next Lesson</th>
                                    <th className="text-base-content/70 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td className="flex items-center gap-3">
                                            <span className="loading loading-spinner loading-md"></span>
                                            <p className="text-md font-medium">Loading...</p>
                                        </td>
                                    </tr>
                                ) : unexpectedErr.unexpectedError1 ? (
                                    <tr>
                                        <td colSpan={4}>
                                            <p className="flex items-center text-red-500 text-md font-medium">
                                                <CircleAlert size={17} className="mr-2" /> Error fetching student data
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    studentsData.map((stData) => (
                                        <tr key={stData.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <div className="font-bold text-primary-focus">{stData.full_name}</div>
                                                        <div className="text-sm text-base-content/50">{stData.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="flex items-center gap-2">
                                                    <span>{stData.studentLessonCount ? stData.studentLessonCount : 0}</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p className="flex items-center gap-2">
                                                    <Calendar size={17} className="mb-[2px] text-secondary" />
                                                    <span>{stData.scheduled_date ? stData.scheduled_date : "Yet to be scheduled"}</span>
                                                </p>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-ghost border-2 hover:border-primary/20 btn-circle hover:bg-primary/10 transition-colors duration-200"
                                                    onClick={() => document.getElementById(`${stData.id}`).showModal()}
                                                >
                                                    <Settings size={20} className="text-primary" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Cards for small screens */}
                    <div className="md:hidden space-y-4 p-4">
                        {loading ? (
                            <div className="flex items-center justify-center gap-3 p-4">
                                <span className="loading loading-spinner loading-md"></span>
                                <p className="text-md font-medium">Loading...</p>
                            </div>
                        ) : unexpectedErr.unexpectedError1 ? (
                            <div className="p-4">
                                <p className="flex items-center text-red-500 text-md font-medium">
                                    <CircleAlert size={17} className="mr-2" /> Error fetching student data
                                </p>
                            </div>
                        ) : (
                            studentsData.map((stData) => (
                                <div key={stData.id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="card-body p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-primary-focus">{stData.full_name}</h3>
                                                <p className="text-sm text-base-content/50">{stData.email}</p>
                                            </div>
                                            <button
                                                className="btn btn-ghost border-2 hover:border-primary/20 btn-circle hover:bg-primary/10 transition-colors duration-200"
                                                onClick={() => document.getElementById(`${stData.id}`).showModal()}
                                            >
                                                <Settings size={20} className="text-primary" />
                                            </button>
                                        </div>
                                        
                                        <div className="divider my-2"></div>
                                        
                                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2 text-sm">
                                            <div>
                                                <p className="text-base-content/70">Lessons Attended:</p>
                                                <p className="font-medium">{stData.studentLessonCount || 0}</p>
                                            </div>
                                            <div>
                                                <p className="text-base-content/70">Next Lesson:</p>
                                                <p className="font-medium flex items-center gap-1">
                                                    <Calendar size={14} className="text-secondary" />
                                                    <span className="truncate">{stData.scheduled_date || "Not scheduled"}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Success Alerts */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                <div
                    role="alert"
                    className={`alert alert-success w-fit rounded-xl transition-all duration-500 ease-in-out ${
                        success.deleteStudent ? "opacity-100" : "opacity-0 translate-x-full"
                    }`}
                >
                    <CheckCircle2 size={19} />
                    <span>Student Deleted Successfully</span>
                </div>
                
                <div
                    role="alert"
                    className={`alert alert-success w-fit rounded-xl transition-all duration-500 ease-in-out ${
                        success.editProfile ? "opacity-100" : "opacity-0 translate-x-full"
                    }`}
                >
                    <CheckCircle2 size={19} />
                    <span>Student Updated Successfully</span>
                </div>
            </div>

            {/* Add New Student Modal */}
            <dialog id="add_new_student" className="modal">
                <div className="max-h-[90vh] overflow-y-auto modal-box rounded-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add New Student</h3>
                    <p className="py-1 text-base-content/70">
                        Enter the student's information below to add them to the system.
                    </p>
                    <div id="new-student-form" className="flex flex-col space-y-2 mt-5">
                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend text-sm">Full Name</legend>
                            <input
                                type="text"
                                name="full_name"
                                className={`w-full border ${
                                    alert.fullName ? "border-red-500" : "border-base-300"
                                } rounded-lg input`}
                                onChange={handleStudentForm}
                                value={studentsForm.full_name}
                                placeholder="Student's Full Name (ex: John Doe)"
                            />
                            <p className={`${alert.fullName ? "block" : "hidden"} text-sm text-red-500`}>
                                Full name must be longer than 5 characters
                            </p>
                        </fieldset>
                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend text-sm">NIC</legend>
                            <input
                                type="text"
                                name="nic"
                                className="w-full border border-base-300 rounded-lg input"
                                onChange={handleStudentForm}
                                value={studentsForm.nic}
                                placeholder="Student's NIC (ex: 20106590XXXX)"
                            />
                        </fieldset>
                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend text-sm">Email</legend>
                            <input
                                type="text"
                                name="email"
                                className="w-full border border-base-300 rounded-lg input"
                                onChange={handleStudentForm}
                                value={studentsForm.email}
                                placeholder="Student's Email (ex: johndoe@gmail.com)"
                            />
                        </fieldset>
                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend text-sm">Phone Number</legend>
                            <input
                                type="text"
                                name="phone_number"
                                className="w-full border border-base-300 rounded-lg input"
                                onChange={handleStudentForm}
                                value={studentsForm.phone_number}
                                placeholder="Student's Contact No (ex: 77 555 XXXX)"
                            />
                            <p className={`${alert.phoneNumber ? "block" : "hidden"} text-sm text-red-500`}>
                                Phone number must be 10 digits only
                            </p>
                        </fieldset>
                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend text-sm">Address</legend>
                            <input
                                type="text"
                                name="address"
                                className="w-full border border-base-300 rounded-lg input"
                                onChange={handleStudentForm}
                                value={studentsForm.address}
                                placeholder="Student's Address (ex: 123 Main St, City)"
                            />
                        </fieldset>
                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend text-sm">Choose Modules</legend>
                            <div id="module-labels" className="flex flex-col space-y-2">
                                {modulesData.map((module, i) => (
                                    <label className="flex items-center gap-3" key={module.id}>
                                        <input
                                            type="checkbox"
                                            name={`module`}
                                            checked={studentsModule[i].module}
                                            onChange={(e) => handleStudentsModules(e, i)}
                                            className="border border-base-content/50 checkbox checkbox-neutral"
                                        />
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 module-desc">
                                            <p className="text-sm font-medium">{module.name}</p>
                                            <span className="text-xs text-base-content/70">{module.description}</span>
                                        </div>
                                    </label>
                                ))}
                                {unexpectedErr.unexpectedError2 && (
                                    <p className="text-red-500 font-medium">
                                        Unexpected error occurred while fetching modules data
                                    </p>
                                )}
                            </div>
                        </fieldset>
                        <p
                            className={`${
                                alert.formIncomplete ? "block" : "hidden"
                            } mt-3 text-sm font-medium text-red-500 flex items-center`}
                        >
                            <CircleAlert size={17} className="mr-2" /> Form Incomplete
                        </p>
                        <p
                            className={`${
                                alert.alreadyExists ? "block" : "hidden"
                            } mt-3 text-sm font-medium text-red-500 flex items-center`}
                        >
                            <CircleAlert size={17} className="mr-2" /> Student Already Exists
                        </p>
                        <p
                            className={`${
                                success.addStudent ? "block" : "hidden"
                            } mt-3 text-sm font-medium text-green-500 flex items-center`}
                        >
                            <CheckCircle2 size={17} className="mr-2" /> Student Successfully Added
                        </p>
                    </div>
                    <div className="mt-5 close-add-div flex items-center justify-end gap-3">
                        <form method="dialog">
                            <button onClick={clearAddStudentField} className="border-2 btn btn-default rounded-lg">
                                Close
                            </button>
                        </form>
                        <button
                            disabled={loading}
                            onClick={handleAddStudent}
                            className="border-2 btn btn-primary rounded-lg"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm mr-1"></span>
                                    <p>Adding</p>
                                </>
                            ) : (
                                "Add New Student"
                            )}
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Student Profile Modals */}
            {studentsData.map((stData) => (
                <dialog key={`dialog-${stData.id}`} id={stData.id} className="modal modal-middle">
                    <div className="modal-box rounded-xl w-fit scale-100 sm:scale-80 shadow-2xl border border-base-200 bg-gradient-to-br from-base-100 to-base-100/95">
                        <h3 className="font-bold text-xl text-primary-focus">Student Profile</h3>
                        <p className="py-1 text-base-content/70">
                            Detailed information about {stData.full_name}
                        </p>
                        <div className="user-info mt-5 flex flex-col sm:flex-row gap-4 mb-7">
                            <div className="user-details">
                                <div className="user-name">
                                    <p className="text-lg font-medium text-primary-focus">{stData.full_name}</p>
                                </div>
                                <div className="user-email mb-[2px]">
                                    <p className="text-base-content/70">{stData.email}</p>
                                </div>
                                <div className="user-st-id">
                                    <p className="text-base-content/70">
                                        Student ID: <span className="font-medium">{stData.nic}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="user-stats-container grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div className="scheduled-stat p-4 border border-base-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-base-100">
                                <div className="stat-title mb-2">
                                    <p className="font-medium text-sm text-base-content/85">Next Scheduled Lesson</p>
                                </div>
                                <div className="stat-desc">
                                    <p className="flex items-center gap-2 text-sm text-base-content/80">
                                        <Calendar size={16} className="text-secondary" />
                                        <span className="font-medium">
                                            {stData.scheduled_date ? stData.scheduled_date : "Yet to be scheduled"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="contact-stat p-4 border border-base-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-base-100">
                                <div className="stat-title mb-2">
                                    <p className="text-sm font-medium text-base-content/85">Contact Information</p>
                                </div>
                                <div className="stat-desc flex flex-col space-y-2">
                                    <p className="text-sm text-base-content/80 flex items-center gap-1">
                                        Email: <span className="font-medium ml-1">{stData.email}</span>
                                    </p>
                                    <p className="text-sm text-base-content/80 flex items-center gap-1">
                                        Phone: <span className="font-medium ml-1">{stData.phone_number}</span>
                                    </p>
                                    <p className="text-sm text-base-content/80 flex items-center gap-1">
                                        Address: <span className="font-medium ml-1">{stData.address}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="user-delete-btn mt-5">
                            <button
                                onClick={() => {
                                    const modal = document.getElementById(`confirm_del_std_${stData.id}`);
                                    if (modal) modal.showModal();
                                }}
                                className="btn rounded-lg border-2 text-red-950 border-red-600 bg-red-500 hover:bg-red-600 transition duration-150 ease-in-out active:bg-red-400"
                            >
                                <Trash size={18} className="mr-2" /> Delete Student
                            </button>
                            <dialog id={`confirm_del_std_${stData.id}`} className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">
                                        Do you want to delete this student from the system?
                                    </h3>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn rounded-lg border-2">Cancel</button>
                                        </form>
                                        <div className="delete-confirm-btn">
                                            <button
                                                className="btn rounded-lg bg-red-500 border-2 border-red-600 text-red-950 hover:bg-red-600 transition duration-150 ease-in-out active:bg-red-400"
                                                onClick={() => handleDeleteStudent(stData.id)}
                                            >
                                                Yes, Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-default mr-2 rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-300">
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary text-primary-content rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                                    onClick={() => {
                                        const modal = document.getElementById(`editProfile${stData.id}`);
                                        if (modal) {
                                            modal.showModal();
                                        }
                                        editModal(stData);
                                    }}
                                >
                                    Edit Profile
                                </button>
                                <dialog id={`editProfile${stData.id}`} className="modal">
                                    <div className="modal-box rounded-xl">
                                        <h4 className="text-lg font-semibold mb-5">Edit Contact information</h4>
                                        <div className="student-info flex flex-col space-y-5">
                                            <label>
                                                <p className="mb-1 font-medium">Full Name</p>
                                                <input 
                                                    type="text" 
                                                    name="full_name" 
                                                    className="input rounded-lg w-full" 
                                                    value={editForm.full_name} 
                                                    onChange={ediProfileChange} 
                                                />
                                            </label>
                                            <label>
                                                <p className="mb-1 font-medium">Phone Number</p>
                                                <input 
                                                    type="text" 
                                                    name="phone_number" 
                                                    className="input rounded-lg w-full" 
                                                    value={editForm.phone_number} 
                                                    onChange={ediProfileChange} 
                                                />
                                            </label>
                                            <label>
                                                <p className="mb-1 font-medium">Address</p>
                                                <input 
                                                    type="text" 
                                                    name="address" 
                                                    className="input rounded-lg w-full" 
                                                    value={editForm.address} 
                                                    onChange={ediProfileChange}
                                                />
                                            </label>
                                            <label>
                                                <p className="mb-1 font-medium">NIC</p>
                                                <input 
                                                    type="text" 
                                                    name="nic" 
                                                    className="input rounded-lg w-full" 
                                                    value={editForm.nic} 
                                                    onChange={ediProfileChange} 
                                                />
                                            </label>
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn rounded-lg border-2">
                                                    Cancel
                                                </button>
                                            </form>
                                            <div className="save-confirm-btn">
                                                <button
                                                    className="btn rounded-lg btn-primary transition duration-150 ease-in-out"
                                                    onClick={() => handleSaveEditProfile(stData.id)}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </dialog>
                            </form>
                        </div>
                    </div>
                </dialog>
            ))}
        </div>
    </div>
    );
}
