"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForgetOtpVerifyMutation, useForgetResendOtpMutation } from "@/app/api/website/auth/authApi";

export default function OtpFrom() {
    const searchParams = useSearchParams();
    const emailFromUrl = searchParams.get("email");
    const [number, setNumber] = useState<number | undefined>();

    const router = useRouter();

    // otp verify 


    const [forgetOtpVerify, { isLoading }] = useForgetOtpVerifyMutation();

    const payload = {
        email: emailFromUrl,
        otp: number
    }


    const token = localStorage.getItem("resetToken")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await forgetOtpVerify(payload).unwrap();
            if (res) {
                toast.success(res?.message);
                localStorage.setItem("resetToken", res?.data?.reset_token ?? "");
                setNumber(undefined);
                if (token) {
                    router.push(`/auth/new-password-set?email=${emailFromUrl}`);
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };


    // resend otp 


    const [forgetResendOtp] = useForgetResendOtpMutation();



    const handleResendOtp = async () => {
        const payload = {
            email: emailFromUrl
        }
        try {

            const res = await forgetResendOtp(payload).unwrap();

            if (res) {
                console.log(res)
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
        <div className="     max-w-4xl mx-auto  " >

            <div>
                <Link href={"/"}>
                    <div className=" flex justify-center " >
                        <Image src={"/images/logo/logo-svg.svg"} width={316} height={69} alt="" className=" flex justify-center  " />
                    </div>
                </Link>
            </div>
            <div className="bg-[#faf5ec] lg:px-14 px-7 lg:pt-12 pt-6 lg:pb-9 pb-4 shadow shadow-[#00000033] border border-[#FAF5EC] rounded-2xl lg:mt-8  ">


                <div className="">
                    <div>
                        {/* logo  */}

                    </div>
                    <div className=" mt-7 lg:mt-14 text-center  " >
                        <h1 className=" font-normal lg:text-5xl text-xl text-[#000000] " >Verify your email address</h1>
                        <p className=" lg:mt-5 mt-2.5 font-normal text-[#000000] lg:text-xl text-xs  " >
                            Enter the email address associated with your account.
                        </p>

                    </div>

                    <div className=" lg:mt-20 mt-10 " >
                        <form onSubmit={handleSubmit} className="space-y-4">



                            <div>
                                {/* Verification Code */}
                                <div>
                                    <div className=" flex  justify-between items-start " >
                                        <label
                                            className="text-[#000000] mb-4 block lg:text-xl text-xs  font-normal"
                                            htmlFor="email"
                                        >
                                            Verification Code
                                        </label>
                                        <h1 onClick={handleResendOtp} className=" text-[#D09A40] lg:text-xl text-xs font-normal cursor-pointer " >Resend Code</h1>
                                    </div>
                                    <input
                                        type="number"
                                        id="number"
                                        value={number}
                                        required
                                        onChange={(e) => {
                                            // Allow only digits
                                            const value = e.target.value.replace(/[^0-9]/g, "");
                                            setNumber(value ? Number(value) : undefined);
                                        }}
                                        className="w-full px-4 py-4 border border-[#989DA3] focus:outline-none focus:ring-0 rounded-[10px]"
                                        placeholder="Enter number"
                                        style={{
                                            boxShadow: "0 4px 10px rgba(248, 242, 229, 0.8)",
                                        }}
                                    />
                                </div>
                            </div>




                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full lg:mt-12 mt-5 cursor-pointer  text-white py-4 px-2 rounded-[8px] btnColor text-lg font-bold "
                            >
                                {
                                    isLoading ? "Submiting.." : "Verify Me"
                                }
                            </button>
                        </form>
                    </div>



                </div>
            </div>


        </div>
    );
}
