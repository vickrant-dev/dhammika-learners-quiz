import { Link } from "react-router-dom"
import "../../../App.css"
import logo from "../../../assets/logo.png"
import Image from 'next/image';
import { ArrowRight, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function WNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed w-full z-50 bg-base-100/40 backdrop-blur-md shadow-sm/7">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src={logo || "/placeholder.svg"} alt="Driving School Logo" className="h-12 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <ul className="flex items-center space-x-6">
                <li>
                  <Link
                    to="/"
                    className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-lg py-2 font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-lg py-2 font-medium"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/driver-registration"
                    className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-lg py-2 font-medium"
                  >
                    The Process
                  </Link>
                </li>
                <li>
                  <Link
                    to="/traffic-services"
                    className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-lg py-2 font-medium"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-lg py-2 font-medium"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn btn-default rounded-full px-5">
                  Login
                </Link>
                <Link to="/get-started" className="btn btn-primary rounded-full px-5">
                  Book a Lesson <ArrowRight className="ml-1" size={18} />
                </Link>
              </div>
            </div>

            {/* Mobile Navigation Button */}
            <div className="lg:hidden flex items-center">
              <Link to="/login" className="btn btn-default rounded-full px-4 mr-2 text-sm">
                Login
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Right Side with Animation */}
        <div
          className={`lg:hidden fixed top-0 right-0 w-64 h-screen bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-4 py-6 bg-base-100">
            <div className="flex justify-end items-center mb-6">
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-md focus:outline-none">
                <X className="h-6 w-6 transform -translate-y-1" />
              </button>
            </div>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md hover:bg-primary-content/55"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block px-3 py-2 rounded-md hover:bg-primary-content/55"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/driver-registration"
                  className="block px-3 py-2 rounded-md hover:bg-primary-content/55"
                  onClick={() => setIsMenuOpen(false)}
                >
                  The Process
                </Link>
              </li>
              <li>
                <Link
                  to="/traffic-services"
                  className="block px-3 py-2 rounded-md hover:bg-primary-content/55"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="block px-3 py-2 rounded-md hover:bg-primary-content/55"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Overlay when menu is open */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
        )}
      </header>
    </>
  )
}
