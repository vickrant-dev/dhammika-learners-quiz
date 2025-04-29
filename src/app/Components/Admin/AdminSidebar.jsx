'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import {
    Calendar,
    CircleUserRound,
    Home,
    LogOut,
    Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from "../../assets/logo.png";

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            icon: <Home size={24} />,
            label: "Dashboard",
            link: "/admin",
        },
        {
            icon: <Users size={24} />,
            label: "Students",
            link: "/admin/students",
        },
        {
            icon: <Calendar size={24} />,
            label: "Schedule",
            link: "/admin/schedule",
        },
    ];

    const supabase = createClientComponentClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div
            id="sidebar-container"
            className="flex flex-col fixed h-screen w-[250px] pt-6 pl-4 pr-4 pb-6
                bg-base-100 text-base-content shadow-lg/10
                overflow-y-auto scrollbar-thin border-r border-base-300/0"
        >
            {/* Sidebar Menu */}
            <div className="flex flex-col gap-10 flex-grow justify-between">
                <div id="main-menu">
                    <Image
                        src={logo}
                        alt="logo"
                        width={110}
                        height={110}
                        className="pb-10 pl-3.25"
                    />
                    <ul className="flex flex-col gap-4">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link}>
                                    <div
                                        className={`group flex items-center gap-3 rounded-xl py-3.25 pl-3.25
                                        cursor-pointer transition-all duration-150 ease-out
                                        ${
                                            pathname === item.link
                                                ? "bg-primary text-primary-content"
                                                : "hover:bg-primary hover:text-primary-content"
                                        }`}
                                    >
                                        <div>{item.icon}</div>
                                        <p>{item.label}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul className="dropdown dropdown-top admin-user flex items-center relative ">
                    <div
                        className="left-right-div flex items-center gap-3 border border-primary/0 hover:border-primary/15 hover:bg-primary-content transition duration-300 ease-in-out hover:text-primary p-3.25 rounded-2xl cursor-pointer w-full"
                        tabIndex={0}
                        role="button"
                    >
                        <div className="avatar">
                            <CircleUserRound size={48} />
                        </div>
                        <div>
                            <p className="text-md font-semibold">Dhammika</p>
                            <span className="text-sm">Admin</span>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-xl z-10 w-52 p-2 shadow-sm border border-base-300"
                    >
                        <li onClick={handleLogout} >
                            <a className="rounded-lg hover:bg-[#dc2626] hover:text-base-100">
                                <LogOut size={18} /> Logout
                            </a>
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    );
}
