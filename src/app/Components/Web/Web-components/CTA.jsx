import { ChevronRight } from "lucide-react"

export default function CTA() {
  return (
    <>
      <div className="cta-container flex flex-col items-center justify-center pt-12 md:pt-20 pb-16 md:pb-30 px-4">
        <div className="cta-heading z-1">
          <h2 className="text-center text-3xl md:text-4xl font-semibold text-base-content pb-4">
            Ready to Get Started?
          </h2>
        </div>
        <div className="cta-description z-1">
          <p className="text-center text-base-content/85 m-auto max-w-[600px]">
            Book your first lesson today and take the first step towards driving independence.
          </p>
        </div>
        <div className="cta-btn mt-6 md:mt-8 mb-4 md:mb-5 z-1">
          <button className="btn btn-primary py-5.5 rounded-full">
            Book a Lesson{" "}
            <i>
              <ChevronRight size={18} />
            </i>
          </button>
        </div>
        <div className="cta-terms z-1">
          <p className="text-sm text-base-content/75">No obligation, cancel anytime.</p>
        </div>
      </div>
    </>
  )
}
