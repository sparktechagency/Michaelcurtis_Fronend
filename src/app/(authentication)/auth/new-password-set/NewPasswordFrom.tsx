"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNewPasswordSetApiMutation } from "@/app/api/website/auth/authApi";

export default function NewPasswordFrom() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string | undefined>("");
    const searchParams = useSearchParams();
    const emailFromUrl = searchParams.get("email");
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>("");
    const router = useRouter();

    const reset_token = localStorage.getItem("resetToken");

    useEffect(() => {
        if (!reset_token) {
            router.push("/auth/otp-verify")
        }
    }, [reset_token, router]);

    const payload = {
        email: emailFromUrl ?? undefined,
        reset_token: reset_token ?? undefined,
        password: password,
        password_confirmation: confirmPassword
    }

    const [newPasswordSetApi, { isLoading }] = useNewPasswordSetApiMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await newPasswordSetApi(payload).unwrap();
            if (res) {
                console.log(res);
                router.push("/")
                toast.success(res?.message);
                localStorage.removeItem("resetToken")
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }

    }

    return (
        <div className="     max-w-4xl mx-auto  " >

            <div>
                <Link href={"/"}>
                    <div className=" flex justify-center " >
                        <Image src={"/images/logo/logo-svg.svg"} width={316} height={69} alt="" className=" flex justify-center  " />
                    </div>
                </Link>
            </div>
            <div className="bg-[#faf5ec] lg:px-14 px-7 lg:pt-12 pt-6 lg:pb-9 pb-4 shadow shadow-[#00000033] border border-[#FAF5EC] rounded-2xl  ">


                <div className="">
                    <div>


                    </div>
                    <div className=" mt-7 lg:mt-14 text-center  " >
                        <h1 className=" font-normal lg:text-5xl text-xl text-[#000000] " >Reset Password</h1>
                        <p className=" lg:mt-5 mt-2.5 font-normal text-[#000000] lg:text-xl text-xs  " >
                            Enter New Password.
                        </p>

                    </div>

                    <div className=" lg:mt-10 mt-5 " >
                        <form onSubmit={handleSubmit} className="space-y-4">


                            <div className="  space-y-4 md:space-y-0  " >
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
                                <div className=" mt-5" >
                                    <label className="text-[#000000] mb-4 block lg:text-xl text-xs  font-normal" htmlFor="confirm_password">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirm_password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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



                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full lg:mt-12 mt-5 cursor-pointer  text-white py-4 px-2 rounded-[8px] btnColor lg:text-2xl text--[16px] font-normal "
                            >
                                {
                                    isLoading ? "Subminging.." : "Reset Password"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}
