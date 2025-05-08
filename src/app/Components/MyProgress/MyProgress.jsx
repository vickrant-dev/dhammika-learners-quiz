import { CheckCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from "@/app/utils/supabase";
import Accordion from './ModuleAccordion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyProgress() {

    const router = useRouter();

    const fetchUser = async () => {
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
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <div id="my-progress-container" className='pl-[1.75rem] lg:pl-[2.25rem] md:pl-[2.25rem] sm:pl-[2.25rem] pr-4 lg:pr-8 sm:pr-6'>
                <h1 className='text-2xl font-semibold'>My Progress</h1>
                <p className='mt-1.75 text-sm text-neutral-500'>Track your learning journey through each module</p>
                <div className="module-container">
                    <div className="module">
                        <Accordion/>
                    </div>
                </div>
            </div>
        </>
    )

}