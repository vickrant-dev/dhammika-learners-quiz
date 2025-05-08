"use client";

import Link from "next/link";
import logo from "../../../assets/logo.png";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function WNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className="fixed w-full z-50 bg-base-100/40 backdrop-blur-md shadow-sm/7">
                <div className="container mx-auto px-4 py-6">
                    <nav className="w-full ">
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full">
                            {/* Logo - Left */}
                            <div className="flex items-center">
                                <Image
                                    src={logo || "/placeholder.svg"}
                                    alt="Driving School Logo"
                                    width={120}
                                    height={48}
                                    className="h-12 w-auto"
                                />
                            </div>

                            {/* Navigation Links - Center */}
                            <div className="hidden lg:flex items-center justify-center">
                                <ul className="flex items-center space-x-5">
                                    <li>
                                        <Link
                                            href="/"
                                            className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-xl py-2 font-medium"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/services"
                                            className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-xl py-2 font-medium"
                                        >
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/driver-registration"
                                            className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-xl py-2 font-medium"
                                        >
                                            The Process
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/traffic-services"
                                            className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-xl py-2 font-medium"
                                        >
                                            Pricing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about-us"
                                            className="px-3 hover:bg-primary-content/55 active:bg-primary-content rounded-xl py-2 font-medium"
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Buttons - Right */}
                            <div className="hidden lg:flex items-center justify-end space-x-4">
                                <Link
                                    href="/student/login"
                                    className="btn btn-default rounded-full px-5"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/student/signup"
                                    className="btn btn-primary rounded-full px-5 flex items-center"
                                >
                                    Signup{" "}
                                </Link>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="lg:hidden flex items-center justify-end col-span-2">
                                <Link
                                    href="/student/login"
                                    className="btn btn-default rounded-full px-4 mr-2 text-sm"
                                >
                                    Login
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-2 rounded-md focus:outline-none"
                                >
                                    {isMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                            <div className="lg:hidden mt-4 py-4 border-t">
                                <ul className="flex flex-col space-y-4">
                                    <li>
                                        <Link
                                            href="/"
                                            className="block px-3 py-2 hover:bg-primary-content/55 active:bg-primary-content rounded-xl font-medium"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/services"
                                            className="block px-3 py-2 hover:bg-primary-content/55 active:bg-primary-content rounded-xl font-medium"
                                        >
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/driver-registration"
                                            className="block px-3 py-2 hover:bg-primary-content/55 active:bg-primary-content rounded-xl font-medium"
                                        >
                                            The Process
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/traffic-services"
                                            className="block px-3 py-2 hover:bg-primary-content/55 active:bg-primary-content rounded-xl font-medium"
                                        >
                                            Pricing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about-us"
                                            className="block px-3 py-2 hover:bg-primary-content/55 active:bg-primary-content rounded-xl font-medium"
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                                <div className="mt-4">
                                    <Link
                                        href="/student/signup"
                                        className="btn btn-primary rounded-full px-5 flex items-center justify-center w-full"
                                    >
                                        Signup{" "}
                                        <ArrowRight
                                            className="ml-1"
                                            size={18}
                                        />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </nav>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden fixed top-0 right-0 w-64 h-screen bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="px-4 py-6 bg-base-100">
                        <div className="flex justify-end items-center mb-6">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-md focus:outline-none"
                            >
                                <X className="h-6 w-6 transform -translate-y-1" />
                            </button>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/services", label: "Services" },
                                {
                                    href: "/driver-registration",
                                    label: "The Process",
                                },
                                { href: "/traffic-services", label: "Pricing" },
                                { href: "/about-us", label: "About Us" },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="block px-3 py-2 rounded-md hover:bg-primary-content/55"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Overlay */}
                {isMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 z-40"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </header>
        </>
    );
}
