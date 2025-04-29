'use client'
import { ArrowUp, Calendar, CheckCircle2, CircleAlert, Clock4, MapPin, Plus, UserRound, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    
                console.log('successfully inserted data to student_module_assignments db');                
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

    return (
        <>
            <div id="admin-container">
                <div id="admin-body" className="pl-[282px] pt-[2rem] mr-10">
                    <div className="title">
                        <h1 className="text-3xl font-semibold mb-7 text-primary-focus">
                            Dashboard
                        </h1>
                    </div>
                    <div className="dashboard-stats">
                        <div className="stats-container flex gap-5">
                            <div className="stats shadow-lg/8 rounded-xl border border-base-300 w-[275px] bg-gradient-to-br from-base-100 to-base-200 transition-all duration-300 hover:shadow-xl/8 cursor-pointer">
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
                                        { loading ? (
                                            <>
                                                <span className="loading loading-spinner loading-lg"></span>
                                            </>
                                        ) : (
                                            <>
                                                {totalStudents ? totalStudents.length : 0}
                                            </>
                                        )}
                                    </div>
                                    <div className="stat-desc flex items-center gap-1 mt-1 text-success">
                                        <span className="flex items-center text-success font-medium">
                                            <ArrowUp
                                                size={18}
                                                className="mr-1"
                                            />{" "}
                                            21%
                                        </span>{" "}
                                        more than last month
                                    </div>
                                </div>
                            </div>
                            <div className="stats shadow-lg/8 rounded-xl border border-base-300 w-[275px] bg-gradient-to-br from-base-100 to-base-200 transition-all duration-300 hover:shadow-xl/8 cursor-pointer">
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
                                        { loading ? (
                                            <>
                                                <span className="loading loading-spinner loading-lg"></span>
                                            </>
                                        ) : (
                                            <>
                                                {scheduledLessons ? scheduledLessons.length : '0'}
                                            </>
                                        )}
                                    </div>
                                    <div className="stat-desc mt-1 text-base-content/60">
                                        For the next 7 days
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="upcoming-lessons my-10 border border-base-300 p-6 rounded-2xl shadow-lg bg-base-100">
                        <div className="header flex justify-between">
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
                                    <div className="max-h-[90%] modal-box rounded-2xl">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                <XIcon size={17} />
                                            </button>
                                        </form>
                                        <h3 className="font-bold text-lg">
                                            Schedule New Lesson
                                        </h3>
                                        <p className="py-1 text-base-content/70">
                                            Fill out the form below to schedule
                                            a new driving lesson.
                                        </p>
                                        <div
                                            id="form-options"
                                            className="flex flex-col space-y-2 mt-7"
                                        >
                                            <fieldset className="w-full fieldset">
                                                <legend className="fieldset-legend text-sm">
                                                    Student
                                                </legend>
                                                <select name='student_id' onChange={handleAddNewScheduleChange} value={newScheduleForm.student_id} className="w-full select border border-base-300 rounded-lg">
                                                    <option value="default">
                                                        Select a student
                                                    </option>
                                                    {totalStudents ? totalStudents.map((tSTD) => (
                                                        <option key={tSTD.id} value={tSTD.id}>
                                                            {tSTD.full_name}
                                                        </option>
                                                    )): ''}
                                                </select>
                                            </fieldset>
                                            <fieldset className="w-full fieldset">
                                                <legend className="fieldset-legend text-sm">
                                                    Lesson
                                                </legend>
                                                <input
                                                    type="text"
                                                    name='lesson_name' 
                                                    onChange={handleAddNewScheduleChange} 
                                                    value={newScheduleForm.lesson_name}
                                                    className="w-full py-2.5 px-4 border border-base-300 rounded-lg"
                                                />
                                            </fieldset>
                                            <div className="date-time flex justify-between gap-3">
                                                <fieldset className="w-full fieldset">
                                                    <legend className="fieldset-legend text-sm">
                                                        Date
                                                    </legend>
                                                    <input
                                                        type="date"
                                                        name='scheduled_date'
                                                        onChange={handleAddNewScheduleChange} 
                                                        value={newScheduleForm.scheduled_date}
                                                        className="w-full py-2.5 px-4 border border-base-300 rounded-lg"
                                                    />
                                                </fieldset>
                                                <fieldset className="w-full fieldset">
                                                    <legend className="fieldset-legend text-sm">
                                                        Time
                                                    </legend>
                                                    <input
                                                        type="time"
                                                        name='time' 
                                                        onChange={handleAddNewScheduleChange} 
                                                        value={newScheduleForm.time}
                                                        style={{
                                                            appearance: "none",
                                                            WebkitAppearance:
                                                                "none",
                                                            MozAppearance:
                                                                "none",
                                                        }}
                                                        className="w-full py-2.5 px-4 border border-base-300 rounded-lg"
                                                    />
                                                </fieldset>
                                            </div>
                                            <fieldset className="w-full fieldset">
                                                <legend className="fieldset-legend text-sm">
                                                    Notes
                                                </legend>
                                                <textarea
                                                    className="w-full border border-base-300 rounded-lg textarea"
                                                    name='notes' 
                                                    onChange={handleAddNewScheduleChange} 
                                                    value={newScheduleForm.notes}
                                                    placeholder="Add any notes about this lesson"
                                                ></textarea>
                                            </fieldset>
                                        </div>
                                        <div className="user-alert-sec">
                                            <div className="student-exists-err">
                                                {alert.studentExists ? (
                                                    <div className='my-3 flex items-center'>
                                                        <CircleAlert size={18} className='text-red-500 mr-2'/> 
                                                        <p className='text-red-500 text-sm'>There is already a pending lesson for this student</p>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                                {alert.errorInserting ? (
                                                    <div className='my-3 flex items-center'>
                                                        <CircleAlert size={18} className='text-red-500 mr-2'/> 
                                                        <p className='text-red-500 text-sm'>Error inserting data to database</p>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                                {alert.formNotFilled ? (
                                                    <div className='my-3 flex items-center'>
                                                        <CircleAlert size={18} className='text-red-500 mr-2'/> 
                                                        <p className='text-red-500 text-sm'>Please fill in the form</p>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                                {success.lessonAdded ? (
                                                    <div className='my-3 flex items-center'>
                                                        <CheckCircle2 size={18} className='text-green-500 mr-2'/> 
                                                        <p className='text-green-500 text-sm'>Successfully added a new lesson</p>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-5 close-add-div flex items-center justify-end gap-3">
                                            <form method="dialog">
                                                <button onClick={handleCloseNewSchedule} className="border-2 btn btn-default rounded-lg">
                                                    Close
                                                </button>
                                            </form>
                                            <button onClick={handleAddNewSchedule} className="border-2 btn btn-primary rounded-lg">
                                                Add Schedule
                                            </button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                        <div className="lessons-table flex flex-col gap-6 pt-7">
                            {scheduledLessons?.slice(0, 7).sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date)).filter((scheduledLesson) => scheduledLesson.status === 'scheduled').map((scheduledLesson) => (
                                <div className="row flex justify-between border border-base-200 rounded-2xl p-5 bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                                    <div className="left">
                                        <div className="user flex gap-4">
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
                                                    { totalStudents ? totalStudents.map((totalStd) => (
                                                        totalStd.id === scheduledLesson.student_id ? totalStd.full_name : ''
                                                    )) :(
                                                        ''
                                                    ) }
                                                </h3>
                                                <p className="text-base-content/80 font-medium">
                                                    {scheduledLesson.lesson_name}
                                                </p>
                                                <p className="flex flex-wrap mt-2.5 gap-3 text-base-content/60">
                                                    <span className="flex items-center gap-2 bg-base-200/50 px-2 py-1 rounded-lg">
                                                        <Calendar
                                                            size={16}
                                                            className="text-primary"
                                                        />
                                                        {scheduledLesson.scheduled_date}
                                                    </span>
                                                    <span className="flex items-center gap-2 bg-base-200/50 px-2 py-1 rounded-lg">
                                                        <Clock4
                                                            size={16}
                                                            className="text-secondary"
                                                        />
                                                        {scheduledLesson.time.split('+')[0]}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}