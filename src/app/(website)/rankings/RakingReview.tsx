"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const RakingReview = () => {
    const router = useRouter();
    const handleRoute = () => {
        router.push("/review-from")
    }
    return (
        <div className=' bg-[#D09A40] ' >
            <div className=' max-w-5xl mx-auto lg:pt-8 pt-5 pb-6 lg:pb-12   ' >
                <h1 className=' text-center font-bold text-white lg:text-5xl text-3xl  ' >Want to help others find great coverage?</h1>
                <p className=' text-center mt-2 text-white lg:mt-4 lg:text-xl text-sm font-normal ' >Your review makes our community stronger and our rankings more accurate. It only takes a minute.</p>
                <div className=" lg:mt-11 mt-5 ">
                    <button onClick={handleRoute} className=' block mx-auto text-[#D09A40] bg-white px-5 py-2 rounded-[26px] lg:text-xl text-sm font-normal cursor-pointer  ' >Write a Review</button>
                </div>
            </div>
        </div>
    )
}

export default RakingReview