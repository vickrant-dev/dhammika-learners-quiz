'use client';

import {
    Home,
    GraduationCap,
    Lightbulb,
} from "lucide-react";
import logo from "../assets/logo.png";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    // Get current language prefix and path
    const getCurrentLanguageInfo = () => {
        if (pathname.startsWith('/dashboard/tm')) {
            return { prefix: '/dashboard/tm', path: pathname.substring('/dashboard/tm'.length) };
        } else if (pathname.startsWith('/dashboard/sm')) {
            return { prefix: '/dashboard/sm', path: pathname.substring('/dashboard/sm'.length) };
        } else if (pathname.startsWith('/dashboard')) {
            return { prefix: '/dashboard', path: pathname.substring('/dashboard'.length) };
        } else {
            return { prefix: '/dashboard', path: '' };
        }
    };

    const { prefix: currentPrefix, path: currentPath } = getCurrentLanguageInfo();

    const menuItems = [
        {
            icon: <Home size={24} />,
            label: "Dashboard",
            link: currentPrefix,
        },
        {
            icon: <GraduationCap size={24} />,
            label: "My Progress",
            link: `${currentPrefix}/my-progress`,
        },
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
        if (prefix === '/dashboard') {
            return pathname === '/dashboard' ||
                (pathname.startsWith('/dashboard/') &&
                    !pathname.startsWith('/dashboard/tm') &&
                    !pathname.startsWith('/dashboard/sm'));
        } else {
            return pathname === prefix || pathname.startsWith(`${prefix}/`);
        }
    };

    return (
        <div
            id="sidebar-container"
            className="flex flex-col fixed h-[100vh] w-[250px] pt-[1.5rem] pl-[1rem] pr-[1rem] pb-[1.5rem]
            bg-base-100 text-base-content shadow-lg/10
            overflow-y-auto scrollbar-thin border-r border-base-300/0"
            style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#1c2737 transparent",
            }}
        >
            {/* Sidebar Menu */}
            <div id="sidebar-lists" className="flex flex-col gap-10 flex-grow">
                <div id="main-menu">
                    <Image src={logo} alt="logo" width={110} height={110} className="pb-10 pl-3.25" />
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
            <div id="language-menu">
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
    );
}
