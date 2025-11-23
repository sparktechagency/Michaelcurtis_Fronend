"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";
import PasswordUpdateFrom from "./PasswordUpdateFrom";
import { useAdminProfileQuery, useProfileUpdateMutation } from "@/app/api/website/auth/authApi";
import { UserData } from "@/utility/types/authType";
import { FaAddressBook } from "react-icons/fa6";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";



export default function UserProfile() {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<UserData | null>(null);
    const [passwordUpdateModal, setPasswordUpdateModal] = useState(false);

    // 👇 RTK Query
    const { data, isLoading } = useAdminProfileQuery();
    const [profileUpdate, { isLoading: loading, reset }] = useProfileUpdateMutation()

    // 👇 Set API data into state when available
    useEffect(() => {
        if (data?.data) {
            setFormData(data.data);
        }
    }, [data]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
            setFile(selectedFile);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData) return;

        const payload = new FormData();
        payload.append("first_name", formData.first_name);
        payload.append("last_name", formData.last_name);
        payload.append("address", formData.address);
        payload.append("contact_number", formData.contact_number);
        payload.append("email", formData.email);
        payload.append("_method", "PUT");

        if (file) {
            payload.append("avatar", file);
        }

        try {

            const res = await profileUpdate(payload).unwrap();

            if (res) {
                reset();
                toast.success(res?.message)
            }



        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }

    if (!formData) {
        return <p className="text-center mt-10">No profile data found.</p>;
    }

    return (
        <>
            <div className="px-16 shadow shadow-[#00000040] rounded-[12px] py-9">
                <h2 className="text-2xl font-medium">Profile Information</h2>
                <div className="mt-6 border border-[#E7E7E7] rounded-3xl shadow p-7">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <label className="relative w-32 h-32 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                            <Image
                                width={128}
                                height={128}
                                src={preview || formData.avatar}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                unoptimized
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                            />
                        </label>
                        <h1 className="text-[#121221] text-xl font-medium text-center mt-3.5">
                            Upload your photo
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* first_name */}
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="first_name"
                                placeholder="first_name Name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-0"
                            />
                        </div>
                        {/* last_name */}
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-0"
                            />
                        </div>
                        {/* address */}
                        <div className="relative">
                            <FaAddressBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="address"
                                placeholder="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="relative">
                            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="contact_number"
                                placeholder="Contact number"
                                value={formData.contact_number}
                                onChange={handleChange}
                                className="w-full border border-[#E7E7E9] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-[#E7E7E9] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-0"
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full mt-16 bg-[#D09A40] border border-[#D1D1D1] text-white text-sm font-bold py-4 rounded-xl cursor-pointer"
                        >
                            {
                                loading ? "loading..." : "Save changes"
                            }
                        </button>

                        <button
                            onClick={() => setPasswordUpdateModal(true)}
                            type="button"
                            className="w-full mt-3.5 bg-[#E9E9E9] border border-[#D1D1D1] text-[#1E1E1E] text-sm font-bold py-4 rounded-xl cursor-pointer"
                        >
                            Update password from here
                        </button>
                    </form>
                </div>
            </div>

            {passwordUpdateModal && (
                <PasswordUpdateFrom
                    passwordUpdateModal={passwordUpdateModal}
                    setPasswordUpdateModal={setPasswordUpdateModal}
                />
            )}
        </>
    );
}
