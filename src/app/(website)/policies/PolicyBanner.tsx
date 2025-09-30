"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth'
import { LucideSearch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

type Policy = {
    id: number;
    title: string;
    description: string;
    image: string;
};

const PolicyBanner = () => {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", query);
        // You can add your search logic here
    };


    const policies: Policy[] = [
        {
            id: 1,
            title: "Auto Insurance",
            description:
                "Protection for your vehicle against accidents, theft, and liability. Learn about coverage types, state requirements, and how to choose the right policy.",
            image: "/images/policy/car.svg",

        },
        {
            id: 2,
            title: "Health Insurance",
            description:
                "Covers medical expenses, preventive care, and emergencies. Understand your plan options, benefits, and how to pick the right coverage.",
            image: "/images/policy/car.svg",

        },
        {
            id: 3,
            title: "Home Insurance",
            description:
                "Protects your home and belongings from damage, theft, and disasters. Learn about different coverage options and how to save on premiums.",
            image: "/images/policy/car.svg",

        },
        {
            id: 4,
            title: "Travel Insurance",
            description:
                "Safeguards you against trip cancellations, lost luggage, and medical emergencies abroad. Discover what to look for in a policy.",
            image: "/images/policy/car.svg",

        },
        {
            id: 5,
            title: "Life Insurance",
            description:
                "Ensures financial protection for your family. Learn about term, whole, and universal life policies to make the right choice.",
            image: "/images/policy/car.svg",

        },
    ];


    return (
        <>
            <div className=' bg-[#FAF5EC] lg:pb-20 lg:pt-14 pb-10 pt-7 ' >
                <MaxWidth>
                    <div  >
                        <h1 className=' text-center lg:text-5xl font-bold text-3xl text-black ' >Understand Your <span className=' text-[#D09A40] ' >Options</span></h1>
                        <p className=' text-center lg:mt-6 mt-3 lg:text-xl text-sm font-thin ' >Clear, unbiased guides to help you navigate different insurance policies and make informed decisions.</p>
                        <div className=' lg:mt-10 mt-5 ' >
                            <form
                                onSubmit={handleSearch}
                                className="w-full max-w-md mx-auto relative"
                            >
                                {/* Search Input */}
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search Policy Guides..."
                                    className="w-full pl-12 pr-4 py-3  focus:outline-none focus:ring-0 transition bg-white rounded-[42px] shadow-md shadow-[#00000033]"
                                />

                                {/* Search Icon */}
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <LucideSearch size={20} />
                                </span>
                            </form>
                        </div>
                    </div>
                </MaxWidth>
            </div>

            <div className=' bg-[#f9fafb] lg:pt-14 pt-7 lg:pb-10 pb-5 ' >
                <MaxWidth>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mx-auto justify-center  ">
                        {policies.map((policy) => (
                            <div
                                key={policy.id}
                                className=" bg-white shadow shadow-[#00000040]  pt-16 pb-10 px-9 rounded-[10px] mx-auto  "
                            >
                                <div>
                                    <Image
                                        src={policy.image}
                                        width={110}
                                        height={40}
                                        alt={policy.title}
                                        className="block mx-auto"
                                    />
                                </div>
                                <div className="lg:mt-8 mt-4">
                                    <h1 className="text-center lg:text-2xl text-sm font-normal">
                                        {policy.title}
                                    </h1>
                                </div>
                                <div>
                                    <p className="lg:mt-5 mt-2 lg:text-xl text-xs font-thin">
                                        {policy.description}
                                    </p>
                                </div>
                                <div className="lg:mt-5 mt-2">
                                    <Link className=' cursor-pointer' href={`/policy-details/${policy?.id}`}>
                                        <button className="flex items-center lg:text-xl text-[#D09A40] font-normal text-xs gap-x-5 cursor-pointer ">
                                            Learn More{" "}
                                            <span className="block mt-1 cursor-pointer ">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M20.5299 11.4699C20.6704 11.6105 20.7493 11.8012 20.7493 11.9999C20.7493 12.1987 20.6704 12.3893 20.5299 12.5299L14.5299 18.5299C14.4613 18.6036 14.3785 18.6627 14.2865 18.7037C14.1945 18.7447 14.0952 18.7667 13.9944 18.7685C13.8937 18.7703 13.7937 18.7518 13.7003 18.714C13.6069 18.6763 13.5221 18.6202 13.4509 18.5489C13.3797 18.4777 13.3235 18.3929 13.2858 18.2995C13.2481 18.2061 13.2296 18.1061 13.2313 18.0054C13.2331 17.9047 13.2552 17.8054 13.2961 17.7134C13.3371 17.6214 13.3962 17.5386 13.4699 17.4699L18.1899 12.7499H3.99993C3.80102 12.7499 3.61025 12.6709 3.4696 12.5302C3.32895 12.3896 3.24993 12.1988 3.24993 11.9999C3.24993 11.801 3.32895 11.6102 3.4696 11.4696C3.61025 11.3289 3.80102 11.2499 3.99993 11.2499H18.1899L13.4699 6.52991C13.3962 6.46125 13.3371 6.37845 13.2961 6.28645C13.2552 6.19445 13.2331 6.09513 13.2313 5.99443C13.2296 5.89373 13.2481 5.7937 13.2858 5.70031C13.3235 5.60692 13.3797 5.52209 13.4509 5.45087C13.5221 5.37965 13.6069 5.32351 13.7003 5.28579C13.7937 5.24807 13.8937 5.22954 13.9944 5.23132C14.0952 5.23309 14.1945 5.25514 14.2865 5.29613C14.3785 5.33712 14.4613 5.39622 14.5299 5.46991L20.5299 11.4699Z"
                                                        fill="#D09A40"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </MaxWidth>
            </div>

        </>
    )
}

export default PolicyBanner