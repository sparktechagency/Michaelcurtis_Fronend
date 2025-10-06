"use client";

import React from "react";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { InsuranceCard, Insurer } from "@/app/components/home/InsuranceCard";
import Link from "next/link";

const TopInsurance = () => {
    const insurers: Insurer[] = [
        {
            id: 1,
            name: "Liberty Mutual",
            logoUrl: "/logos/insurance.png",
            priceUSD: 450,
            rating: 4.8,
            profileHref: "#",
            claims: 4.5,
            service: 4.5,
            pricing: 4.5,
            coverage: 4.5,
            digitalTools: 4.5,
            grade: "A+"

        },
        {
            id: 2,
            name: "GEICO",
            logoUrl: "/logos/insurance.png",
            priceUSD: 420,
            rating: 4.6,
            profileHref: "#",
            claims: 4.2,
            service: 4.4,
            pricing: 4.7,
            coverage: 4.3,
            digitalTools: 4.6,
            grade: "B+"
        },
        {
            id: 3,
            name: "State Farm",
            logoUrl: "/logos/insurance.png",
            priceUSD: 470,
            rating: 4.7,
            profileHref: "#",
            claims: 4.6,
            service: 4.7,
            pricing: 4.4,
            coverage: 4.6,
            digitalTools: 4.3,
            grade: "C+"
        },
        {
            id: 4,
            name: "State Farm",
            logoUrl: "/logos/insurance.png",
            priceUSD: 470,
            rating: 4.7,
            profileHref: "#",
            claims: 4.6,
            service: 4.7,
            pricing: 4.4,
            coverage: 4.6,
            digitalTools: 4.3,
            grade: "D+"
        },




    ];




    return (
        <div className="pb-6 lg:pb-11">
            <MaxWidth>
                <div>
                    <h1 className="text-center font-medium text-2xl lg:text-4xl">Top Insurance Providers</h1>
                    <p className="text-center text-lg lg:text-xl font-light mt-2 lg:mt-3 text-black">
                        Based on community ratings and reviews
                    </p>
                </div>

                <div className="mt-9">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        {insurers.slice(0, 4).map((insurer) => (
                            <InsuranceCard key={insurer.id} data={insurer} />
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                        <Link href={"/providers"}>

                            <button className="  cursor-pointer border border-[#D09A40] py-3 px-6 rounded-[26px] text-[#D09A40] font-medium ">
                                View All Providers
                            </button>

                        </Link>

                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

export default TopInsurance;
