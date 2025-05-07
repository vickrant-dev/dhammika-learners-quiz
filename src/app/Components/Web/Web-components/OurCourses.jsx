import { Check, ChevronRight } from "lucide-react"

export default function OurCourses() {
  return (
    <>
      <div id="our-courses" className="px-4 md:px-12 relative py-12 md:py-16 bg-secondary-content/80">
        <div className="flex items-center justify-center m-auto mb-5 text-center badge badge-md badge-secondary rounded-full font-semibold text-secondary-content">
          PRICING
        </div>
        <div id="heading">
          <h2 className="text-center text-2xl md:text-4xl font-bold text-base-content pb-2">Our Courses</h2>
        </div>
        <div id="description">
          <p className="text-center text-base-content/85 m-auto max-w-[600px]">
            Tailored driving courses to meet your needs and experience level.
          </p>
        </div>
        <div className="cards z-9 flex flex-col lg:flex-row justify-between gap-6 mt-8 md:mt-14">
          {/* Basic Plan */}
          <div className="card z-9 w-full md:max-w-md md:mx-auto lg:mx-0 bg-base-100 border border-base-300 shadow-md/7 p-4 sm:p-6 rounded-2xl">
            <div id="badge" className="pb-4">
              <div className="badge badge-sm badge-success text-base-100 font-medium rounded-xl">Economy</div>
            </div>
            <div className="card-title">
              <h4 className="text-2xl md:text-3xl font-semibold">Basic Plan</h4>
            </div>
            <div className="divider"></div>
            <div className="card-lists flex flex-col gap-5">
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
            </div>
            <div className="divider divider-primary/25"></div>
            <div className="pricing flex flex-col space-y-5">
              <div className="price">
                <p className="text-xl font-semibold">
                  LKR 35,000 <span className="text-sm pl-1.5 font-normal">one time payment</span>
                </p>
              </div>
              <div className="button">
                <button className="btn btn-default py-3 sm:py-5.5 rounded-lg w-full">
                  Start Now <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="card z-9 w-full md:max-w-md md:mx-auto lg:mx-0 border border-base-300 bg-base-content text-base-100 shadow-md/7 p-4 sm:p-6 rounded-2xl">
            <div id="badge" className="pb-4">
              <div className="badge badge-sm badge-primary font-medium rounded-xl">Most Popular</div>
            </div>
            <div className="card-title">
              <h4 className="text-2xl md:text-3xl font-semibold">Pro Plan</h4>
            </div>
            <div className="divider invert"></div>
            <div className="card-lists grid grid-cols-1 sm:grid-cols-2 gap-5">
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="invisible flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p></p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="invisible flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p></p>
              </li>
            </div>
            <div className="divider invert"></div>
            <div className="pricing flex flex-col space-y-5">
              <div className="price">
                <p className="text-xl font-semibold">
                  LKR 65,000 <span className="text-sm pl-1.5 font-normal">one time payment</span>
                </p>
              </div>
              <div className="button">
                <button className="btn btn-default py-3 sm:py-5.5 rounded-lg w-full">
                  Start Now <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="card z-9 w-full md:max-w-md md:mx-auto lg:mx-0 bg-base-100 border border-base-300 shadow-md/7 p-4 sm:p-6 rounded-2xl">
            <div id="badge" className="pb-4">
              <div className="badge badge-sm bg-red-500 text-base-100 font-medium rounded-xl">Ultimate Training</div>
            </div>
            <div className="card-title">
              <h4 className="text-2xl md:text-3xl font-semibold">Premium Plan</h4>
            </div>
            <div className="divider"></div>
            <div className="card-lists grid grid-cols-1 sm:grid-cols-2 gap-5">
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
              <li className="flex items-center content-center gap-3">
                <i>
                  <Check size={18} />
                </i>
                <p>Feature 1</p>
              </li>
            </div>
            <div className="divider divider-primary/25"></div>
            <div className="pricing flex flex-col space-y-5">
              <div className="price">
                <p className="text-xl font-semibold">
                  LKR 97,000 <span className="text-sm pl-1.5 font-normal">one time payment</span>
                </p>
              </div>
              <div className="button">
                <button className="btn btn-default py-3 sm:py-5.5 rounded-lg w-full">
                  Start Now <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
