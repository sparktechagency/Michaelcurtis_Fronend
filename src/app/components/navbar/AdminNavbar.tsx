"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import Link from "next/link";
import { useAdminProfileQuery } from "@/app/api/website/auth/authApi";

const AdminNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const { data } = useAdminProfileQuery(undefined);


    const userData = data?.data

    return (
        <nav className="w-full bg-[#FAF5EC]  px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            {/* Left side */}
            <div className=" ml-6 " >
                <h1 className=" lg:text-3xl text-xl font-medium text-[#000000]  ">
                    Dashboard Overview
                </h1>
                <p className=" text-xl font-normal mt-3 " >
                    Welcome to CoverageGrader Admin Panel
                </p>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-6 relative">
                {/* Notification Icon */}
                <button className="relative">
                    <svg width="28" height="33" viewBox="0 0 28 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0C11.2152 0 8.54453 1.10625 6.5754 3.07538C4.60626 5.04451 3.50002 7.71523 3.50002 10.5V15.792C3.50023 16.0247 3.44631 16.2542 3.34252 16.4625L0.767018 21.612C0.641207 21.8636 0.581801 22.1431 0.59444 22.4241C0.60708 22.7051 0.691346 22.9782 0.839235 23.2175C0.987124 23.4568 1.19373 23.6543 1.43942 23.7912C1.68511 23.9282 1.96173 24 2.24302 24H25.757C26.0383 24 26.3149 23.9282 26.5606 23.7912C26.8063 23.6543 27.0129 23.4568 27.1608 23.2175C27.3087 22.9782 27.393 22.7051 27.4056 22.4241C27.4182 22.1431 27.3588 21.8636 27.233 21.612L24.659 16.4625C24.5547 16.2544 24.5003 16.0248 24.5 15.792V10.5C24.5 7.71523 23.3938 5.04451 21.4246 3.07538C19.4555 1.10625 16.7848 0 14 0ZM14 28.5C13.069 28.5005 12.1608 28.2122 11.4005 27.6749C10.6403 27.1376 10.0653 26.3777 9.75502 25.5H18.245C17.9347 26.3777 17.3598 27.1376 16.5995 27.6749C15.8392 28.2122 14.931 28.5005 14 28.5Z" fill="#1E1E1E" />
                    </svg>

                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </button>

                {/* Profile Image */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className=" rounded-full overflow-hidden border-2 border-gray-300"
                    >
                        <Image
                            src={userData?.avatar ?? "/images/default-avatar.png"} // place your admin image in public/images
                            alt="Admin"
                            width={500}
                            height={500}
                            className="object-cover w-14 h-14 cursor-pointer "
                        />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <ul className="py-2 text-gray-700">
                                <li>
                                    <Link
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        href="/admin/settings"
                                        className=" px-4 py-2 hover:bg-gray-100 flex flex-row items-center gap-x-10"
                                    >
                                        <span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18Z" stroke="black" strokeLinejoin="round" />
                                                <path d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z" stroke="black" />
                                            </svg>

                                        </span>
                                        <p className=" text-[#1E1E1E] font-medium text-sm " >
                                            Profile
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        href="/admin/settings"
                                        className=" px-4 py-2 hover:bg-gray-100 flex flex-row items-center gap-x-10 "
                                    >
                                        <span>
                                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.59 12.5L15.77 11.2C16.07 10.12 16.09 8.95 15.77 7.78L17.59 6.5L16.14 4L14.11 4.92C13.32 4.12 12.32 3.5 11.15 3.21L10.95 1H8.04996L7.84996 3.21C6.67996 3.5 5.67996 4.12 4.88996 4.92L2.85996 4L1.40996 6.5L3.22996 7.78C2.90996 8.95 2.92996 10.12 3.22996 11.2L1.40996 12.5L2.85996 15L4.88996 14.07C5.67996 14.86 6.67996 15.46 7.84996 15.77L8.04996 18H10.95L11.15 15.77C12.32 15.46 13.32 14.86 14.11 14.07L16.14 15L17.59 12.5ZM11.5 0C11.77 0 12 0.2 12 0.46L12.18 2.5C12.94 2.78 13.62 3.19 14.23 3.68L16.08 2.81C16.31 2.69 16.6 2.77 16.74 3L18.74 6.5C18.88 6.71 18.8 7 18.58 7.15L16.91 8.32C17.04 9.12 17.03 9.91 16.91 10.68L18.58 11.85C18.8 12 18.88 12.29 18.74 12.5L16.74 16C16.6 16.21 16.31 16.29 16.08 16.17L14.23 15.31C13.62 15.8 12.94 16.2 12.18 16.5L12 18.5C12 18.79 11.77 19 11.5 19H7.49996C7.36735 19 7.24017 18.9473 7.1464 18.8536C7.05263 18.7598 6.99996 18.6326 6.99996 18.5L6.81996 16.5C6.05996 16.2 5.37996 15.8 4.76996 15.31L2.91996 16.17C2.68996 16.29 2.39996 16.21 2.25996 16L0.259956 12.5C0.119956 12.29 0.199956 12 0.419956 11.85L2.08996 10.68C1.96996 9.91 1.95996 9.12 2.08996 8.32L0.419956 7.15C0.199956 7 0.119956 6.71 0.259956 6.5L2.25996 3C2.39996 2.77 2.68996 2.69 2.91996 2.81L4.76996 3.68C5.37996 3.19 6.05996 2.78 6.81996 2.5L6.99996 0.46C6.99996 0.2 7.22996 0 7.49996 0H11.5ZM9.49996 6C10.4282 6 11.3185 6.36875 11.9748 7.02513C12.6312 7.6815 13 8.57174 13 9.5C13 10.4283 12.6312 11.3185 11.9748 11.9749C11.3185 12.6313 10.4282 13 9.49996 13C8.5717 13 7.68146 12.6313 7.02508 11.9749C6.36871 11.3185 5.99996 10.4283 5.99996 9.5C5.99996 8.57174 6.36871 7.6815 7.02508 7.02513C7.68146 6.36875 8.5717 6 9.49996 6ZM9.49996 7C8.83692 7 8.20103 7.26339 7.73219 7.73223C7.26335 8.20107 6.99996 8.83696 6.99996 9.5C6.99996 10.163 7.26335 10.7989 7.73219 11.2678C8.20103 11.7366 8.83692 12 9.49996 12C10.163 12 10.7989 11.7366 11.2677 11.2678C11.7366 10.7989 12 10.163 12 9.5C12 8.83696 11.7366 8.20107 11.2677 7.73223C10.7989 7.26339 10.163 7 9.49996 7Z" fill="black" />
                                            </svg>

                                        </span>
                                        <p className=" text-[#1E1E1E] font-medium text-sm " >
                                            Settings
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-x-10 cursor-pointer "
                                    >
                                        <span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.616 20C5.15533 20 4.771 19.846 4.463 19.538C4.155 19.23 4.00067 18.8453 4 18.384V5.616C4 5.15533 4.15433 4.771 4.463 4.463C4.77167 4.155 5.156 4.00067 5.616 4H11.519C11.6617 4 11.7807 4.04767 11.876 4.143C11.9713 4.23833 12.019 4.35733 12.019 4.5C12.019 4.64267 11.9713 4.76167 11.876 4.857C11.7807 4.95233 11.6617 5 11.519 5H5.616C5.462 5 5.32067 5.064 5.192 5.192C5.06333 5.32 4.99933 5.46133 5 5.616V18.385C5 18.5383 5.064 18.6793 5.192 18.808C5.32 18.9367 5.461 19.0007 5.615 19H11.519C11.6617 19 11.7807 19.0477 11.876 19.143C11.9713 19.2383 12.019 19.3573 12.019 19.5C12.019 19.6427 11.9713 19.7617 11.876 19.857C11.7807 19.9523 11.6617 20 11.519 20H5.616ZM18.06 12.5H9.692C9.55 12.5 9.43133 12.4523 9.336 12.357C9.24067 12.2617 9.19267 12.1427 9.192 12C9.19133 11.8573 9.239 11.7383 9.335 11.643C9.431 11.5477 9.55 11.5 9.692 11.5H18.06L16.089 9.529C15.995 9.43567 15.945 9.323 15.939 9.191C15.9323 9.05833 15.9823 8.937 16.089 8.827C16.195 8.717 16.3127 8.661 16.442 8.659C16.572 8.657 16.692 8.711 16.802 8.821L19.416 11.434C19.5773 11.596 19.658 11.7847 19.658 12C19.658 12.2153 19.577 12.404 19.415 12.566L16.802 15.179C16.7047 15.2763 16.589 15.3273 16.455 15.332C16.321 15.3367 16.199 15.2837 16.089 15.173C15.9823 15.063 15.93 14.944 15.932 14.816C15.934 14.688 15.988 14.5713 16.094 14.466L18.06 12.5Z" fill="#D93A3A" />
                                            </svg>

                                        </span>
                                        <p className="text-[#D93A3A] font-medium text-sm" >
                                            Logout
                                        </p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
