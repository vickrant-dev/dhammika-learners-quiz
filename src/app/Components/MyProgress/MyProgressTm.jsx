import { supabase } from '@/app/utils/supabase';
import AccordionTm from './ModuleAccordionTm';
import { useEffect } from 'react';

export default function MyProgressTm() {

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
                <h1 className='text-2xl mt-10 font-semibold'>எனது முன்னேற்றம்</h1>
                <p className='mt-1.75 text-sm text-neutral-500'>ஒவ்வொரு தொகுதி வழியாகவும் உங்கள் கற்றல் பயணத்தைக் கண்காணிக்கவும்</p>
                <div className="module-container">
                    <div className="module">
                        <AccordionTm/>
                    </div>
                </div>
            </div>
        </>
    )

}