import '../../App.css';
import AccordionSm from './ModuleAccordionSm';

export default function MyProgressSm() {

    return (
        <>
            <div id="my-progress-container">
                <h1 className='text-2xl mt-10 font-semibold'>මගේ ප්‍රගතිය</h1>
                <p className='mt-1.75 text-sm text-neutral-500'>එක් එක් මොඩියුලය හරහා ඔබේ ඉගෙනුම් ගමන නිරීක්ෂණය කරන්න</p>
                <div className="module-container">
                    <div className="module">
                        <AccordionSm/>
                    </div>
                </div>
            </div>
        </>
    )

}