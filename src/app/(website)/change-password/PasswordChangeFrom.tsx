"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordChangeFrom() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className=" pt-8 lg:pt-28 pb-10 lg:pb-40 " >
            <div className="max-w-xl mx-auto bg-white border rounded-lg shadow p-6">
                <h2 className="text-sm font-semibold mb-6">CHANGE PASSWORD</h2>

                {/* Current Password */}
                <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-1">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showCurrent ? "text" : "password"}
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
                    <label className="block text-sm text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                        <input
                            type={showNew ? "text" : "password"}
                            placeholder="8+ characters"
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
                <button className="bg-yellow-600 cursor-pointer text-white font-semibold px-6 py-3 rounded-full hover:bg-yellow-700 transition">
                    CHANGE PASSWORD
                </button>
            </div>
        </div>
    );
}
