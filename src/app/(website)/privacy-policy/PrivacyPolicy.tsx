"use client";
import React from 'react'
import { useState } from "react";
import { FiInfo, FiEdit2, FiPieChart, FiMail, FiChevronDown } from "react-icons/fi";

const items = [
    { id: 1, title: "Information We Collect", icon: <FiInfo className="text-[#D09A40] w-5 h-5" /> },
    { id: 2, title: "Information We Collect", icon: <FiEdit2 className="text-[#D09A40] w-5 h-5" /> },
    { id: 3, title: "Information We Collect", icon: <FiPieChart className="text-[#D09A40] w-5 h-5" /> },
    { id: 4, title: "Information We Collect", icon: <FiMail className="text-[#D09A40] w-5 h-5" /> },
];

const PrivacyPolicy = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    
    return (
        <>
            <div className=' bg-[#FAF5EC] py-6 lg:py-12 ' >
                <h1 className=' text-center lg:text-5xl text-xl font-bold ' >Privacy  <span className=' text-[#D09A40] ' >Policy</span></h1>


                <p className=' text-center lg:mt-5 mt-3 max-w-4xl mx-auto lg:text-xl text-sm font-thin  ' >
                    Last updated: September 07, 2025. Your privacy matters to us. Here’s how we handle your data to keep it safe and secure.
                </p>
            </div>

            <div className=' pt-6 lg:pt-13 pb-10 lg:pb-20 ' >
                <div className="max-w-4xl mx-auto bg-white  rounded-lg shadow shadow-[#00000040] px-4 lg:px-8 py-7 lg:py-14  ">
                    {items.map((item, index) => (
                        <div key={item.id}>
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between px-4 py-4 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span className=" lg:text-3xl text-lg text-black font-normal ">{item.title}</span>
                                </div>
                                <FiChevronDown
                                    className={`w-5 cursor-pointer h-5 text-gray-600 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {/* Dropdown Content */}
                            {openIndex === index && (
                                <div className="px-12 pb-4 text-gray-600 text-sm">
                                    <p>
                                        This is the hidden content for <b>{item.title}</b>. You can replace this
                                        with any text or components.
                                    </p>
                                </div>
                            )}
                            {index !== items.length - 1 && <div className=" h-0.5 bg-[#989DA3] lg:mt-3 mt-2 " />}


                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default PrivacyPolicy