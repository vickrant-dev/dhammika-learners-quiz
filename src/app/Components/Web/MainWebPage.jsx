import WNavbar from "./Web-components/WNavbar"
import Hero from "./Web-components/Hero"
import WhyUs from "./Web-components/WhyUs"
import OurCourses from "./Web-components/OurCourses"
import Testimonials from "./Web-components/Testimonials"
import CTA from "./Web-components/CTA"
import Footer from "./Web-components/Footer"
import LicenseProcess from "./Web-components/License-procedure"

export default function MainWebPage() {

    return (
        <>
            <div className="main-container min-h-screen flex flex-col" data-theme="light">
                <div id="navbar">
                    <WNavbar />
                </div>
                <div id="body" className="px-0 pt-25">
                    <Hero />
                    <WhyUs />
                    <LicenseProcess />
                    <OurCourses />
                    <Testimonials />
                    <CTA />
                    <Footer />
                </div>
            </div>
        </>
    )

}