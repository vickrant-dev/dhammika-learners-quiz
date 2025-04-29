import Accordion from './ModuleAccordion';

export default function MyProgress() {

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