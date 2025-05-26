"use client"

import { useEffect, useState } from "react"

export default function DashboardLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false)

  // useEffect(() => {
  //   const checkIfMobile = () => {
  //     setIsMobile(window.innerWidth < 1024)
  //   }

  //   // Initial check
  //   checkIfMobile()

  //   // Add event listener for window resize
  //   window.addEventListener("resize", checkIfMobile)

  //   // Cleanup
  //   return () => window.removeEventListener("resize", checkIfMobile)
  // }, [])

  return (
    <div className="flex h-100 bg-base-200">
      <main className={`bg-white flex-1 transition-all duration-300 ${isMobile ? "pt-[1.25rem] pl-[3.25rem]" : "pl-[0] pt-10"}`}>
        {children}
      </main>
    </div>
  )
}
