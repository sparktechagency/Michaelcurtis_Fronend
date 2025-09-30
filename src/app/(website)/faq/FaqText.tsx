"use client"
import { Plus } from 'lucide-react';
import React, { useState } from 'react'


const FaqText = () => {
    const items = [
        { id: 1, title: "How can I purchase a ticket from ONERIDE Platform?", },
        { id: 2, title: "How can I purchase a ticket from ONERIDE Platform?", },
        { id: 3, title: "How can I purchase a ticket from ONERIDE Platform?", },
        { id: 4, title: "How can I purchase a ticket from ONERIDE Platform?", },
    ];
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div>
            <div className=' pt-6 lg:pt-13 pb-10 lg:pb-20 ' >
                <div className="max-w-4xl mx-auto bg-white  rounded-lg shadow shadow-[#00000040] px-4 lg:px-8 py-7 lg:py-14  ">
                    {items.map((item, index) => (
                        <div key={item.id}>
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between px-4 py-4 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <span className=" lg:text-3xl text-lg text-black font-normal ">{item.title}</span>
                                </div>
                                <Plus
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
                            {index !== items.length - 1 && <div className=" h-0.5 bg-[#1F2937] lg:mt-3 mt-2 " />}


                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FaqText