import { ChevronLeft, ChevronRight } from "lucide-react"
import "../../../App.css"

export default function Testimonials() {
  return (
    <>
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="badge badge-md badge-primary flex items-center justify-center m-auto font-semibold rounded-full text-primary-content">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-5 mb-4 text-center">We care about our applicant</h2>
          <p className="text-center mb-8 md:mb-12">Don't believe us? Hear what they have to say</p>

          <div className="max-w-3xl mx-auto bg-primary-content rounded-xl p-4 md:p-8">
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 md:w-5 md:h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-xl md:text-3xl leading-8 md:leading-10 text-center italic mb-6">
              "Explained in great detail and the facilities provided are very comfortable"
            </p>
            <div className="flex flex-col items-center">
              <p className="font-medium text-base-content/75">Paul - Driver License Learner</p>
              <div className="avatar mt-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full">
                  <img
                    src="/placeholder.svg"
                    alt="Testimonial Avatar"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 gap-2">
              <button className="btn btn-circle btn-sm btn-ghost">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="btn btn-circle btn-sm btn-ghost">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
