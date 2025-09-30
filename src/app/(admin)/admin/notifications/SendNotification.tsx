"use client";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa6";

export default function SendNotification() {
    const [recipientType, setRecipientType] = useState("Select Recipient");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            recipientType,
            message,
        });
    };

    return (
        <div className="">
            <div className=" bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[12px] pb-12 pt-8 px-5 ">
                <h2 className=" text-xl font-medium text-[#000000] ">
                    Send Notification
                </h2>
                <h1 className=" mt-2.5 font-normal  " >
                    Send push notifications to users and drivers
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5 mt-7 ">
                    {/* Recipient Type - Custom Dropdown */}
                    <div>
                        <label className="block  font-medium text-[#000000] mb-2">
                            Recipient Type
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex justify-between items-center border border-[#686868] rounded-md px-4 py-2 gap-x-6 cursor-pointer focus:outline-none"
                            >
                                <p className=" text-sm text-[#000000] font-normal " >
                                    {recipientType}
                                </p>
                                <span className="ml-2">
                                    {
                                        dropdownOpen ? <> <span><FaChevronUp /></span> </> : <><svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.7134 0.643643L12.7202 1.65138L7.23324 7.14024C7.14532 7.22872 7.04077 7.29894 6.92561 7.34685C6.81045 7.39477 6.68695 7.41943 6.56221 7.41943C6.43748 7.41943 6.31398 7.39477 6.19882 7.34685C6.08365 7.29894 5.9791 7.22872 5.89118 7.14024L0.401367 1.65138L1.40815 0.644593L6.56079 5.79628L11.7134 0.643643Z" fill="black" />
                                        </svg>
                                        </>
                                    }
                                </span>
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute left-0 right-0 mt-2 bg-white  rounded-md shadow-lg z-10 w-[12%] ">
                                    {["All Users", "Doctors", "Patients", "Admins"].map((option) => (
                                        <li
                                            key={option}
                                            onClick={() => {
                                                setRecipientType(option);
                                                setDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer  "
                                        >
                                            <p className="text-sm text-[#000000] font-normal  " >
                                                {option}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Notification Type */}
                    <div>
                        <label className="block text-sm font-medium  text-[#000000]">
                            Notification Type
                        </label>
                        <input type="text" name="" id="" className=" border border-[#686868] focus:outline-0 w-full mt-3 py-2 px-4 rounded-lg " placeholder="Enter Notification title" />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full border border-[#686868] rounded-md px-4 py-2 focus:outline-none resize-none"
                            placeholder="Write your message here..."
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className=" text-sm font-semibold rounded-[39px] bg-[#D09A40] text-white py-3 px-5 cursor-pointer  transition"
                    >
                        Send Now
                    </button>

                </form>
            </div>
        </div>
    );
}
