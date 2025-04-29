import cityroad from "../../../assets/city-road.jpg"
import cityroad_car from "../../../assets/city-road-car.jpg"
import cityroad_2 from "../../../assets/city-road-2.jpg"
import cityroad_trafficlight from "../../../assets/city-road-traffic-light.jpg"
import { ArrowRight } from "lucide-react"
import "../../../App.css"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <>
      <section className="container mx-auto px-4 pt-18 md:pt-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Smart. Safe. Driven.</h1>
          <p className="text-base md:text-lg mb-8">We make it easy for you to get your driver's license</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-started" className="btn btn-primary rounded-full py-5.5 px-6">
              Book a Lesson <ArrowRight className="ml-1" size={18} />
            </Link>
            <Link to="/about-us" className="btn btn-default rounded-full py-5.5 px-6">
              About Us
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-12">
          <div className="bg-blue-100 rounded-3xl md:rounded-4xl aspect-[4/5] relative overflow-hidden">
            <div className="absolute h-full w-full">
              <img
                src={cityroad || "/placeholder.svg"}
                alt="Road sign and car"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-orange-100 rounded-3xl md:rounded-4xl aspect-[4/5] relative overflow-hidden">
            <div className="absolute h-full w-full">
              <img src={cityroad_car || "/placeholder.svg"} alt="Sports car" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-teal-100 rounded-3xl md:rounded-4xl aspect-[4/5] relative overflow-hidden">
            <div className="absolute h-full w-full">
              <img src={cityroad_2 || "/placeholder.svg"} alt="Traffic cone" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-red-100 rounded-3xl md:rounded-4xl aspect-[4/5] relative overflow-hidden">
            <div className="absolute h-full w-full">
              <img
                src={cityroad_trafficlight || "/placeholder.svg"}
                alt="Traffic light"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
