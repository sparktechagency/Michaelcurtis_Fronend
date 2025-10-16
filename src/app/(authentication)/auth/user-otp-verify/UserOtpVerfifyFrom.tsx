"use client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useOtpVerifyMutation, useResendOtpMutation } from "@/app/api/website/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

export default function UserOtpVerfifyFrom() {
    const searchParams = useSearchParams();
    const emailFromUrl = searchParams.get("email");
    const [otp, setOtp] = useState<string | undefined>();

    const router = useRouter();

    console.log(router)

    // otp verify 

    const [otpVerify, { isLoading }] = useOtpVerifyMutation()

    const payload = {
        email: emailFromUrl,
        otp
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await otpVerify(payload).unwrap();
            if (res) {
                Cookies.set("user_token", res.data?.access_token, { expires: 100, secure: "false", sameSite: "lax" });
                setOtp("");
                window.location.href = "/";
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };




    // resend otp 


    const [resendOtp] = useResendOtpMutation();


    const handleResendOtp = async () => {
        const payload = {
            email: emailFromUrl,
            otp: 0 // Provide a default value for otp as required by OtpVerifyApiPayload
        }
        try {
            const res = await resendOtp(payload).unwrap()
            if (res) {
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
        <div className="max-w-4xl mx-auto  " >

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
                                        id="otp"
                                        value={otp} // replace 'email' state with 'otp' state
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-4 border border-[#989DA3] focus:outline-none focus:ring-0 rounded-[10px]"
                                        placeholder="Enter your code"
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
                                    isLoading ? "Submiting..." : "Send Code"
                                }
                            </button>
                        </form>
                    </div>



                </div>
            </div>


        </div>
    );
}
