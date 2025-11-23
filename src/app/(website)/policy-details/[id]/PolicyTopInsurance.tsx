"use client"
import { useSinglePolicyDetailsQuery } from '@/app/api/website/policy/webPolicyApi';
import MaxWidth from '@/app/components/max-width/MaxWidth'
import { InsuranceProvider } from '@/utility/types/admin/insurance-provider/providerType';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa6';


const PolicyTopInsurance = ({ slug }: { slug: string }) => {

    const { data } = useSinglePolicyDetailsQuery(slug);



    const topInsurance: InsuranceProvider[] = data?.data?.top_providers || []










    return (
        <div className=' pb-10' >
            <MaxWidth>
                <div className=' text-center  ' >
                    <h1 className=' font-normal lg:text-4xl text-lg text-black ' >Top Rated Providers for Auto Insurance</h1>
                    <p className=' lg:mt-3 mt-1.5 lg:text-xl text-sm font-thin ' >Based on community reviews for auto policies.</p>
                </div>
                <div className=' lg:mt-9 mt-4 grid md:grid-cols-3  grid-cols-1 lg:flex-row justify-between  lg:space-y-6 space-y-6 gap-x-6  ' >
                    {
                        topInsurance.map((item, i) => {
                            return (
                                <div className='  rounded-[7px] shadow shadow-[#00000040] lg:p-6 p-3   ' key={i} >

                                    <div className='  ' >
                                        <span>
                                            <Image unoptimized src={item?.logo_url} width={2000} height={2000} alt={item?.name} className=' w-[51px] h-[53px] border border-[#E9D1A7] rounded-[8px]  ' />
                                        </span>

                                    </div>
                                    <div className=' mt-3  ' >
                                        <h1 className=' text-black font-normal lg:text-[16px] text-xs h-12  ' >{item?.name}</h1>
                                        <div className="flex items-center space-x-1 mt-2 ">
                                            <span className="font-bold text-black lg:text-[16px] text-xs ">{item?.avg_overall_rating}</span>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"


                                                    className="focus:outline-none"
                                                >
                                                    <FaStar
                                                        size={16}
                                                        className={` cursor-pointer ${star <= (Number(item?.avg_overall_rating))
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                </button>
                                            ))}

                                            {/* Rating Text */}

                                            <span className=" text-black font-thin lg:text-[16px] text-xs ml-2 ">({item?.reviews_count})</span>
                                        </div>
                                    </div>

                                    <div className=' h-16 ' >
                                        <p className=' mt-4 lg:text-[16px] tex text-xs font-thin ' >
                                            {item.about
                                                .replace(/<[^>]+>/g, "")
                                                .slice(0, 100)}
                                            ...
                                        </p>
                                    </div>

                                    <div className=' flex items-center mt-4 gap-x-3 ' >
                                        <span>
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.85425 19.3673C9.85425 19.3673 3.5 14.0157 3.5 8.75C3.5 6.89348 4.2375 5.11301 5.55025 3.80025C6.86301 2.4875 8.64348 1.75 10.5 1.75C12.3565 1.75 14.137 2.4875 15.4497 3.80025C16.7625 5.11301 17.5 6.89348 17.5 8.75C17.5 14.0157 11.1457 19.3673 11.1457 19.3673C10.7922 19.6928 10.2104 19.6893 9.85425 19.3673ZM10.5 11.8125C10.9022 11.8125 11.3004 11.7333 11.672 11.5794C12.0435 11.4255 12.3811 11.1999 12.6655 10.9155C12.9499 10.6311 13.1755 10.2935 13.3294 9.92197C13.4833 9.55041 13.5625 9.15217 13.5625 8.75C13.5625 8.34783 13.4833 7.94959 13.3294 7.57803C13.1755 7.20647 12.9499 6.86887 12.6655 6.58449C12.3811 6.30011 12.0435 6.07452 11.672 5.92062C11.3004 5.76671 10.9022 5.6875 10.5 5.6875C9.68777 5.6875 8.90882 6.01016 8.33449 6.58449C7.76016 7.15882 7.4375 7.93777 7.4375 8.75C7.4375 9.56223 7.76016 10.3412 8.33449 10.9155C8.90882 11.4898 9.68777 11.8125 10.5 11.8125Z" fill="#697079" />
                                            </svg>

                                        </span>
                                        <h1 className=' font-thin lg:text-[14px] text-xs text-black ' >
                                            Available in {item?.states_count} states
                                        </h1>
                                    </div>
                                    <div className=' lg:mt-5 mt-2 h-6 ' >
                                        {item?.is_sponsored && item?.sponsored_url && (
                                            <Link target='_blank' className=' cursor-pointer ' href={item.sponsored_url}>
                                                <button className="text-[#946D2D] lg:text-[14px] font-normal bg-[#F0E0C4] py-1 px-2 rounded-[3px] mt-1">
                                                    Sponsored
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                    <div className='  ' >
                                        <Link href={`/insurance-profile/${item?.slug}`}>
                                            <button className=' cursor-pointer w-full bg-[#D09A40] border border-[#D09A40] py-1  rounded-[34px] lg:mt-9 mt-4 text-[#FFFFFF] lg:text-xl text-sm font-normal ' >
                                                View Profile
                                            </button>
                                        </Link>
                                    </div>
                                </div>


                            )
                        })
                    }
                </div>
            </MaxWidth>
        </div>
    )
}

export default PolicyTopInsurance