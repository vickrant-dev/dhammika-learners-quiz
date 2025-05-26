"use client";

import { Home, GraduationCap, Lightbulb, Menu, X, LogOut } from "lucide-react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [studentData, setStudentData] = useState({
        full_name: "",
        role: ""
    })

    // Check if we're on mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebar = document.getElementById("sidebar-container");
            const toggleButton = document.getElementById("sidebar-toggle");

            if (
                isMobile &&
                isSidebarOpen &&
                sidebar &&
                !sidebar.contains(event.target) &&
                toggleButton &&
                !toggleButton.contains(event.target)
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile, isSidebarOpen]);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [pathname, isMobile]);

    // Get current language prefix and path
    const getCurrentLanguageInfo = () => {
        if (pathname.startsWith("/dashboard/tm")) {
            return {
                prefix: "/dashboard/tm",
                path: pathname.substring("/dashboard/tm".length),
            };
        } else if (pathname.startsWith("/dashboard/sm")) {
            return {
                prefix: "/dashboard/sm",
                path: pathname.substring("/dashboard/sm".length),
            };
        } else if (pathname.startsWith("/dashboard")) {
            return {
                prefix: "/dashboard",
                path: pathname.substring("/dashboard".length),
            };
        } else {
            return { prefix: "/dashboard", path: "" };
        }
    };

    const { prefix: currentPrefix, path: currentPath } =
        getCurrentLanguageInfo();

    const menuItems = [
        {
            icon: <Lightbulb size={24} />,
            label: "Quiz Center",
            link: `${currentPrefix}/quizCenter`,
        },
    ];

    const switchLanguage = (newPrefix) => {
        router.push(`${newPrefix}${currentPath}`);
    };

    const isMenuItemActive = (itemLink) => {
        return pathname === itemLink || pathname.startsWith(itemLink);
    };

    const isLanguageActive = (prefix) => {
        if (prefix === "/dashboard") {
            return (
                pathname === "/dashboard" ||
                (pathname.startsWith("/dashboard/") &&
                    !pathname.startsWith("/dashboard/tm") &&
                    !pathname.startsWith("/dashboard/sm"))
            );
        } else {
            return pathname === prefix || pathname.startsWith(`${prefix}/`);
        }
    };

    // Toggle sidebar for mobile
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // const fetchUser = async () => {
    //     const {
    //         data: { user },
    //     } = await supabase.auth.getUser();

    //     // Retrieve student_id_inherited from reg users
    //     const { data: stdReg, error: stdRegErr } = await supabase
    //         .from("registered_users")
    //         .select("student_id_inherited")
    //         .eq("auth_student_id", user.id)

    //     if (stdRegErr) {
    //         console.log("Error getting student data: ", stdRegErr.message);
    //         return;
    //     }

    //     const { data: stdData, error:stdDataErr } = await supabase
    //         .from("students")
    //         .select("*")
    //         .eq("id", stdReg[0].student_id_inherited)

    //     if(stdDataErr) {
    //         console.log("Error getting std data:", stdDataErr.message);
    //         return;
    //     }
    //     console.log("std darta:", stdData);
    //     setStudentData((prev) => ({
    //         ...prev,
    //         full_name: stdData[0].full_name,
    //         role: stdData[0].role
    //     }));

    // };

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                id="sidebar-toggle"
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-content rounded-lg shadow-lg"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                id="sidebar-container"
                className={`
                    flex flex-col pt-[1.5rem] pl-[1rem] pr-[1rem] pb-[1.5rem]
                    bg-base-100 text-base-content shadow-lg/10
                    overflow-y-auto scrollbar-thin border-r border-base-300/0
                    transition-all duration-300 ease-in-out z-40
                    ${isMobile ? "fixed h-full" : "fixed lg:relative h-[100vh]"}
                    ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
                    ${isMobile ? "w-[85%] sm:w-[320px]" : "w-[282px]"}
                `}
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#1c2737 transparent",
                }}
            >
                {/* Sidebar Menu */}
                <div
                    id="sidebar-lists"
                    className="flex flex-col gap-10 flex-grow"
                >
                    <div id="main-menu">
                        <div className="flex justify-between items-center pb-10">
                            <Image
                                src={logo || "/placeholder.svg"}
                                alt="logo"
                                width={110}
                                height={110}
                                className={`${isMobile ? "pl-0 pt-[4.2rem]" : "pl-3.25 pt-0"}`}
                            />
                        </div>
                        <ul className="flex flex-col gap-4">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`select-none group flex items-center gap-3 rounded-xl py-3.25 pl-3.25 
                                    cursor-pointer transition-all duration-150 ease-out
                                    ${
                                        isMenuItemActive(item.link)
                                            ? "bg-primary text-primary-content"
                                            : "hover:bg-primary hover:text-primary-content"
                                    }`}
                                    onClick={() => router.push(item.link)}
                                >
                                    <div id="icon">{item.icon}</div>
                                    <p>{item.label}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Language Selector */}
                <div id="language-menu" className="mt-auto mb-4">
                    <h4 className="select-none text-md text-primary font-semibold pb-5 pl-3.25">
                        Choose your language
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                        {[
                            { label: "English", prefix: "/dashboard" },
                            { label: "தமிழ்", prefix: "/dashboard/tm" },
                            { label: "සිංහල", prefix: "/dashboard/sm" },
                        ].map((item, index) => (
                            <li
                                key={index}
                                className={`select-none group flex items-center justify-center gap-2 rounded-xl py-3.25 px-3.5 w-full text-center
                                cursor-pointer transition-all duration-150 ease-out
                                ${
                                    isLanguageActive(item.prefix)
                                        ? "bg-neutral text-neutral-content"
                                        : "hover:bg-neutral hover:text-neutral-content"
                                }`}
                                onClick={() => switchLanguage(item.prefix)}
                            >
                                <p>{item.label}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-white/50 filter backdrop-blur-xs z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
}
