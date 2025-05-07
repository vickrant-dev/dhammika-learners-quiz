import { ArrowRight, Star } from "lucide-react"

export default function WhyUs() {
  return (
    <>
      <section className="container max-w-full py-12 md:py-16 bg-secondary-content/80 mt-12 md:mt-20">
        <div className="text-center mb-8 md:mb-12 px-4">
          <div className="badge badge-secondary rounded-full font-semibold text-secondary-content badge-md">
            SERVICES
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-5 mb-3">Your Complete Solution, Simplified</h2>
          <p className="text-base md:text-lg">All-in-one simplicity for your requirements.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4 md:px-8">
          <div className="experienced m-auto p-4 md:p-7 rounded-2xl flex flex-col md:flex-row items-center justify-between bg-base-100 max-w-[650px] w-full">
            <div className="left md:mr-8 lg:mr-18 mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <div className="title">
                <h4 className="text-xl md:text-2xl font-medium mb-2 text-center md:text-left">28 years experienced</h4>
              </div>
              <div className="description mb-4 md:mb-6">
                <p className="leading-6.5 sm:text-sm md:text-md text-md text-center md:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste rem assumenda dolor eligendi rerum
                  architecto. Minus voluptate aperiam excepturi cupiditate!
                </p>
              </div>
              <div className="review-btn">
                <button className="gap-2 rounded-full py-3 md:py-5.5 px-4 md:px-6 flex btn btn-secondary text-secondary-content">
                  See our Reviews <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <div className="right flex flex-col items-center justify-center bg-secondary-content/75 p-4 md:p-5 rounded-xl">
              <div className="rating-no">
                <p className="text-2xl md:text-3xl font-semibold">4.9</p>
              </div>
              <div className="mt-1 mb-2 rating-stars flex items-center ">
                <Star fill="#facc15" className="text-yellow-500" size={18} />
                <Star fill="#facc15" className="text-yellow-500" size={18} />
                <Star fill="#facc15" className="text-yellow-500" size={18} />
                <Star fill="#facc15" className="text-yellow-500" size={18} />
                <Star className="text-yellow-500" size={18} />
              </div>
              <div className="rating-desc">
                <p className="text-sm font-medium">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
