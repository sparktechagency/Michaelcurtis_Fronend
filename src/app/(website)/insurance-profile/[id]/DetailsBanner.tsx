"use client"
import { useSingleProviderQuery } from '@/app/api/admin/insuranceApi'
import MaxWidth from '@/app/components/max-width/MaxWidth'
import { SinglePolicyApiResponseType } from '@/utility/types/admin/policy/policyType'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import InsuranceBySlugReview from './InsuranceBySlugReview'
import ProgressBar from '@ramonak/react-progress-bar'

const DetailsBanner = ({ slug }: { slug: string }) => {

    const { data } = useSingleProviderQuery(slug);




    const router = useRouter();
    const handleReview = (slug: string) => {
        router.push(`/specify-insurance-review/${slug}`)
    }








    const pros: string[] = data?.data?.pros || [];
    const cons: string[] = data?.data?.cons || [];
    const policies: SinglePolicyApiResponseType[] = data?.data?.policies || [];






    return (
        <div className='  border-b mb-4 border-[#697079]  ' >
            <div className=' bg-[#faf5ec] py-5 lg:py-14   ' >
                <MaxWidth>
                    <div className=' flex justify-between items-center ' >
                        {/* logo  */}
                        <div className=' flex items-center gap-x-8 ' >
                            <div>
                                <Image
                                    src={data?.data?.logo_url}
                                    alt={data?.data?.slug || "category-logo"}
                                    width={96}
                                    height={101}
                                    unoptimized
                                    className="w-24 h-[91px] object-contain rounded-md"
                                />
                            </div>
                            <div>
                                <h1 className=' lg:text-4xl text-lg font-normal text-black ' > {data?.data?.name} </h1>
                                <div className=' flex flex-row items-center gap-x-4 ' >
                                    <div>

                                        <h1
                                            className={`lg:text-4xl text-lg font-bold  
    ${data?.data?.avg_grade === "A" ? "text-[#22C55E]" :    // Green for A
                                                    data?.data?.avg_grade === "B" ? "text-[#3B82F6]" :      // Blue for B
                                                        data?.data?.avg_grade === "C" ? "text-[#EAB308 " :      // Yellow/Orange for C
                                                            data?.data?.avg_grade === "D" ? "text-[#F97316]" :      // Dark Orange for D
                                                                "text-[#DC2626 ]"                                    // Default for E or others
                                                }`}
                                        >
                                            {data?.data?.avg_grade}
                                        </h1>
                                    </div>
                                    <div>
                                        <div className=' w-2 h-2 bg-black rounded-full ' >

                                        </div>
                                    </div>
                                    <div>
                                        <span>
                                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.5002 19.7531L6.79396 23.1906C6.54187 23.351 6.27833 23.4198 6.00333 23.3969C5.72833 23.374 5.48771 23.2823 5.28146 23.1219C5.07521 22.9615 4.91479 22.7612 4.80021 22.521C4.68562 22.2808 4.66271 22.0113 4.73146 21.7125L6.24396 15.2156L1.19083 10.85C0.961667 10.6437 0.818666 10.4086 0.761833 10.1446C0.705 9.88062 0.721958 9.62304 0.812708 9.37187C0.903458 9.1207 1.04096 8.91445 1.22521 8.75312C1.40946 8.59179 1.66154 8.48866 1.98146 8.44374L8.65021 7.85937L11.2283 1.74062C11.3429 1.46562 11.5208 1.25937 11.7618 1.12187C12.0029 0.984369 12.249 0.915619 12.5002 0.915619C12.7514 0.915619 12.9975 0.984369 13.2386 1.12187C13.4797 1.25937 13.6575 1.46562 13.7721 1.74062L16.3502 7.85937L23.019 8.44374C23.3398 8.48958 23.5919 8.5927 23.7752 8.75312C23.9585 8.91354 24.096 9.11979 24.1877 9.37187C24.2794 9.62395 24.2968 9.88199 24.24 10.146C24.1831 10.41 24.0397 10.6447 23.8096 10.85L18.7565 15.2156L20.269 21.7125C20.3377 22.0104 20.3148 22.2799 20.2002 22.521C20.0856 22.7621 19.9252 22.9624 19.719 23.1219C19.5127 23.2814 19.2721 23.373 18.9971 23.3969C18.7221 23.4207 18.4585 23.352 18.2065 23.1906L12.5002 19.7531Z" fill="#F6CF2F" />
                                            </svg>

                                        </span>
                                    </div>
                                    <div>
                                        <p className=' lg:text-xl text-xs font-normal ' >{data?.data?.avg_overall_rating}</p>
                                    </div>

                                    <div>
                                        <div className=' w-2 h-2 bg-black rounded-full ' >

                                        </div>
                                    </div>
                                    <div>
                                        <h1 className=' font-thin lg:text-lg  text-xs text-black  ' >({data?.data?.reviews_count} reviews)</h1>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* review button  */}
                        <div>
                            <Link href={`/specify-insurance-review/${data?.data?.slug}`}>
                                <button className=' cursor-pointer lg:text-xl text-xs font-normal text-white border border-[#D09A40] bg-[#D09A40] py-2 px-5 rounded-[26px]  ' >Write a Review</button>
                            </Link>
                        </div>
                    </div>






                </MaxWidth>
            </div>

            {/* rating  */}


            <MaxWidth>
                {/* left side  */}
                <div className=' flex flex-col lg:flex-row   justify-between gap-x-6 mt-6   ' >
                    <div className=" w-full lg:w-[65%]   mb-10  pl-5 pr-8  pb-10 pt-5 shadow shadow-[#00000033] rounded-[10px]    ">
                        <h2 className="text-xl font-semibold mb-4">Overall Ratings</h2>

                        <div className="space-y-20 mt-6 ">

                            {/* Claims */}
                            <div className="flex items-center gap-x-5 justify-between  ">

                                {/* Label */}
                                <h1 className="text-gray-700 font-medium w-16 text-xl ">Claims</h1>

                                {/* Progress Bar */}
                                <div className=" w-[70%] ">
                                    <ProgressBar
                                        completed={data?.data?.avg_claims * 20}
                                        isLabelVisible={false}
                                        height="10px"
                                        bgColor={
                                            data?.data?.avg_claims == 5 ? "#22C55E" :       // Green (A)
                                                data?.data?.avg_claims == 4 ? "#3B82F6" :       // Blue (B)
                                                    data?.data?.avg_claims == 3 ? "#EAB308" :       // Yellow (C)
                                                        data?.data?.avg_claims == 2 ? "#F97316" :       // Orange (D)
                                                            "#DC2626"                                 // Red (E)
                                        }
                                    />
                                </div>

                                {/* Rating Text */}
                                <div className=" text-right">
                                    {
                                        data?.data?.avg_claims == 5 ? (
                                            <span className="text-[#22C55E] text-xl ">{data?.data?.avg_claims} A</span>
                                        ) : data?.data?.avg_claims == 4 ? (
                                            <span className="text-[#3B82F6] text-xl ">{data?.data?.avg_claims} B</span>
                                        ) : data?.data?.avg_claims == 3 ? (
                                            <span className="text-[#EAB308] text-xl ">{data?.data?.avg_claims} C</span>
                                        ) : data?.data?.avg_claims == 2 ? (
                                            <span className="text-[#F97316] text-xl ">{data?.data?.avg_claims} D</span>
                                        ) : data?.data?.avg_claims == 1 ? (
                                            <span className="text-[#DC2626] text-xl ">{data?.data?.avg_claims} E</span>
                                        ) : (
                                            <span>-</span>
                                        )
                                    }
                                </div>

                            </div>

                            {/* Service */}
                            <div className="flex items-center gap-x-5 justify-between  ">

                                {/* Label */}
                                <h1 className="text-gray-700 font-medium w-16 text-xl  ">Service</h1>

                                {/* Progress Bar */}
                                <div className="w-[70%]">
                                    <ProgressBar
                                        completed={data?.data?.avg_service * 20}
                                        isLabelVisible={false}
                                        height="10px"
                                        bgColor={
                                            data?.data?.avg_service == 5 ? "#22C55E" :       // Green (A)
                                                data?.data?.avg_service == 4 ? "#3B82F6" :       // Blue (B)
                                                    data?.data?.avg_service == 3 ? "#EAB308" :       // Yellow (C)
                                                        data?.data?.avg_service == 2 ? "#F97316" :       // Orange (D)
                                                            "#DC2626"                                 // Red (E)
                                        }
                                    />
                                </div>

                                {/* Rating Text */}
                                <div className=" text-right">
                                    {
                                        data?.data?.avg_service == 5 ? (
                                            <span className="text-[#22C55E] text-xl ">{data?.data?.avg_service} A</span>
                                        ) : data?.data?.avg_service == 4 ? (
                                            <span className="text-[#3B82F6] text-xl ">{data?.data?.avg_service} B</span>
                                        ) : data?.data?.avg_service == 3 ? (
                                            <span className="text-[#EAB308] text-xl ">{data?.data?.avg_service} C</span>
                                        ) : data?.data?.avg_service == 2 ? (
                                            <span className="text-[#F97316] text-xl ">{data?.data?.avg_service} D</span>
                                        ) : data?.data?.avg_service == 1 ? (
                                            <span className="text-[#DC2626] text-xl ">{data?.data?.avg_service} E</span>
                                        ) : (
                                            <span>-</span>
                                        )
                                    }
                                </div>

                            </div>

                            {/* Pricing */}
                            <div className="flex items-center justify-between gap-x-5 ">

                                {/* Label */}
                                <h1 className="text-gray-700 font-medium w-16 text-xl ">Pricing</h1>

                                {/* Progress Bar */}
                                <div className="w-[70%]">
                                    <ProgressBar
                                        completed={data?.data?.avg_pricing * 20}
                                        isLabelVisible={false}
                                        height="10px"
                                        bgColor={
                                            data?.data?.avg_pricing == 5 ? "#22C55E" :       // Green (A)
                                                data?.data?.avg_pricing == 4 ? "#3B82F6" :       // Blue (B)
                                                    data?.data?.avg_pricing == 3 ? "#EAB308" :       // Yellow (C)
                                                        data?.data?.avg_pricing == 2 ? "#F97316" :       // Orange (D)
                                                            "#DC2626"                                 // Red (E)
                                        }
                                    />
                                </div>

                                {/* Rating Text */}
                                <div className=" text-right">
                                    {
                                        data?.data?.avg_pricing == 5 ? (
                                            <span className="text-[#22C55E] text-xl  ">{data?.data?.avg_pricing} A</span>
                                        ) : data?.data?.avg_pricing == 4 ? (
                                            <span className="text-[#3B82F6]  text-xl ">{data?.data?.avg_pricing} B</span>
                                        ) : data?.data?.avg_pricing == 3 ? (
                                            <span className="text-[#EAB308] text-xl  ">{data?.data?.avg_pricing} C</span>
                                        ) : data?.data?.avg_pricing == 2 ? (
                                            <span className="text-[#F97316]  text-xl ">{data?.data?.avg_pricing} D</span>
                                        ) : data?.data?.avg_pricing == 1 ? (
                                            <span className="text-[#DC2626] text-xl  ">{data?.data?.avg_pricing} E</span>
                                        ) : (
                                            <span>-</span>
                                        )
                                    }
                                </div>

                            </div>

                            {/* Coverage */}
                            <div className="flex items-center justify-between gap-x-5 ">

                                {/* Label */}
                                <h1 className="text-gray-700 font-medium w-16 text-xl  ">Coverage</h1>

                                {/* Progress Bar */}
                                <div className="w-[70%]">
                                    <ProgressBar
                                        completed={data?.data?.avg_coverage * 20}
                                        isLabelVisible={false}
                                        height="10px"
                                        bgColor={
                                            data?.data?.avg_coverage == 5 ? "#22C55E" :       // Green (A)
                                                data?.data?.avg_coverage == 4 ? "#3B82F6" :       // Blue (B)
                                                    data?.data?.avg_coverage == 3 ? "#EAB308" :       // Yellow (C)
                                                        data?.data?.avg_coverage == 2 ? "#F97316" :       // Orange (D)
                                                            "#DC2626"                                 // Red (E)
                                        }
                                    />
                                </div>

                                {/* Rating Text */}
                                <div className=" text-right">
                                    {
                                        data?.data?.avg_coverage == 5 ? (
                                            <span className="text-[#22C55E] text-xl ">{data?.data?.avg_coverage} A</span>
                                        ) : data?.data?.avg_coverage == 4 ? (
                                            <span className="text-[#3B82F6] text-xl ">{data?.data?.avg_coverage} B</span>
                                        ) : data?.data?.avg_coverage == 3 ? (
                                            <span className="text-[#EAB308] text-xl ">{data?.data?.avg_coverage} C</span>
                                        ) : data?.data?.avg_coverage == 2 ? (
                                            <span className="text-[#F97316] text-xl ">{data?.data?.avg_coverage} D</span>
                                        ) : data?.data?.avg_coverage == 1 ? (
                                            <span className="text-[#DC2626] text-xl ">{data?.data?.avg_coverage} E</span>
                                        ) : (
                                            <span>-</span>
                                        )
                                    }
                                </div>

                            </div>

                            {/* Trust */}
                            <div className="flex items-center justify-between gap-x-5 ">

                                {/* Label */}
                                <h1 className="text-gray-700 font-medium w-16 text-xl  ">Trust</h1>

                                {/* Progress Bar */}
                                <div className="w-[70%]">
                                    <ProgressBar
                                        completed={data?.data?.avg_trust * 20}
                                        isLabelVisible={false}
                                        height="10px"
                                        bgColor={
                                            data?.data?.avg_trust == 5 ? "#22C55E" :       // Green (A)
                                                data?.data?.avg_trust == 4 ? "#3B82F6" :       // Blue (B)
                                                    data?.data?.avg_trust == 3 ? "#EAB308" :       // Yellow (C)
                                                        data?.data?.avg_trust == 2 ? "#F97316" :       // Orange (D)
                                                            "#DC2626"                                 // Red (E)
                                        }
                                    />
                                </div>

                                {/* Rating Text */}
                                <div className=" text-right">
                                    {
                                        data?.data?.avg_trust == 5 ? (
                                            <span className="text-[#22C55E] text-xl ">{data?.data?.avg_trust} A</span>
                                        ) : data?.data?.avg_trust == 4 ? (
                                            <span className="text-[#3B82F6] text-xl ">{data?.data?.avg_trust} B</span>
                                        ) : data?.data?.avg_trust == 3 ? (
                                            <span className="text-[#EAB308] text-xl ">{data?.data?.avg_trust} C</span>
                                        ) : data?.data?.avg_trust == 2 ? (
                                            <span className="text-[#F97316 ] text-xl ">{data?.data?.avg_trust} D</span>
                                        ) : data?.data?.avg_trust == 1 ? (
                                            <span className="text-[#DC2626 ] text-xl ">{data?.data?.avg_trust} E</span>
                                        ) : (
                                            <span>-</span>
                                        )
                                    }
                                </div>

                            </div>
                        </div>


                    </div>

                    {/* right side  */}
                    <div className=' lg:w-[35%] w-full    ' >

                        <div className='shadow shadow-[#00000033] bg-white lg:max-[20%] pt-3.5 px-8 rounded-[10px] pb-6 ' >
                            <h1 className=' mb-4 lg:text-4xl text-lg font-normal text-black ' >Quick Stats</h1>
                            <div className=' flex  items-center gap-x-2  ' >
                                <span>
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5 15V17C14.5 17.2652 14.3946 17.5196 14.2071 17.7071C14.0196 17.8946 13.7652 18 13.5 18H6.5L3.5 21V11C3.5 10.7348 3.60536 10.4804 3.79289 10.2929C3.98043 10.1054 4.23478 10 4.5 10H6.5M21.5 14L18.5 11H11.5C11.2348 11 10.9804 10.8946 10.7929 10.7071C10.6054 10.5196 10.5 10.2652 10.5 10V4C10.5 3.73478 10.6054 3.48043 10.7929 3.29289C10.9804 3.10536 11.2348 3 11.5 3H20.5C20.7652 3 21.0196 3.10536 21.2071 3.29289C21.3946 3.48043 21.5 3.73478 21.5 4V14Z" stroke="#D09A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </span>
                                <div className="lg:text-lg font-normal text-black flex items-center gap-x-2  ">
                                    <p>Policies:</p>
                                    <ul className="list-none font-thin text-black">
                                        {policies?.map((item) => (
                                            <p key={item.id}>{item.name}</p>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                            <div className=' flex  items-center gap-x-2 mt-5 ' >
                                <span>
                                    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.1769 23.1575C10.9797 23.2991 10.743 23.3753 10.5002 23.3753C10.2574 23.3753 10.0208 23.2991 9.82356 23.1575C3.98851 18.9984 -2.20419 10.4434 4.05618 4.26158C5.77484 2.57094 8.0894 1.62394 10.5002 1.625C12.9169 1.625 15.2357 2.57354 16.9443 4.26038C23.2046 10.4422 17.0119 18.996 11.1769 23.1575Z" stroke="#D09A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.5002 12.5C11.1411 12.5 11.7558 12.2454 12.209 11.7922C12.6622 11.339 12.9168 10.7243 12.9168 10.0833C12.9168 9.4424 12.6622 8.82771 12.209 8.3745C11.7558 7.92128 11.1411 7.66667 10.5002 7.66667C9.85922 7.66667 9.24453 7.92128 8.79132 8.3745C8.33811 8.82771 8.0835 9.4424 8.0835 10.0833C8.0835 10.7243 8.33811 11.339 8.79132 11.7922C9.24453 12.2454 9.85922 12.5 10.5002 12.5Z" stroke="#D09A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>


                                </span>
                                <p className=' lg:text-lg font-normal text-black ml-1 ' >
                                    Available in: <span className=' lg:text-left font-thin ' > {data?.data?.states_count} States</span>
                                </p>
                            </div>





                            <div className=' flex  items-center gap-x-2 mt-5 ' >
                                <span>
                                    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 3H7.5M7.5 3H5C4.07174 3 3.1815 3.36875 2.52513 4.02513C1.86875 4.6815 1.5 5.57174 1.5 6.5C1.5 7.42826 1.86875 8.3185 2.52513 8.97487C3.1815 9.63125 4.07174 10 5 10H7.5M7.5 3V1M7.5 3V10M7.5 10H10C10.4596 10 10.9148 10.0905 11.3394 10.2664C11.764 10.4423 12.1499 10.7001 12.4749 11.0251C12.7999 11.3501 13.0577 11.736 13.2336 12.1606C13.4095 12.5852 13.5 13.0404 13.5 13.5C13.5 13.9596 13.4095 14.4148 13.2336 14.8394C13.0577 15.264 12.7999 15.6499 12.4749 15.9749C12.1499 16.2999 11.764 16.5577 11.3394 16.7336C10.9148 16.9095 10.4596 17 10 17H7.5M7.5 10V17M7.5 17H1.5M7.5 17V19" stroke="#D09A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>



                                </span>
                                <p className=' lg:text-lg font-normal text-black ml-2.5 ' >
                                    Average Price:<span className=' lg:text-left font-thin  ' >  ${data?.data?.price}</span>
                                </p>
                            </div>




                        </div>




                        <div className='shadow shadow-[#00000033] bg-white lg:max-[20%] pt-3.5 px-8 rounded-[10px] pb-6 mt-5  ' >

                            {data?.data?.is_sponsored && data?.data?.sponsored_url && (
                                <Link target='_blank' className=' cursor-pointer ' href={data?.data.sponsored_url}>
                                    <button className="text-[#946D2D] lg:text-[14px] font-normal bg-[#F0E0C4] py-1 px-2 rounded-[3px] mt-1">
                                        Sponsored
                                    </button>
                                </Link>
                            )}

                            <div className=' flex justify-center ' >
                                <span>
                                    <Image unoptimized src={data?.data?.logo_url} width={100} height={100} alt={data?.data?.name} className={` w-24 h-24 `} />
                                </span>


                            </div>
                            <div className=' mt-2 text-center ' >
                                <h1 className=' lg:text-xl text-sm text-black font-normal ' >
                                    {
                                        data?.data?.name
                                    }
                                </h1>
                                <p className=' mt-1 font-thin text-lg ' >Compare rate and save up to ${data?.data?.price} on your insurance</p>
                            </div>

                            {/* <div>
                                <button className=' mt-5 shadow shadow-[#00000040] border border-[#D09A40] bg-[#D09A40] w-full py-3 rounded-[26px] cursor-pointer text-[#FFFFFF] font-normal lg:text-xl text-sm  ' >
                                    Compare with Others
                                </button>
                            </div> */}

                        </div>




                    </div>
                </div>
            </MaxWidth>

            {/* Community Pros & Cons */}

            <MaxWidth>
                <div className=' shadow shadow-[#00000033] max-w-3xl   lg:py-8 lg:px-10 p-4 rounded-[7px] lg:space-y-0   ' >
                    <h1 className=' lg:text-4xl text-lg font-normal text-black ' >Community Pros & Cons</h1>
                    <div className=' mt-5 flex lg:flex-row flex-col gap-x-9 space-y-6 lg:space-y-0 ' >
                        <div className=' bg-[#E6FBDC] w-[366px] rounded-[8px] px-9 pt-4 pb-9 ' >
                            <h1 className=' text-[#188625] lg:text-[27px] font-normal text-sm ' >Pros</h1>
                            <div className=' space-y-6 lg:text-lg text-xs text-black font-thin ' >
                                {
                                    pros.map((item, i) => {
                                        return (
                                            <div key={i} >
                                                <li className=' list-none  ' >{item}</li>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className=' bg-[#FBE5DC] w-[366px] rounded-[8px] px-9 pt-4 pb-9 ' >
                            <h1 className=' text-[#861818] lg:text-[27px] font-normal text-sm ' >Cons</h1>
                            <div className=' space-y-6 lg:text-lg text-xs text-black font-thin ' >
                                {
                                    cons?.map((item, i) => {
                                        return (
                                            <div key={i} >
                                                <li className=' list-none  ' >{item}</li>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidth>



            <MaxWidth>
                <div className=' shadow shadow-[#00000033] max-w-3xl   lg:py-8 lg:px-10 p-4 rounded-[7px] lg:space-y-0 my-6   ' >
                    <h1 className=' lg:text-4xl text-lg font-normal text-black ' >{data?.data?.name}</h1>
                    <p className=' mt-8 text-[#000000] lg:text-lg text-xs font-thin ' >
                        <p
                            dangerouslySetInnerHTML={{ __html: data?.data?.about }}
                        />
                    </p>

                </div>
            </MaxWidth>



            {/* review  */}


            <MaxWidth>
                <div className=' shadow shadow-[#00000033] max-w-3xl   lg:py-8 lg:px-10 p-4 rounded-[7px] lg:space-y-0 my-6   ' >
                    <h1 className=' lg:text-4xl text-lg font-normal text-black ' >Customer Reviews </h1>

                    <InsuranceBySlugReview slug={slug} />

                </div>
            </MaxWidth>


            <MaxWidth>
                <div className=' shadow shadow-[#00000033] max-w-3xl   lg:py-8 lg:px-10 p-4 rounded-[7px] lg:space-y-0 my-6 bg-[#faf5ec]   ' >
                    <h1 className=' lg:text-[27px]  text-sm text-center font-normal text-[#946D2D] ' >Share Your Experience </h1>
                    <p className=' lg:mt-2 mt-1 text-[#946D2D] lg:text-lg text-xs font-thin text-center ' >Help others make informed decisions by reviewing your experience with Liberty Mutual</p>



                    <button onClick={() => { handleReview(data?.data?.slug) }} className="block mx-auto rounded-[8px] bg-[#D09A40] py-2 px-5 text-white font-medium hover:bg-[#b68434] transition lg:mt-4 mt-2 cursor-pointer " >

                        Write a Review

                    </button>



                </div>
            </MaxWidth>























        </div>
    )
}

export default DetailsBanner