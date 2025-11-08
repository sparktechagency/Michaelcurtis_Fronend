"use client"
import { useUserReviewDeleteMutation, useUserReviewQuery } from '@/app/api/website/user/webUserApi'
import { deleteAlert } from '@/helper/deleteAlert'
import { ReviewResponseType } from '@/utility/types/website/review-type/reviewType'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { toast } from 'sonner'

const UserReview = () => {
    const { data } = useUserReviewQuery({});
    console.log("user review is ", data?.data);
    const allReview: ReviewResponseType[] = data?.data || [];
    const [userReviewDelete] = useUserReviewDeleteMutation();

    const handleDelete = async (id: number) => {
        try {
            const res = await deleteAlert();
            if (res.isConfirmed) {
                const res = await userReviewDelete(id).unwrap();
                if (res) {
                    toast.success(res?.message);
                }

            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    }
    return (
        <div className='space-y-8' >
            {
                allReview?.map((item, i) => {
                    return (
                        <div key={i} >
                            <div className='bg-white shadow shadow-[#00000033] px-6 pt-6 pb-12  rounded-[12px]  ' >
                                <div>
                                    <div className=' flex flex-row  items-start gap-x-8  ' >
                                        <div>
                                            <Image unoptimized src={item?.user?.avatar || "/images/insurance/user-img.svg"} width={65} height={65} alt="" className=" w-[65px] h-[65px] cursor-pointer rounded-full " />
                                        </div>
                                        <div>
                                            <h1 className=' lg:text-xl text-sm  font-normal text-[#000000] ' >{item?.user?.full_name} </h1>
                                            <div className=' flex flex-row items-center gap-x-1.5  ' >
                                                <div>
                                                    <h1>{item?.user?.full_name}</h1>
                                                </div>
                                                <div>
                                                    <div className=' w-1 h-1 rounded-full bg-black ' />
                                                </div>
                                                <div>
                                                    <h1> {item?.user?.address} </h1>
                                                </div>
                                            </div>
                                            <div className=' flex flex-row items-center justify-between  ' >
                                                <div className=' flex flex-row items-center gap-x-1 ' >
                                                    <h1 className=' font-bold lg:text-[16px]  ' >{item?.display_score}</h1>
                                                    <div className=' flex items-center gap-x-1 cursor-pointer ' >
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <FaStar
                                                                key={star}
                                                                className={`w-4 h-4 ${star <= Math.round(Number(item?.overall_rating || 0))
                                                                    ? "text-yellow-400"
                                                                    : "text-gray-300"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className=' flex justify-end -mt-7 ' >
                                            <button className=' bg-[#DAF0C8] py-1.5 px-3.5 rounded-[12px] text-[#31BA2D] font-normal text-[16px]  ' >{item?.status}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className=' mt-9 ' >
                                    <p>
                                        &quot;I&apos;`ve been with Liberty Mutual for 5 years and they&apos;ve been fantastic. When I had a fender bender last year, their claims process was smooth and stress-free. The digital app makes everything so easy to manage - I can view my ID cards, make payments, and even file a claim right from my phone. Their rates are a bit higher than some competitors, but the service is worth it.&rdquo;
                                    </p>
                                </div>
                                <div className=' flex flex-row gap-x-5 mt-5 ' >
                                    <div className="flex flex-col space-y-1  ">
                                        <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.scores?.claims}</span>
                                        <span className="text-center lg:text-xl text-sm font-thin text-black ">Claim</span>
                                    </div>
                                    <div className="flex flex-col space-y-1  ">
                                        <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.scores?.service}</span>
                                        <span className="text-center lg:text-xl text-sm font-thin text-black ">Service</span>
                                    </div>
                                    <div className="flex flex-col space-y-1  ">
                                        <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.scores?.pricing}</span>
                                        <span className="text-center lg:text-xl text-sm font-thin text-black ">Price</span>
                                    </div>
                                    <div className="flex flex-col space-y-1  ">
                                        <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.scores?.coverage}</span>
                                        <span className="text-center lg:text-xl text-sm font-thin text-black ">Cover</span>
                                    </div>
                                    <div className="flex flex-col space-y-1  ">
                                        <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.scores?.trust}</span>
                                        <span className="text-center lg:text-xl text-sm font-thin text-black ">Trust</span>
                                    </div>
                                </div>
                                <div className=' flex justify-end  ' >
                                    <span onClick={() => { handleDelete(item?.id) }} className=' cursor-pointer ' >
                                        <svg width="58" height="39" viewBox="0 0 58 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.65" y="0.65" width="55.9" height="37.7" rx="7.15" stroke="#E04F4F" strokeWidth="1.3" />
                                            <path d="M21.6009 29.8999C21.0228 29.8999 20.5284 29.6941 20.1176 29.2824C19.7068 28.8708 19.5009 28.3772 19.5001 27.8017V11.6999H18.8501C18.6655 11.6999 18.5112 11.6375 18.3873 11.5127C18.2633 11.3879 18.2009 11.2332 18.2001 11.0486C18.1992 10.864 18.2616 10.7098 18.3873 10.5858C18.5129 10.4619 18.6672 10.3999 18.8501 10.3999H23.4001C23.4001 10.1313 23.4997 9.89726 23.6991 9.69793C23.8984 9.49859 24.1324 9.39893 24.4011 9.39893H30.1991C30.4677 9.39893 30.7017 9.49859 30.9011 9.69793C31.1004 9.89726 31.2001 10.1313 31.2001 10.3999H35.7501C35.9347 10.3999 36.0889 10.4623 36.2129 10.5871C36.3368 10.7119 36.3992 10.8666 36.4001 11.0512C36.4009 11.2358 36.3385 11.3901 36.2129 11.514C36.0872 11.638 35.9329 11.6999 35.7501 11.6999H35.1001V27.8004C35.1001 28.3776 34.8942 28.8716 34.4826 29.2824C34.0709 29.6932 33.5769 29.8991 33.0006 29.8999H21.6009ZM33.8001 11.6999H20.8001V27.8004C20.8001 28.0336 20.875 28.2251 21.025 28.375C21.1749 28.525 21.3669 28.5999 21.6009 28.5999H33.0006C33.2337 28.5999 33.4252 28.525 33.5752 28.375C33.7251 28.2251 33.8001 28.0336 33.8001 27.8004V11.6999ZM25.1005 25.9999C25.2851 25.9999 25.4398 25.9375 25.5646 25.8127C25.6894 25.6879 25.7513 25.5337 25.7505 25.3499V14.9499C25.7505 14.7653 25.6881 14.6111 25.5633 14.4871C25.4385 14.3632 25.2838 14.3008 25.0992 14.2999C24.9146 14.2991 24.7603 14.3615 24.6364 14.4871C24.5124 14.6128 24.4505 14.7671 24.4505 14.9499V25.3499C24.4505 25.5345 24.5129 25.6888 24.6377 25.8127C24.7625 25.9375 24.9167 25.9999 25.1005 25.9999ZM29.501 25.9999C29.6856 25.9999 29.8398 25.9375 29.9638 25.8127C30.0877 25.6879 30.1497 25.5337 30.1497 25.3499V14.9499C30.1497 14.7653 30.0873 14.6111 29.9625 14.4871C29.8377 14.3623 29.6834 14.2999 29.4997 14.2999C29.3151 14.2999 29.1604 14.3623 29.0356 14.4871C28.9108 14.6119 28.8488 14.7662 28.8497 14.9499V25.3499C28.8497 25.5345 28.9121 25.6888 29.0369 25.8127C29.1617 25.9367 29.3164 25.9991 29.501 25.9999Z" fill="#E04F4F" />
                                        </svg>

                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserReview