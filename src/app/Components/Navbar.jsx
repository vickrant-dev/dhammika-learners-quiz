import { Bell, CircleUserRound, LucideLogOut, Menu, Moon, Search, Settings, Settings2, UserRound } from 'lucide-react'
import '../App.css'
import { useState } from 'react';

export default function Navbar() {

    return (
        <>
            <div
                id="main-container"
                className="flex items-center justify-between py-5 border-b border-base-300"
            >
                <div className="left">
                    <div className="welcome-msg">
                        <h1 className='text-3xl font-semibold' >Welcome Back, <span>Vickrant</span></h1>
                    </div>
                </div>
                <div id="right" className='flex items-center'>
                    <div className="dropdown dropdown-end">
                        <div id="user" tabIndex={0} role="button" className='flex items-center cursor-pointer transition-all duration-150 ease-in-out hover:bg-primary-content/85 py-1.5 px-2.5 rounded-xl'
                        >
                            <div className="width-[50px] height-[50px] user-avatar rounded-3xl">
                                <CircleUserRound width={50} height={50} className='text-primary bg-primary-content/75 rounded-3xl'/>
                            </div>
                            <div id="user-info" className='flex flex-col ml-2.5' >
                                <p className='select-none text-md text-base-content font-semibold'>Vickrant</p>
                                <p className='select-none text-sm text-neutral'>Student</p>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-xl z-1 w-52 p-2 gap-1 shadow-sm/5 border border-base-300 mt-1">
                            <li><a className='rounded-lg'><Settings size={17} /> Settings</a></li>
                            <li><a className='text-red-500 bg-red-500/25 rounded-lg transition-all duration-150 ease-in-out hover:bg-red-500 hover:rounded-lg hover:text-red-200 ' ><LucideLogOut size={17} />Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );

}