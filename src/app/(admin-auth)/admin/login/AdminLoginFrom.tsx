"use client";

import React, { useState } from "react";
import Image from "next/image";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLoginOtpMutation } from "@/app/api/website/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function AdminLoginFrom() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [loginOtp, { isLoading }] = useLoginOtpMutation();
    const payload = {
        email,
        password
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await loginOtp(payload).unwrap();
            console.log(res)
            if (res) {
                window.location.href = "/admin"
                setEmail("");
                setPassword("");
                setRememberMe(false);
                toast.success(res?.message);

                // ✅ Set token in cookies (expires in 7 days)
                Cookies.set("admin_token", res.data?.access_token, { expires: 7, secure: true, sameSite: "strict" });
            }
        } catch (err) {
            console.log(err)
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };


    return (
        <div className="     max-w-4xl mx-auto  " >
            <MaxWidth>
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
                            <h1 className=" font-normal lg:text-5xl text-xl text-[#000000] " >Login to your Account</h1>
                            <p className=" lg:mt-5 mt-2.5 font-normal text-[#000000] lg:text-xl text-xs  " >
                                Welcome back Access your profile and manage your reviews
                            </p>

                        </div>

                        <div className=" lg:mt-10 mt-5 " >
                            <form onSubmit={handleSubmit} className="space-y-4">



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
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-4 border-1 border-[#989DA3] focus:outline-none focus:ring-0   rounded-[10px] "
                                            // placeholder="Enter your email"
                                            style={{
                                                boxShadow: "0 4px 10px rgba(248, 242, 229, 0.8)", // custom shadow color
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="   " >
                                    {/* Password */}
                                    <div className=" flex-1 " >
                                        <label className="text-[#000000] mb-4 block lg:text-xl text-xs  font-normal" htmlFor="password">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                value={password}
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-4 border-1 border-[#989DA3] focus:outline-none focus:ring-0   rounded-[10px]   "
                                            // placeholder="********"
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

                                </div>

                                {/* Remember Me + Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-sm">Remember me</span>
                                    </label>
                                    <Link href="/admin/email-verify" className="text-sm text-[#D09A40] hover:underline">Forgot password?</Link>
                                </div>

                                {/* Submit Button */}
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full lg:mt-12 mt-5 cursor-pointer  text-white py-4 px-2 rounded-[8px] btnColor text-lg font-bold "
                                >
                                    {
                                        isLoading ? "Submiting..." : "Login"
                                    }
                                </button>
                            </form>
                        </div>


                        {/* <div>
                            <p className=" text-[#697079] font-medium  block text-center text-[17px] lg:mt-10 mt-5 " >
                                Don’t have an account ? <Link className=" text-[#D09A40]  underline " href={"/auth/registration"} >Sign up</Link>
                            </p>
                        </div> */}
                    </div>
                </div>




            </MaxWidth>
        </div>
    );
}
