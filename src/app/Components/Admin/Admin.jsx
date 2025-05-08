'use client'
import { Calendar, CheckCircle2, CircleAlert, Clock4, Plus, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Resend } from 'resend';
import { supabase } from '../../utils/supabase.js';

export default function Admin() {

    const [newScheduleForm, setNewScheduleForm] = useState({
        student_id: '',
        lesson_name: '',
        scheduled_date: '',
        time: '',
        status: 'scheduled',
        notes: '',
    });
    const [alert, setAlert] = useState({
        studentExists: false,
        errorInserting: false,
        formNotFilled: false,
        commonError: false,
    })
    const [success, setSuccess] = useState({
        lessonAdded: false,
    })
    const [totalStudents, setTotalStudents] = useState(null);
    const [scheduledLessons, setScheduledLessons] = useState(null);
    const [modules, setModules] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchTotalStudents = async () => {

        setLoading(true);

        const { data, error } = await supabase
            .from('students')
            .select('*');

        if (data) {
            console.log('data length:', data.length);
            console.log('data:', data);
            setTotalStudents(data);
            setLoading(false);
            return;
        }
        console.log('Error fetching data:', error?.message);
        setLoading(false);
    };

    const fetchScheduledLessons = async () => {

        setLoading(true);

        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .eq('status', 'scheduled');
        
        if (data) {
            console.log('Scheduled Data:', data);
            setScheduledLessons(data);
            setLoading(false);
            return;
        }

        console.log('Error fetching student_module_assignments data:', error?.message);
        setLoading(false);

    }

    const fetchModules = async () => {

        const { data, error } = await supabase
            .from('modules')
            .select('*')

        if(data){
            console.log('module data:', data);
            setModules(data);
        }
        else {
            console.log('Error fetching module data');
        }

    }
    
    const handleAddNewSchedule = async () => {

        if (
            Object.entries(newScheduleForm)
                .filter(([key]) => key !== "notes")
                .filter(([key]) => key !== 'rescheduled_to')
                .every(([_, value]) => value.trim() !== "")
        ) {
            console.log("Form is valid!");
            console.log('schedule-form:', newScheduleForm);

            // Check if the student has a lesson with completed 'false' before adding
            if(await checkExistingStdSchedule(newScheduleForm.student_id)) {
                console.log('Student already has a lesson to be completed');
                setAlert((prev) => ({
                    ...prev,
                    studentExists: true
                }));
                return;
            }

            else {
                // update db
                const { data, error } = await supabase
                    .from('lessons')
                    .insert(newScheduleForm);
                
                if(error) {
                    console.log('Error inserting data to lessons table:', error.message);
                    setAlert((prev) => ({
                        ...prev,
                        errorInserting: true
                    }));
                    return;
                }
    
                console.log('successfully inserted data to lessons db');                
                setSuccess((prev) => ({
                    ...prev,
                    lessonAdded: true
                }));
                setAlert({
                    studentExists: false,
                    errorInserting: false,
                    formNotFilled: false,
                    commonError: false,
                })
                fetchScheduledLessons();
                fetchModules();
            }

        } else {
            console.log("Please fill in all required fields.");
            setAlert((prev) => ({
                ...prev,
                formNotFilled: true
            }));
            console.log('schedule-form:', newScheduleForm);
            return;
        }


    }

    const handleAddNewScheduleChange = (e) => {

        const { name, value } = e.target;

        setNewScheduleForm((prev) => ({
            ...prev,
            [name]: value
        }));

        console.log('name:', name);
        console.log('value:', value);

    }

    const checkExistingStdSchedule = async (stdID) => {

        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .eq('student_id', stdID);

        if(error) {
            console.log('Error checking for existing student schedule');
            setAlert((prev) => ({
                ...prev,
                commonError: true
            }))
            return true;
        }

        if (data && data.length > 0) {
            console.log('std mod assi:', data);
            const hasScheduled = data.some(d => d.status === 'scheduled');
            return hasScheduled;
        }
    
        return false;

    }

    const handleCloseNewSchedule = () => {

        setNewScheduleForm({
            student_id: '',
            lesson_name: '',
            scheduled_date: '',
            time: '',
            status: 'scheduled',
            notes: '',
        });

        setAlert({
            studentExists: false,
            errorInserting: false,
            formNotFilled: false,
            commonError: false,
        });

        setSuccess({
            lessonAdded: false
        });

    }

    useEffect(() => {
        fetchTotalStudents();
        fetchScheduledLessons();
        fetchModules();
    }, []);

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    return (
        <>
            <div id="admin-container" className="w-full pl-[2.25rem] pr-4 sm:pr-6 lg:pr-10">
                <div id="admin-body">
                    <div className="title mb-7">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-primary-focus">
                            Dashboard
                        </h1>
                    </div>

                    <div className="dashboard-stats">
                        <div className="stats-container flex flex-col sm:flex-row flex-wrap gap-5">
                            <div className="stats shadow-lg/8 rounded-xl border border-base-300 w-full sm:w-[275px] bg-gradient-to-br from-base-100 to-base-200 transition-all duration-300 hover:shadow-xl/8 cursor-pointer">
                                <div className="stat p-6">
                                    <div className="stat-title flex items-center justify-between pb-2">
                                        <p className="text-sm font-medium text-base-content/70">
                                            Total Students
                                        </p>
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <UserRound
                                                size={18}
                                                className="text-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="stat-value text-4xl font-bold text-primary">
                                        {loading ? (
                                            <span className="loading loading-spinner loading-lg"></span>
                                        ) : (
                                            totalStudents?.length || 0
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="stats shadow-lg/8 rounded-xl border border-base-300 w-full sm:w-[275px] bg-gradient-to-br from-base-100 to-base-200 transition-all duration-300 hover:shadow-xl/8 cursor-pointer">
                                <div className="stat p-6">
                                    <div className="stat-title flex items-center justify-between pb-2">
                                        <p className="text-sm font-medium text-base-content/70">
                                            Scheduled Lessons
                                        </p>
                                        <div className="bg-secondary/10 p-2 rounded-full">
                                            <Calendar
                                                size={18}
                                                className="text-secondary"
                                            />
                                        </div>
                                    </div>
                                    <div className="stat-value text-4xl font-bold text-secondary">
                                        {loading ? (
                                            <span className="loading loading-spinner loading-lg"></span>
                                        ) : Array.isArray(scheduledLessons) ? (
                                            scheduledLessons
                                                .filter(
                                                    (l) =>
                                                        l.status === "scheduled"
                                                )
                                                .filter(
                                                    (l) =>
                                                        new Date(
                                                            l.scheduled_date
                                                        ) <= sevenDaysFromNow
                                                )
                                                .slice(0, 7).length
                                        ) : (
                                            0
                                        )}
                                    </div>
                                    <div className="stat-desc mt-1 text-base-content/60">
                                        For the next 7 days
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="upcoming-lessons my-10 border border-base-300 p-4 sm:p-6 rounded-2xl shadow-lg bg-base-100">
                        <div className="header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="header-info">
                                <h2 className="text-xl font-semibold mb-1 text-primary-focus">
                                    Upcoming Lessons
                                </h2>
                                <p className="text-md text-base-content/75">
                                    Scheduled lessons for the next 7 days
                                </p>
                            </div>
                            <div className="header-btn">
                                <button
                                    className="btn btn-primary text-primary-content rounded-xl py-5.5 shadow-md hover:shadow-lg transition-all duration-300"
                                    onClick={() =>
                                        document
                                            .getElementById("my_modal_3")
                                            .showModal()
                                    }
                                >
                                    <Plus className="mr-1" size={22} /> Schedule
                                    New
                                </button>

                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box w-full max-w-2xl lg:w-full max-h-[90vh] overflow-y-auto rounded-2xl">
                                        <h3 className="font-bold text-lg">
                                            Schedule New Lesson
                                        </h3>
                                        <p className="py-1 text-base-content/70">
                                            Fill out the form below to schedule
                                            a new driving lesson.
                                        </p>
                                        <div
                                            id="form-options"
                                            className="flex flex-col gap-4 mt-6"
                                        >
                                            <fieldset className="w-full">
                                                <legend className="text-sm">
                                                    Student
                                                </legend>
                                                <select
                                                    name="student_id"
                                                    onChange={
                                                        handleAddNewScheduleChange
                                                    }
                                                    value={
                                                        newScheduleForm.student_id
                                                    }
                                                    className="w-full select border border-base-300 rounded-lg"
                                                >
                                                    <option value="default">
                                                        Select a student
                                                    </option>
                                                    {totalStudents?.map((s) => (
                                                        <option
                                                            key={s.id}
                                                            value={s.id}
                                                        >
                                                            {s.full_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </fieldset>

                                            <fieldset className="w-full">
                                                <legend className="text-sm">
                                                    Lesson
                                                </legend>
                                                <input
                                                    type="text"
                                                    name="lesson_name"
                                                    onChange={
                                                        handleAddNewScheduleChange
                                                    }
                                                    value={
                                                        newScheduleForm.lesson_name
                                                    }
                                                    className="w-full py-2.5 px-4 border border-base-300 rounded-lg"
                                                />
                                            </fieldset>

                                            <div className="date-time flex flex-col md:flex-row gap-3">
                                                <fieldset className="w-full">
                                                    <legend className="text-sm">
                                                        Date
                                                    </legend>
                                                    <input
                                                        type="date"
                                                        name="scheduled_date"
                                                        onChange={
                                                            handleAddNewScheduleChange
                                                        }
                                                        value={
                                                            newScheduleForm.scheduled_date
                                                        }
                                                        className="w-full py-2.5 px-4 border border-base-300 rounded-lg"
                                                    />
                                                </fieldset>

                                                <fieldset className="w-full">
                                                    <legend className="text-sm">
                                                        Time
                                                    </legend>
                                                    <input
                                                        type="time"
                                                        name="time"
                                                        onChange={
                                                            handleAddNewScheduleChange
                                                        }
                                                        value={
                                                            newScheduleForm.time
                                                        }
                                                        className="w-full py-2.5 px-4 border border-base-300 rounded-lg"
                                                        style={{
                                                            appearance: "none",
                                                            WebkitAppearance:
                                                                "none",
                                                            MozAppearance:
                                                                "none",
                                                        }}
                                                    />
                                                </fieldset>
                                            </div>

                                            <fieldset className="w-full">
                                                <legend className="text-sm">
                                                    Notes
                                                </legend>
                                                <textarea
                                                    className="w-full border border-base-300 rounded-lg textarea"
                                                    name="notes"
                                                    onChange={
                                                        handleAddNewScheduleChange
                                                    }
                                                    value={
                                                        newScheduleForm.notes
                                                    }
                                                    placeholder="Add any notes about this lesson"
                                                ></textarea>
                                            </fieldset>
                                        </div>

                                        <div className="user-alert-sec mt-4">
                                            {alert.studentExists && (
                                                <div className="flex items-center text-red-500 text-sm mb-2">
                                                    <CircleAlert
                                                        size={18}
                                                        className="mr-2"
                                                    />
                                                    There is already a pending
                                                    lesson for this student
                                                </div>
                                            )}
                                            {alert.errorInserting && (
                                                <div className="flex items-center text-red-500 text-sm mb-2">
                                                    <CircleAlert
                                                        size={18}
                                                        className="mr-2"
                                                    />
                                                    Error inserting data to
                                                    database
                                                </div>
                                            )}
                                            {alert.formNotFilled && (
                                                <div className="flex items-center text-red-500 text-sm mb-2">
                                                    <CircleAlert
                                                        size={18}
                                                        className="mr-2"
                                                    />
                                                    Please fill in the form
                                                </div>
                                            )}
                                            {success.lessonAdded && (
                                                <div className="flex items-center text-green-500 text-sm mb-2">
                                                    <CheckCircle2
                                                        size={18}
                                                        className="mr-2"
                                                    />
                                                    Successfully added a new
                                                    lesson
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-5 flex items-center justify-end gap-3">
                                            <form method="dialog">
                                                <button
                                                    onClick={
                                                        handleCloseNewSchedule
                                                    }
                                                    className="btn btn-default border-2 rounded-lg"
                                                >
                                                    Close
                                                </button>
                                            </form>
                                            <button
                                                onClick={handleAddNewSchedule}
                                                className="btn btn-primary border-2 rounded-lg"
                                            >
                                                Add Schedule
                                            </button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>

                        <div className="lessons-table flex flex-col gap-6 pt-7">
                            {scheduledLessons?.length ? (
                                scheduledLessons
                                    .sort(
                                        (a, b) =>
                                            new Date(a.scheduled_date) -
                                            new Date(b.scheduled_date)
                                    )
                                    .filter(
                                        (l) =>
                                            l.status === "scheduled" &&
                                            new Date(l.scheduled_date) <=
                                                sevenDaysFromNow
                                    )
                                    .slice(0, 7)
                                    .map((lesson, i) => (
                                        <div
                                            key={i}
                                            className="row flex flex-col md:flex-row justify-between border border-base-200 rounded-2xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20"
                                        >
                                            <div className="user flex flex-col sm:flex-row gap-4">
                                                <div className="user-avatar pt-1.25">
                                                    <div className="bg-primary/10 rounded-full p-1 border border-primary/20">
                                                        <img
                                                            src=""
                                                            width={50}
                                                            height={50}
                                                            className="rounded-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="user-info">
                                                    <h3 className="text-lg font-medium text-primary-focus">
                                                        {
                                                            totalStudents?.find(
                                                                (s) =>
                                                                    s.id ===
                                                                    lesson.student_id
                                                            )?.full_name
                                                        }
                                                    </h3>
                                                    <p className="text-base-content/80 font-medium">
                                                        {lesson.lesson_name}
                                                    </p>
                                                    <p className="flex flex-wrap mt-2.5 gap-3 text-base-content/60">
                                                        <span className="flex items-center gap-2 bg-base-200/50 px-2 py-1 rounded-lg">
                                                            <Calendar
                                                                size={16}
                                                                className="text-primary"
                                                            />
                                                            {
                                                                lesson.scheduled_date
                                                            }
                                                        </span>
                                                        <span className="flex items-center gap-2 bg-base-200/50 px-2 py-1 rounded-lg">
                                                            <Clock4
                                                                size={16}
                                                                className="text-secondary"
                                                            />
                                                            {
                                                                lesson.time.split(
                                                                    "+"
                                                                )[0]
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p className="mt-3 text-md font-medium">
                                    No Upcoming Lessons for the next 7 days
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}