import '../../App.css';
import AccordionTm from './ModuleAccordionTm';

export default function MyProgressTm() {

    return (
        <>
            <div id="my-progress-container">
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