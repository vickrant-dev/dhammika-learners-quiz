// "use client"

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { useRouter } from "next/navigation"

// import { Calendar, CircleUserRound, Home, LogOut, Menu, Users, X } from "lucide-react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import Image from "next/image"
// import { useEffect, useState } from "react"

// export default function AdminSidebar() {
//   const pathname = usePathname()
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)

//   // Check if we're on mobile
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 1024)
//     }

//     // Initial check
//     checkIfMobile()

//     // Add event listener for window resize
//     window.addEventListener("resize", checkIfMobile)

//     // Cleanup
//     return () => window.removeEventListener("resize", checkIfMobile)
//   }, [])

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const sidebar = document.getElementById("sidebar-container")
//       const toggleButton = document.getElementById("sidebar-toggle")

//       if (
//         isMobile &&
//         isSidebarOpen &&
//         sidebar &&
//         !sidebar.contains(event.target) &&
//         toggleButton &&
//         !toggleButton.contains(event.target)
//       ) {
//         setIsSidebarOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [isMobile, isSidebarOpen])

//   // Close sidebar when route changes on mobile
//   useEffect(() => {
//     if (isMobile) {
//       setIsSidebarOpen(false)
//     }
//   }, [pathname, isMobile])

//   const menuItems = [
//     {
//       icon: <Home size={24} />,
//       label: "Dashboard",
//       link: "/admin",
//     },
//     {
//       icon: <Users size={24} />,
//       label: "Students",
//       link: "/admin/students",
//     },
//     {
//       icon: <Calendar size={24} />,
//       label: "Schedule",
//       link: "/admin/schedule",
//     },
//   ]

//   const supabase = createClientComponentClient()
//   const router = useRouter()

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push("/login")
//   }

//   // Toggle sidebar for mobile
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen)
//   }

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         id="sidebar-toggle"
//         onClick={toggleSidebar}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-content rounded-lg shadow-lg"
//       >
//         {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         id="sidebar-container"
//         className={`
//                     flex flex-col h-screen pt-6 pl-4 pr-4 pb-6
//                     bg-base-100 text-base-content shadow-lg/10
//                     overflow-y-auto scrollbar-thin border-r border-base-300/0
//                     transition-all duration-300 ease-in-out z-40
//                     ${isMobile ? "fixed" : "fixed lg:relative"}
//                     ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
//                     ${isMobile ? "w-[85%] sm:w-[320px]" : "w-[250px]"}
//                 `}
//       >
//         {/* Sidebar Menu */}
//         <div className="flex flex-col gap-10 flex-grow justify-between">
//           <div id="main-menu">
//             <div className="flex justify-between items-center pb-10">
//               <Image
//                 src="/placeholder.svg?height=110&width=110"
//                 alt="logo"
//                 width={110}
//                 height={110}
//                 className="pl-3.25"
//               />
//               {isMobile && (
//                 <button onClick={toggleSidebar} className="lg:hidden p-1">
//                   <X size={24} />
//                 </button>
//               )}
//             </div>
//             <ul className="flex flex-col gap-4">
//               {menuItems.map((item, index) => (
//                 <li key={index}>
//                   <Link href={item.link}>
//                     <div
//                       className={`group flex items-center gap-3 rounded-xl py-3.25 pl-3.25
//                                             cursor-pointer transition-all duration-150 ease-out
//                                             ${
//                                               pathname === item.link
//                                                 ? "bg-primary text-primary-content"
//                                                 : "hover:bg-primary hover:text-primary-content"
//                                             }`}
//                     >
//                       <div>{item.icon}</div>
//                       <p>{item.label}</p>
//                     </div>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <ul className="dropdown dropdown-top admin-user flex items-center relative ">
//             <div
//               className="left-right-div flex items-center gap-3 border border-primary/0 hover:border-primary/15 hover:bg-primary-content transition duration-300 ease-in-out hover:text-primary p-3.25 rounded-2xl cursor-pointer w-full"
//               tabIndex={0}
//               role="button"
//             >
//               <div className="avatar">
//                 <CircleUserRound size={48} />
//               </div>
//               <div>
//                 <p className="text-md font-semibold">Dhammika</p>
//                 <span className="text-sm">Admin</span>
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="dropdown-content menu bg-base-100 rounded-xl z-10 w-52 p-2 shadow-sm border border-base-300"
//             >
//               <li onClick={handleLogout}>
//                 <a className="rounded-lg hover:bg-[#dc2626] hover:text-base-100">
//                   <LogOut size={18} /> Logout
//                 </a>
//               </li>
//             </ul>
//           </ul>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {isMobile && isSidebarOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)} />
//       )}
//     </>
//   )
// }
