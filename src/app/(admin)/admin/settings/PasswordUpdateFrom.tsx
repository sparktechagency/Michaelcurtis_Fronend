"use client"

import { usePasswordUpdateMutation } from "@/app/api/website/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useEffect, useRef, useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { toast } from "sonner";

type PolicyViewProps = {
    passwordUpdateModal: boolean;
    setPasswordUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordUpdateFrom: React.FC<PolicyViewProps> = ({
    passwordUpdateModal,
    setPasswordUpdateModal,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation
    useEffect(() => {
        if (passwordUpdateModal) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [passwordUpdateModal]);

    // Close modal
    const handleClose = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => setPasswordUpdateModal(false), 500);
    }, [setPasswordUpdateModal]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClose]);

    // Close on ESC and handle focus trap
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();

            if (e.key === "Tab" && modalRef.current) {
                const focusableEls = modalRef.current.querySelectorAll(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                const firstEl = focusableEls[0] as HTMLElement;
                const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;

                if (!e.shiftKey && document.activeElement === lastEl) {
                    firstEl.focus();
                    e.preventDefault();
                } else if (e.shiftKey && document.activeElement === firstEl) {
                    lastEl.focus();
                    e.preventDefault();
                }
            }
        };

        if (passwordUpdateModal) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus first button
            setTimeout(() => firstFocusableRef.current?.focus(), 100);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [passwordUpdateModal, handleClose]);


    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const togglePassword = (field: "current" | "new" | "confirm") => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const [current_password, setCurrentPassword] = useState<string | null>(null);
    const [new_password, setNewPassword] = useState<string | null>(null);
    const [new_password_confirmation, setNew_password_confirmation] = useState<string | null>(null);

    const payload = {
        current_password,
        new_password,
        new_password_confirmation
    };


    const [passwordUpdate, { isLoading }] = usePasswordUpdateMutation();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            const res = await passwordUpdate(payload).unwrap();

            if (res) {
                setCurrentPassword(null);
                setNewPassword(null);
                setNew_password_confirmation(null);

                toast.success(res?.message)
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);

        }
    }

















    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0   bg-opacity-50 transition-opacity duration-500 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={`fixed top-10 overflow-y-auto left-1/2 transform -translate-x-1/2 max-w-4xl w-full mx-4 bg-white shadow-lg rounded-lg pt-12 pb-6 px-12 transition-all duration-500 ease-out
          ${showModal ? "translate-y-20 opacity-100 scale-100" : "-translate-y-40 opacity-0 scale-95"}`}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    ref={firstFocusableRef}
                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    ✕
                </button>



                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Current Password */}
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword.current ? "text" : "password"}
                            onChange={(e) => { setCurrentPassword(e.target.value) }}
                            placeholder="Current Password"
                            required
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-0"
                        />
                        <button
                            type="button"
                            onClick={() => togglePassword("current")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword.current ? <FiEyeOff className=" cursor-pointer " /> : <FiEye className=" cursor-pointer " />}
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword.new ? "text" : "password"}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            required
                            placeholder="New Password"
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-0"
                        />
                        <button
                            type="button"
                            onClick={() => togglePassword("new")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword.new ? <FiEyeOff className=" cursor-pointer " /> : <FiEye className=" cursor-pointer " />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            required
                            onChange={(e) => { setNew_password_confirmation(e.target.value) }}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-0"
                        />
                        <button
                            type="button"
                            onClick={() => togglePassword("confirm")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword.confirm ? <FiEyeOff className=" cursor-pointer " /> : <FiEye className=" cursor-pointer " />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition cursor-pointer "
                    >
                        {
                            isLoading ? "Loading..." : "Update Password"
                        }
                    </button>
                </form>

            </div>
        </>
    );
};

export default PasswordUpdateFrom;
