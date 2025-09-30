"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEmailVerifyMutation } from "@/app/api/website/auth/authApi";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function AdminEmailFrom() {
    const [email, setEmail] = useState<string | undefined>("");

    const router = useRouter();

    const [emailVerify, { isLoading }] = useEmailVerifyMutation();

    const payload = {
        email
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const res = await emailVerify(payload).unwrap();

            if (res) {
                toast.success(res?.message);
                setEmail("");
                router.push(`/admin/admin-otp-verify?email=${email}`)
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
                        <h1 className=" font-normal lg:text-5xl text-xl text-[#000000] " >Forgot Password</h1>
                        <p className=" lg:mt-5 mt-2.5 font-normal text-[#000000] lg:text-xl text-xs  " >
                            Enter the email address associated with your account.
                        </p>

                    </div>

                    <div className=" lg:mt-20 mt-10 " >
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




                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full lg:mt-12 mt-5 cursor-pointer  text-white py-4 px-2 rounded-[8px] btnColor text-lg font-bold "
                            >
                                {
                                    isLoading ? <> <span>Loading...</span> </> : <span>Send Code</span>
                                }
                            </button>
                        </form>
                    </div>



                </div>
            </div>


        </div>
    );
}
