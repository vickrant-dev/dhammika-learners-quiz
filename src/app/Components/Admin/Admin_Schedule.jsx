import { Calendar, Check, CheckCircle2, CircleAlert, Clock4, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from '../../utils/supabase';

export default function AdminSchedule() {

    const [loading, setLoading] = useState({
        fetchlessons: false,
        rescheduling: false,
        deleteSchedule: false,
    });
    const [alert, setAlert] = useState({
        reschedule: false,
        fillForm: false,
        error: false,
        deleteSchedule: false,
    });
    const [success, setSuccess] = useState({
        rescheduled: false,
        deleteSchedule: false,
    })
    const [dailyScheduleForm, setDailyScheduleForm] = useState({
        date: new Date().toISOString().slice(0, 10),
    });
    const [customDate, setCustomDate] = useState({
        date: new Date().toISOString().slice(0, 10),
    })
    const [rescheduleForm, setRescheduleForm] = useState({
        new_date: '',
    })
    const [lessons, setLessons] = useState([]);
    const [studentName, setStudentName] = useState([{
        student_name: '',
        student_id: '',
    }])

    const handleDailySchedule = (e) => {

        const { name, value } = e.target;

        setDailyScheduleForm((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const handleCompletedLessons  = (e) => {

        const { name, value } = e.target;

        setCustomDate((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const fetchLessons = async () => {

        setLoading((prev) => ({
            ...prev,
            fetchlessons: true
        }));

        const { data, error } = await supabase
            .from('lessons')
            .select('*')
        
        if(error){
            console.log('Error fetching lessons data:', data);
            setLoading((prev) => ({
                ...prev,
                fetchlessons: false
            }));
            return;
        }

        if(data){
            console.log(data);
            setLessons(data);
            data.map((dt) => {
                fetchStudentName(dt);
            });
            setLoading((prev) => ({
                ...prev,
                fetchlessons: false
            }));
        }

    }

    const fetchStudentName = async (dt) => {

        console.log(dt.student_id)

        const { data:studentsData, error:studentsDataErr } = await supabase
            .from('students')
            .select('full_name')
            .eq('id', dt.student_id);

            if (studentsData && studentsData.length > 0) {
                setLessons((prevLessons) => 
                    prevLessons.map((lesson) => {
                        if (lesson.student_id === dt.student_id) {
                            return {
                                ...lesson,
                                student_name: studentsData[0].full_name,
                            };
                        }
                        return lesson;
                    })
                );
                setLoading((prev) => ({
                    ...prev,
                    fetchlessons: false
                }));
            }

            if(studentsDataErr) {
                console.log('Error occured fetching student\'s details:', studentsDataErr?.messsage);
                setLoading((prev) => ({
                    ...prev,
                    fetchlessons: false
                }));
                return;
            }

        if(studentsDataErr){
            console.log(studentsDataErr);
            setLoading((prev) => ({
                ...prev,
                fetchlessons: false
            }));
            return;
        }

    }

    const handleMarkCompleted = async (lessonID) => {

        console.log('You click on mark as complete');

        const { error } = await supabase
            .from('lessons')
            .update({ status: 'completed' })
            .eq('id', lessonID);

        if(error){
            console.log('Error updating lessons table:', error?.message);
            return;
        }

        else {
            console.log('Successfully updated the status');
            fetchLessons();
        }

    }

    const handleRescheduleChange = (e, scheduledDate) => {
        const { name, value } = e.target;
    
        if (name === 'new_date') {
            // Handling new date
            const selectedDate = new Date(value); // Convert to Date object
            const lessonDate = new Date(scheduledDate); // Convert to Date object
            
            // Normalize the time portion to compare just the date part (removing time)
            selectedDate.setHours(0, 0, 0, 0);
            lessonDate.setHours(0, 0, 0, 0);
            
            if (selectedDate <= lessonDate) {
                console.log("You cannot choose an older date");
                setAlert((prev) => ({
                    ...prev,
                    reschedule: true,
                }));
                setRescheduleForm((prev) => ({
                    ...prev,
                    [name]: value,
                }));
                return;
            } else {
                setRescheduleForm((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            
                setAlert((prev) => ({
                    ...prev,
                    reschedule: false,
                }));
            }
        } else if (name === 'new_time') {
            // Handling new time
            setRescheduleForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    
        console.log(name);
        console.log(value);
    };    
    
    const handleReschedule = async (lessonID, lessonDate, lessonTime) => {
        setLoading((prev) => ({
            ...prev,
            rescheduling: true
        }));
    
        try {
            // Early form validation
            if (!rescheduleForm.new_date || !rescheduleForm.new_time) {
                setAlert((prev) => ({
                    ...prev,
                    fillForm: true
                }));
                setLoading((prev) => ({
                    ...prev,
                    rescheduling: false
                }));
                return;
            }
    
            console.log('Rescheduling the lesson');
            console.log('lessons:', lessons);
            console.log('Actual lesson date:', lessonDate);
            console.log('reschedule form date:', rescheduleForm.new_date);
            console.log('reschedule form time:', rescheduleForm.new_time);
    
            const rescheduleDate = new Date(rescheduleForm.new_date);
            const rescheduleTime = rescheduleForm.new_time;
    
            const originalLessonDate = new Date(lessonDate);
            const originalLessonTime = new Date(lessonTime);
    
            rescheduleDate.setHours(0, 0, 0, 0);
            originalLessonDate.setHours(0, 0, 0, 0);
    
            if (rescheduleTime <= originalLessonTime) {
                console.log('Time err');
                setLoading((prev) => ({
                    ...prev,
                    rescheduling: false
                }));
                return;
            }
    
            if (rescheduleTime && rescheduleTime > originalLessonTime) {
                rescheduleDate.setHours(rescheduleTime.getHours(), rescheduleTime.getMinutes(), 0, 0);
            }
    
            if (rescheduleDate <= originalLessonDate) {
                setAlert((prev) => ({
                    ...prev,
                    reschedule: true
                }));
                setLoading((prev) => ({
                    ...prev,
                    rescheduling: false
                }));
                return;
            }
    
            if (rescheduleDate.getTime() === originalLessonDate.getTime() && rescheduleTime) {
                console.log("You cannot update the time on the same day.");
                setAlert((prev) => ({
                    ...prev,
                    reschedule: true
                }));
                setLoading((prev) => ({
                    ...prev,
                    rescheduling: false
                }));
                return;
            }
    
            console.log('Updating db');
            const { error: updateLessonsErr } = await supabase
                .from('lessons')
                .update({
                    scheduled_date: rescheduleForm.new_date,
                    time: rescheduleForm.new_time,
                })
                .eq('id', lessonID);
    
            if (updateLessonsErr) {
                console.log('Error updating lesson\'s reschedule date and time:', updateLessonsErr?.message);
                setLoading((prev) => ({
                    ...prev,
                    rescheduling: false
                }));
                return;
            }
    
            console.log('Successfully updated lesson table\'s reschedule column with new date and time');
            setSuccess({
                rescheduled: true,
            });
            setAlert((prev) => ({
                ...prev,
                reschedule: false,
                fillForm: false,
                error: false,
            }));
            setRescheduleForm({
                new_date: '',
                new_time: '',
            });
            setLoading((prev) => ({
                ...prev,
                rescheduling: false
            }));
            fetchLessons();
    
            setTimeout(() => {
                setSuccess({
                    rescheduled: false
                });
            }, 1000);
        } catch (err) {
            console.error('Unexpected error during reschedule:', err);
            setAlert((prev) => ({
                ...prev,
                error: true
            }));
            setLoading((prev) => ({
                ...prev,
                rescheduling: false
            }));
        }
    };        

    const cancelReschedule = () => {

        setAlert({
            reschedule: false,
        });
        setRescheduleForm({
            new_date: '',
        });
        setSuccess({
            rescheduled: false,
        })

    }
    
    useEffect(() => {
        fetchLessons();
        console.log(studentName)
    }, []);

    const filteredLessons = lessons
        .filter((lesson) => lesson.status === 'scheduled')
        .filter((lesson) => lesson.scheduled_date === dailyScheduleForm.date);

    const filteredCompletedLessons = lessons
        .filter((lesson) => lesson.status === 'completed')
        .filter((lesson) => lesson.scheduled_date === customDate.date);

    const handleDeleteSchedule = async (lessID) => {

        // Delete schedule
        setLoading((prev) => ({
            ...prev,
            deleteSchedule: true,
        }));
        const { error } = await supabase
            .from("lessons")
            .delete()
            .eq("id", lessID);
        
        if (error) {
            console.log("Error deleting lesson: ", error.message);
            setLoading((prev) => ({
                ...prev,
                deleteSchedule: false,
            }))
            setAlert((prev) => ({
                ...prev,
                deleteSchedule: true,
            }))
            return;
        }

        setLoading((prev) => ({
            ...prev,
            deleteSchedule: false,
        }))
        setAlert((prev) => ({
            ...prev,
            deleteSchedule: false,
        }))
        setSuccess((prev) => ({
            ...prev,
            deleteSchedule: true
        }))
        console.log("Successfully deleted Lesson");
        fetchLessons();

    }

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
        <>
            <div id="admin-container">
                <div
                    id="admin-body"
                    className="pl-[2.25rem] pt-[0] lg:mr-10 md:mr-10 sm:mr-5 mr-5"
                >
                    <div className="title">
                        <h1 className="text-3xl font-semibold mb-7 text-primary-focus">
                            Lesson Schedule
                        </h1>
                    </div>
                    <div className="admin-schedule-container mt-10 border border-base-300 p-6 rounded-xl shadow-lg bg-base-100">
                        <div className="header flex flex-col sm:flex-row items-normal lg:items-center md:items-center sm:items-normal gap-4 lg:gap-0 md:gap-0 sm:gap-4 justify-between mb-7">
                            <div className="title">
                                <p className="text-xl font-semibold text-primary-focus">
                                    Daily Schedule
                                </p>
                                <p className="mt-1 text-base-content/85 font-medium">
                                    {dailyScheduleForm.date
                                        ? dailyScheduleForm.date
                                        : "Choose a date"}
                                </p>
                            </div>
                            <div className="date-chooser">
                                <p className="mb-1 text-base-content/75 font-medium">
                                    Choose a Date
                                </p>
                                <input
                                    type="date"
                                    name="date"
                                    value={dailyScheduleForm.date}
                                    onChange={handleDailySchedule}
                                    className="btn btn-outline border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 focus:border-primary/30"
                                />
                            </div>
                        </div>
                        <div className="schedule-lists flex flex-col gap-4">
                            {loading.fetchlessons ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <span className="loading loading-spinner loading-md"></span>
                                        <p>Loading</p>
                                    </div>
                                </>
                            ) : filteredLessons &&
                              filteredLessons.length > 0 ? (
                                filteredLessons.map((lesson) => (
                                    <div className="schedule flex items-center justify-between p-5 rounded-xl border border-base-200 gap-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 bg-gradient-to-br from-base-100 to-base-100/95">
                                        <div className="left flex items-center gap-4">
                                            <div className="icon bg-primary/10 border border-primary/20 rounded-full p-2.5">
                                                <Clock4
                                                    className="text-primary"
                                                    size={24}
                                                />
                                            </div>
                                            <div className="time-student">
                                                <p className="text-md font-medium text-primary-focus">
                                                    {lesson.time.split("+")[0]}
                                                </p>
                                                <p className="text-sm text-base-content/75">
                                                    {lesson.student_name} •{" "}
                                                    {lesson.lesson_name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="right flex gap-3 ">
                                            <button
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            lesson.id
                                                        )
                                                        .showModal()
                                                }
                                                className="btn btn-primary border-primary/50 text-primary-content rounded-lg py-5 shadow-md hover:shadow-lg transition-all duration-300"
                                            >
                                                {isMobile ? (
                                                    <>
                                                        <Check
                                                            size={18}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check
                                                            className="mr-2"
                                                            size={18}
                                                        />
                                                        Mark as Complete
                                                    </>
                                                )}
                                            </button>
                                            <dialog
                                                id={lesson.id}
                                                className="modal"
                                            >
                                                <div className="rounded-xl modal-box">
                                                    <h3 className="font-bold text-lg">
                                                        Do you want to mark this
                                                        lesson as completed?
                                                    </h3>
                                                    <div className="student-lesson-details mt-5">
                                                        <div className="left flex items-center gap-4">
                                                            <div className="icon bg-primary/10 border border-primary/20 rounded-full p-2.5">
                                                                <Clock4
                                                                    className="text-primary"
                                                                    size={24}
                                                                />
                                                            </div>
                                                            <div className="time-student">
                                                                <p className="text-md font-medium text-primary-focus">
                                                                    {
                                                                        lesson.time.split(
                                                                            "+"
                                                                        )[0]
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-base-content/75">
                                                                    {
                                                                        lesson.student_name
                                                                    }{" "}
                                                                    •{" "}
                                                                    {
                                                                        lesson.lesson_name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn rounded-lg border-2 ">
                                                                Close
                                                            </button>
                                                        </form>
                                                        <button
                                                            onClick={() =>
                                                                handleMarkCompleted(
                                                                    lesson.id
                                                                )
                                                            }
                                                            className="btn btn-primary rounded-lg border-2"
                                                        >
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </div>
                                            </dialog>
                                            <button
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "confirm-re-schedule"
                                                        )
                                                        .showModal()
                                                }
                                                className="btn btn-outline btn-secondary border-2 rounded-lg py-5 shadow-sm hover:shadow-md transition-all duration-300"
                                            >
                                                {isMobile ? (
                                                    <>
                                                        <Calendar
                                                        size={18}
                                                        />
                                                    </>
                                                ): (
                                                    <>
                                                        <Calendar
                                                        className="mr-2"
                                                        size={18}
                                                        />
                                                        Re-schedule
                                                    </>
                                                )}
                                                
                                            </button>
                                            <dialog
                                                id="confirm-re-schedule"
                                                className="modal"
                                            >
                                                <div className="modal-box rounded-xl">
                                                    <h3 className="font-bold text-lg">
                                                        Re-schedule this lesson
                                                    </h3>
                                                    <p className="py-4">
                                                        Please choose a new date
                                                        and time to re-schedule
                                                        this lesson
                                                    </p>

                                                    {/* New Date Input */}
                                                    <label>
                                                        <p className="font-medium">
                                                            New Date
                                                        </p>
                                                        <input
                                                            type="date"
                                                            name="new_date"
                                                            value={
                                                                rescheduleForm.new_date
                                                            }
                                                            onChange={(e) =>
                                                                handleRescheduleChange(
                                                                    e,
                                                                    lesson.scheduled_date
                                                                )
                                                            }
                                                            className="mt-2 btn btn-outline border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 focus:border-primary/30"
                                                        />
                                                    </label>

                                                    {/* New Time Input */}
                                                    <label>
                                                        <p className="mt-3 font-medium">
                                                            New Time
                                                        </p>
                                                        <input
                                                            type="time"
                                                            name="new_time"
                                                            value={
                                                                rescheduleForm.new_time
                                                            }
                                                            onChange={
                                                                handleRescheduleChange
                                                            }
                                                            className="mt-2 btn btn-outline border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 focus:border-primary/30"
                                                        />
                                                    </label>

                                                    {/* Alert for invalid date */}
                                                    <div
                                                        className={
                                                            alert.reschedule
                                                                ? "flex items-center gap-2 mt-2"
                                                                : "hidden"
                                                        }
                                                        id="alert-reschedule"
                                                    >
                                                        <CircleAlert
                                                            className="text-red-500"
                                                            size={17}
                                                        />
                                                        <p className="text-sm text-red-500 font-medium">
                                                            You can not choose
                                                            an older date.
                                                            Please choose a
                                                            newer date
                                                        </p>
                                                    </div>
                                                    {/* Alert if form is not filled */}
                                                    <div
                                                        className={
                                                            alert.fillForm
                                                                ? "flex items-center gap-2 mt-2"
                                                                : "hidden"
                                                        }
                                                        id="alert-fillform"
                                                    >
                                                        <CircleAlert
                                                            className="text-red-500"
                                                            size={17}
                                                        />
                                                        <p className="text-sm text-red-500 font-medium">
                                                            Please fill in the
                                                            form before
                                                            re-scheduling.
                                                        </p>
                                                    </div>

                                                    {/* Success Alert */}
                                                    <div
                                                        className={
                                                            success.rescheduled
                                                                ? "flex items-center gap-2 mt-2"
                                                                : "hidden"
                                                        }
                                                        id="alert-reschedule"
                                                    >
                                                        <CheckCircle2
                                                            className="text-green-500"
                                                            size={17}
                                                        />
                                                        <p className="text-sm text-green-500 font-medium">
                                                            Successfully
                                                            re-scheduled the
                                                            lesson
                                                        </p>
                                                    </div>

                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button
                                                                onClick={
                                                                    cancelReschedule
                                                                }
                                                                className="btn border-2 rounded-lg"
                                                            >
                                                                {success.rescheduled
                                                                    ? "Close"
                                                                    : "Cancel"}
                                                            </button>
                                                        </form>
                                                        {!loading.rescheduling ? (
                                                            <div
                                                                onClick={() =>
                                                                    handleReschedule(
                                                                        lesson.id,
                                                                        lesson.scheduled_date,
                                                                        lesson.time
                                                                    )
                                                                }
                                                                disabled={
                                                                    success.rescheduled
                                                                }
                                                                className="btn btn-secondary border-2 rounded-lg"
                                                            >
                                                                {success.rescheduled
                                                                    ? "Re-scheduled"
                                                                    : "Re-schedule"}
                                                            </div>
                                                        ) : (
                                                            <div
                                                                disabled={
                                                                    loading.rescheduling
                                                                }
                                                                className="btn btn-secondary border-2 rounded-lg"
                                                            >
                                                                <span className="loading loading-spinner loading-md mr-2"></span>
                                                                <p>
                                                                    Re-scheduling
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </dialog>
                                            <button
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            lesson.id + "delete"
                                                        )
                                                        .showModal()
                                                }
                                                className="btn border-2 border-red-700 bg-red-500 rounded-lg py-5 shadow-sm hover:shadow-md text-red-950 transition-all duration-300"
                                            >
                                                <Trash size={18} />
                                            </button>
                                            <dialog
                                                id={lesson.id + "delete"}
                                                className="modal"
                                            >
                                                <div className="rounded-xl modal-box">
                                                    <h3 className="font-bold text-lg">
                                                        Do you want to delete
                                                        this lesson?
                                                    </h3>
                                                    <div className="student-lesson-details mt-5">
                                                        <div className="left flex items-center gap-4">
                                                            <div className="icon bg-primary/10 border border-primary/20 rounded-full p-2.5">
                                                                <Clock4
                                                                    className="text-primary"
                                                                    size={24}
                                                                />
                                                            </div>
                                                            <div className="time-student">
                                                                <p className="text-md font-medium text-primary-focus">
                                                                    {
                                                                        lesson.time.split(
                                                                            "+"
                                                                        )[0]
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-base-content/75">
                                                                    {
                                                                        lesson.student_name
                                                                    }{" "}
                                                                    •{" "}
                                                                    {
                                                                        lesson.lesson_name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${alert.deleteSchedule ? "flex" : "hidden"} none mt-6 error-message`}
                                                    >
                                                        <p className="text-red-500 font-medium">
                                                            Error Deleting
                                                            Lesson
                                                        </p>
                                                    </div>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn rounded-lg border-2 ">
                                                                Close
                                                            </button>
                                                        </form>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteSchedule(
                                                                    lesson.id
                                                                )
                                                            }
                                                            className="btn border-2 border-red-700 bg-red-500 text-red-950 rounded-lg"
                                                        >
                                                            Yes, Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="font-medium">
                                    No scheduled lessons on{" "}
                                    {dailyScheduleForm.date}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="admin-completed-lessons-container mt-10 border border-base-300 p-6 rounded-xl shadow-lg bg-base-100">
                        <div className="header flex flex-col sm:flex-row items-normal lg:items-center md:items-center sm:items-normal gap-4 lg:gap-0 md:gap-0 sm:gap-4 justify-between mb-7">
                            <div className="title">
                                <p className="text-xl font-semibold text-primary-focus">
                                    Completed Lessons
                                </p>
                                <p className="mt-1 text-base-content/85 font-medium">
                                    {customDate.date
                                        ? customDate.date
                                        : "Choose a date"}
                                </p>
                            </div>
                            <div className="date-chooser">
                                <p className="mb-1 text-base-content/75 font-medium">
                                    Choose a Date
                                </p>
                                <input
                                    type="date"
                                    name="date"
                                    value={customDate.date}
                                    onChange={handleCompletedLessons}
                                    className="btn btn-outline border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 focus:border-primary/30"
                                />
                            </div>
                        </div>
                        <div className="schedule-lists flex flex-col gap-4">
                            {loading.fetchlessons ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <span className="loading loading-spinner loading-md"></span>
                                        <p>Loading</p>
                                    </div>
                                </>
                            ) : filteredCompletedLessons &&
                              filteredCompletedLessons.length > 0 ? (
                                filteredCompletedLessons.map((lesson) => (
                                    <div className="schedule flex items-center p-5 rounded-xl border border-base-200 gap-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 bg-gradient-to-br from-base-100 to-base-100/95">
                                        <div className="left flex items-center gap-4">
                                            <div className="icon bg-success/10 border border-primary/20 rounded-full p-2.5">
                                                <CheckCircle2
                                                    className="text-success"
                                                    size={24}
                                                />
                                            </div>
                                            <div className="time-student">
                                                <p className="text-md font-medium text-primary-focus">
                                                    {lesson.time.split("+")[0]}
                                                </p>
                                                <p className="text-sm text-base-content/75">
                                                    {lesson.student_name} •{" "}
                                                    {lesson.lesson_name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="font-medium">
                                    No completed lessons on{" "}
                                    {customDate.date}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}