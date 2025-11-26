"use client"
import { useMostReviewInsuranceQuery } from '@/app/api/website/insurance/webInsuranceApi'
import MaxWidth from '@/app/components/max-width/MaxWidth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MostReview = () => {
    const { data } = useMostReviewInsuranceQuery(undefined);
    console.log("review is", data?.data[0]);
    const singleProvider = data?.data[0] || []
    return (
        <div className=' bg-[#D09A40] lg:pt-4 lg:pb-14 pb-5 pt-2 ' >
            <MaxWidth>
                <div className=' flex flex-row items-center justify-between gap-x-24 ' >
                    {/* left side  */}
                    <div className=' max-w-[70%] flex-1 w-full ' >
                        <h1 className=' text-white lg:text-5xl text-xl font-bold ' >Most Reviewed Policy</h1>
                        <p className=' text-[#FFFFFF] lg:text-xl text-xs font-thin lg:mt-4 mt-2 ' >{singleProvider?.provider?.name} has the highest number of community reviews. See what real people are saying about their experiences with different providers.</p>
                        <div>
                            <Link href={`/insurance-profile/${singleProvider?.provider?.slug}`} >
                                <button className=' lg:mt-6 mt-3  lg:text-2xl text-lg font-normal text-white flex items-center gap-x-3 -ml-6 lg:ml-0 cursor-pointer ' >
                                    Explore {singleProvider?.provider?.name} Reviews
                                    <span className=' block mt-1  ' ><svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M25.9399 9.72751C26.1447 9.93259 26.2598 10.2106 26.2598 10.5004C26.2598 10.7903 26.1447 11.0683 25.9399 11.2733L17.1899 20.0233C17.0898 20.1308 16.969 20.217 16.8348 20.2768C16.7007 20.3366 16.5558 20.3687 16.409 20.3713C16.2621 20.3739 16.1163 20.3469 15.9801 20.2919C15.8439 20.2368 15.7202 20.155 15.6163 20.0511C15.5124 19.9472 15.4306 19.8235 15.3755 19.6873C15.3205 19.5511 15.2935 19.4053 15.2961 19.2584C15.2987 19.1116 15.3309 18.9667 15.3906 18.8326C15.4504 18.6984 15.5366 18.5776 15.6441 18.4775L22.5274 11.5942H1.83364C1.54356 11.5942 1.26536 11.4789 1.06025 11.2738C0.855127 11.0687 0.739895 10.7905 0.739895 10.5004C0.739895 10.2103 0.855127 9.93215 1.06025 9.72703C1.26536 9.52191 1.54356 9.40668 1.83364 9.40668H22.5274L15.6441 2.52334C15.5366 2.42321 15.4504 2.30246 15.3906 2.1683C15.3309 2.03413 15.2987 1.8893 15.2961 1.74244C15.2935 1.59558 15.3205 1.4497 15.3755 1.31351C15.4306 1.17732 15.5124 1.05361 15.6163 0.949746C15.7202 0.845886 15.8439 0.764008 15.9801 0.708998C16.1163 0.653988 16.2621 0.626974 16.409 0.629565C16.5558 0.632156 16.7007 0.6643 16.8348 0.72408C16.969 0.78386 17.0898 0.87005 17.1899 0.97751L25.9399 9.72751Z" fill="white" />
                                    </svg>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* right side  */}
                    <div className=' max-w-[30%] flex-1 w-full  ' >
                        <Image unoptimized src={singleProvider?.provider?.logo_url} width={297} height={109} alt='' className='' />
                    </div>
                </div>
            </MaxWidth>
        </div>
    )
}

export default MostReview