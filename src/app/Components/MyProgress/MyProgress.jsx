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
            <div id="my-progress-container">
                <h1 className='text-2xl mt-10 font-semibold'>My Progress</h1>
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