"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRegistrationApiMutation } from "@/app/api/website/auth/authApi";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string | number>("");
    const [password, setPassword] = useState<string | undefined>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string | undefined>("");
    const [lastName, setLastName] = useState<string | undefined>("");
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>("");
    const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirmation: confirmPassword
    }
    const [registrationApi, { isLoading }] = useRegistrationApiMutation();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await registrationApi(payload).unwrap();
            if (res) {
                toast.success(res?.message);
                setEmail("");
                setPassword("");
                setRememberMe(false);
                setFirstName("");
                setLastName("");
                setConfirmPassword("");
                router.push(`/auth/user-otp-verify?email=${encodeURIComponent(email)}`);

            }

        } catch (err: unknown) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }

    }

    return (
        <div className=" max-w-4xl mx-auto  " >

            <div>
                <Link href={"/"}>
                    <div className=" flex justify-center " >
                        <Image src={"/images/logo/logo-svg.svg"} width={316} height={69} alt="" className=" flex justify-center  " />
                    </div>
                </Link>
            </div>
            <div className="bg-[#faf5ec] lg:px-14 px-7 lg:pt-12 pt-6 lg:pb-9 pb-4 shadow shadow-[#00000033] border border-[#FAF5EC] rounded-2xl  ">

                {/* Left Side: Form */}

                <div className="">
                    <div>
                        {/* logo  */}

                    </div>
                    <div className=" mt-7 lg:mt-14 text-center  " >
                        <h1 className=" font-normal lg:text-5xl text-xl text-[#000000] " >Join CoverageGrader</h1>
                        <p className=" lg:mt-5 mt-2.5 font-normal text-[#000000] lg:text-xl text-xs  " >
                            Create a free account to share reviews and help others make confident insurance choice.
                        </p>

                    </div>

                    <div className=" lg:mt-10 mt-5 " >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className=" flex flex-col md:flex-row justify-between gap-x-4  space-y-4 md:space-y-0 " >
                                {/* First Name */}
                                <div className=" flex-1 " >
                                    <label
                                        className="text-[#000000] mb-4 block lg:text-xl text-xs  font-normal"
                                        htmlFor="First_Name"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="First_Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="w-full px-4 py-4 border-1 border-[#989DA3] focus:outline-none focus:ring-0   rounded-[10px]  "
                                        // placeholder="Enter your email"
                                        style={{
                                            boxShadow: "0 4px 10px rgba(248, 242, 229, 0.8)", // custom shadow color
                                        }}
                                    />
                                </div>
                                {/* Last Name */}
                                <div className=" flex-1 " >
                                    <label
                                        className="text-[#000000] mb-4 block lg:text-xl text-xs  font-normal"
                                        htmlFor="Last_Name"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="Last_Name"
                                        value={lastName}
                                        required
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-4 border-1 border-[#989DA3] focus:outline-none focus:ring-0   rounded-[10px]"
                                        // placeholder="Enter your email"
                                        style={{
                                            boxShadow: "0 4px 10px rgba(248, 242, 229, 0.8)", // custom shadow color
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                {/* Email */}
                                <div>
                                    <label
                                        className="text-[#000000] mb-4 block lg:text-xl text-xs  font-normal"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-4 border-1 border-[#989DA3] focus:outline-none focus:ring-0   rounded-[10px] "
                                        // placeholder="Enter your email"
                                        style={{
                                            boxShadow: "0 4px 10px rgba(248, 242, 229, 0.8)", // custom shadow color
                                        }}
                                    />
                                </div>
                            </div>

                            <div className=" flex flex-col md:flex-row gap-x-4 space-y-4 md:space-y-0  " >
                                {/* Password */}
                                <div className=" flex-1 " >
                                    <label className="text-[#000000] mb-4 block lg:text-xl text-xs  font-normal" htmlFor="password">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-4 border-1 border-[#989DA3] focus:outline-none focus:ring-0   rounded-[10px]   "
                                            // placeholder="********"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 "
                                        >
                                            {showPassword ? <EyeOff className=" cursor-pointer " /> : <><Eye className=" cursor-pointer " /></>}
                                        </button>
                                    </div>
                                </div>
                                {/* Confirm Password */}
                                <div className=" flex-1 " >
                                    <label className="text-[#000000] mb-4 block lg:text-xl text-xs  font-normal" htmlFor="confirm_password">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirm_password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="w-full px-4 py-4 border-1 border-[#989DA3] focus:outline-none focus:ring-0   rounded-[10px]   "
                                        // placeholder="********"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 "
                                        >
                                            {showConfirmPassword ? <EyeOff className=" cursor-pointer " /> : <><Eye className=" cursor-pointer " /></>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Remember Me + Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="h-4 w-4 cursor-pointer  appearance-none text-black rounded border border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 checked:focus:ring-0"
                                    />
                                    <span className="ml-2 text-[16px] font-normal text-[#475156] ">
                                        Are you agree to CoverageGrader <span className=" text-[#D09A40] " >Terms of Condition</span> <span>and</span> <span className=" text-[#D09A40] " >Privacy Policy</span>.
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full lg:mt-12 mt-5 cursor-pointer  text-white py-4 px-2 rounded-[8px] btnColor text-lg font-bold "
                            >

                                {
                                    isLoading ? <>
                                        <p>
                                            loading...
                                        </p>
                                    </> : <>Create Account</>
                                }
                            </button>
                        </form>
                    </div>
                </div>


                <div>
                    <p className=" text-[#697079] font-medium  block text-center text-[17px] lg:mt-10 mt-5 " >
                        You have an account ? Please <Link className=" text-[#D09A40]  underline " href={"/auth/login"} >Login</Link>
                    </p>
                </div>

            </div>



        </div>
    );
}
