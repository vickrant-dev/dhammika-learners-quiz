"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import cityroad from "../../../assets/city-road.jpg";
import cityroad_car from "../../../assets/city-road-car.jpg";
import cityroad_2 from "../../../assets/city-road-2.jpg";
import cityroad_trafficlight from "../../../assets/city-road-traffic-light.jpg";

export default function Hero() {
    return (
        <section className="container mx-auto px-4 pt-18 md:pt-24">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Smart. Safe. Driven.
                </h1>
                <p className="text-base md:text-lg mb-8">
                    We make it easy for you to get your driver's license
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/get-started"
                        className="btn btn-primary rounded-full py-5.5 px-6 flex items-center"
                    >
                        Book a Lesson <ArrowRight className="ml-1" size={18} />
                    </Link>
                    <Link
                        href="/about-us"
                        className="btn btn-default rounded-full py-5.5 px-6"
                    >
                        About Us
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-12">
                {[
                    cityroad,
                    cityroad_car,
                    cityroad_2,
                    cityroad_trafficlight,
                ].map((image, index) => (
                    <div
                        key={index}
                        className={`rounded-3xl md:rounded-4xl aspect-[4/5] relative overflow-hidden ${
                            [
                                "bg-blue-100",
                                "bg-orange-100",
                                "bg-teal-100",
                                "bg-red-100",
                            ][index]
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`Hero image ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
