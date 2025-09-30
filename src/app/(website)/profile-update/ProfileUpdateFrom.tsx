
"use client";
import { useState } from "react";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";

export default function ProfileUpdateFrom() {
    const [selectedImage, setSelectedImage] = useState("/images/profile.jpg");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setSelectedImage(imgUrl);
        }
    };

    return (
        <div className=" pt-20 pb-28 " >
            <div className="max-w-3xl mx-auto bg-white rounded-2xl  p-8 shadow shadow-[#00000033] ">
                <h2 className="text-lg font-semibold mb-6">EDIT PROFILE</h2>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Profile Image */}
                    <div className="relative w-32 h-32 mx-auto lg:mx-0">
                        <Image
                            src={selectedImage}
                            alt="Profile"
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover border border-black "
                        />
                        <label
                            htmlFor="profileImage"
                            className="absolute bottom-2 right-2 bg-yellow-600 text-white p-2 rounded-full cursor-pointer"
                        >
                            <FiCamera size={18} />
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"

                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Display name
                            </label>
                            <input
                                type="text"
                                defaultValue="Kevin"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                defaultValue="Kevin.gilbert@gmail.com"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                defaultValue="+1-202-555-0118"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                States
                            </label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none">
                                <option>Dhaka</option>
                                <option>Chattogram</option>
                                <option>Khulna</option>
                                <option>Rajshahi</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-8">
                    <button className="bg-yellow-600 cursor-pointer text-white px-6 py-3 rounded-full font-medium hover:bg-yellow-700 transition">
                        SAVE CHANGES
                    </button>
                </div>
            </div>
        </div>
    );
}
