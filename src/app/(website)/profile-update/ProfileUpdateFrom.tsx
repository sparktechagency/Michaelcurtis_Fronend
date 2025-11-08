"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { useUserProfileQuery, useUserProfileUpdateMutation } from "@/app/api/website/user/webUserApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { updateAlert } from "@/helper/updertAlert";

export default function ProfileUpdateForm() {
    const [selectedImage, setSelectedImage] = useState<string>("/images/profile.jpg");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [contact_number, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [first_name, setFirstName] = useState("");

    const { data } = useUserProfileQuery({});
    const [userProfileUpdate, { isLoading }] = useUserProfileUpdateMutation();

    useEffect(() => {
        if (data?.data) {
            const d = data.data;
            setFullName(d.full_name || "");
            setEmail(d.email || "");
            setContactNumber(d.contact_number || "");
            setAddress(d.address || "");
            setFirstName(d.first_name || "");
            setSelectedImage(d.avatar || "/images/profile.jpg");
        }
    }, [data]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const imgUrl = URL.createObjectURL(file);
            setSelectedImage(imgUrl);
        }
    };

    const handleSubmit = async () => {
        try {
            const confirm = await updateAlert();
            if (!confirm) return;

            const formData = new FormData();
            formData.append("full_name", full_name);
            formData.append("email", email);
            formData.append("contact_number", contact_number);
            formData.append("address", address);
            formData.append("first_name", first_name);
            formData.append("_method", "PUT");

            if (selectedFile) {
                formData.append("avatar", selectedFile);
            }

            const res = await userProfileUpdate(formData).unwrap();
            toast.success("Profile updated successfully ✅");
            console.log(res);
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    return (
        <div className="pt-20 pb-28">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow shadow-[#00000033]">
                <h2 className="text-lg font-semibold mb-6">EDIT PROFILE</h2>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Profile Image */}
                    <div className="relative w-32 h-32 mx-auto lg:mx-0">
                        <Image
                            src={selectedImage}
                            alt="Profile"
                            width={128}
                            height={128}
                            unoptimized
                            className="w-32 h-32 rounded-full object-cover border border-black"
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
                        {[
                            { label: "First Name", value: first_name, set: setFirstName, name: "first_name" },
                            { label: "Full Name", value: full_name, set: setFullName, name: "full_name" },
                            { label: "Email", value: email, set: setEmail, name: "email" },
                            { label: "Phone Number", value: contact_number, set: setContactNumber, name: "contact_number" },
                            { label: "Address", value: address, set: setAddress, name: "address" },
                        ].map(({ label, value, set, name }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                <input
                                    name={name}
                                    value={value}
                                    onChange={(e) => set(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-yellow-600 text-white px-6 py-3 cursor-pointer rounded-full font-medium hover:bg-yellow-700 transition disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "SAVE CHANGES"}
                    </button>
                </div>
            </div>
        </div>
    );
}
