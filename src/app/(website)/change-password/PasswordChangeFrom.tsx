"use client";
import { useUserPasswordUpdateMutation } from "@/app/api/website/user/webUserApi";
import { updateAlert } from "@/helper/updertAlert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";
// import { useChangePasswordMutation } from "@/app/api/website/user/webUserApi"; // uncomment if using RTK Query API

export default function PasswordChangeForm() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [userPasswordUpdate, { isLoading }] = useUserPasswordUpdateMutation();
    // const [changePassword, { isLoading }] = useChangePasswordMutation(); // if you have mutation

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        try {
            // Example: payload if you use RTK Query mutation
            const payload = {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            };

            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await userPasswordUpdate(payload).unwrap();
                if (res) {
                    toast.success(res?.message)
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                }
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    return (
        <div className="pt-8 lg:pt-28 pb-10 lg:pb-40">
            <div className="max-w-xl mx-auto bg-white border rounded-lg shadow p-6">
                <h2 className="text-sm font-semibold mb-6">CHANGE PASSWORD</h2>

                <form onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrent ? "text" : "password"}
                                required
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showCurrent ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                required
                                placeholder="8+ characters"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showNew ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showConfirm ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-yellow-600 text-white font-semibold px-6 py-3 cursor-pointer rounded-full hover:bg-yellow-700 transition disabled:opacity-50"
                    >
                        CHANGE PASSWORD
                    </button>
                </form>
            </div>
        </div>
    );
}
