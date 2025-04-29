import { Link } from "react-router-dom"
import "../../../App.css"
import logo from "../../../assets/logo.png"

export default function Footer() {
  return (
    <>
      <footer className="mx-4 md:mx-12 text-base-content">
        <div className="container mx-auto px-0 pt-12">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="md:max-w-xs">
              <img src={logo || "/placeholder.svg"} alt="Logo" width={100} height={30} className="mb-4" />
              <p className="text-sm text-base-content/75">Your Companion To Better Driving Experience</p>
            </div>
            <div id="links" className="flex flex-wrap md:flex-nowrap justify-between md:justify-end gap-8 md:gap-20">
              <div>
                <h3 className="font-bold mb-4">Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-sm text-base-content/75 hover:text-base-content">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="text-sm text-base-content/75 hover:text-base-content">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="text-sm text-base-content/75 hover:text-base-content">
                      The Process
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="text-sm text-base-content/75 hover:text-base-content">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className="text-sm text-base-content/75 hover:text-base-content">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/contact-us" className="text-sm text-base-content/75 hover:text-base-content">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <p className="text-sm text-base-content/75">+1 234 567 890</p>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col md:flex-row justify-between items-center py-4 pb-10">
            <p className="text-sm text-base-content/75">© 2025 Dhammika Driving School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
