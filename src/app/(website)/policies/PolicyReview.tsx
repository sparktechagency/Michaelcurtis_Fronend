import MaxWidth from '@/app/components/max-width/MaxWidth'
import Link from 'next/link'
import React from 'react'

const PolicyReview = () => {
    return (
        <div>
            <div className=' bg-[#f9fafb] py-5 lg:py-10 ' >
                <MaxWidth>
                    <div className=' text-center  bg-white py-3 lg:py-5 shadow shadow-[#00000040] rounded-[7px] ' >
                        <h1 className=' font-normal lg:text-4xl text-lg text-black   ' >Ready to share your experience?</h1>
                        <p className=' lg:mt-4 mt-2 font-thin lg:text-xl text-xs ' >Your review could help someone make the right insurance choice. It only takes a few minutes to share your experience.</p>
                        <button className=' lg:mt-6 mt-3 px-5 py-2 rounded-[26px] text-white bg-[#D09A40] lg:text-xl text-[16px] font-normal ' >
                            <Link href={"/review-from"}>
                                Write a Review
                            </Link>
                        </button>
                    </div>
                </MaxWidth>
            </div>
        </div>
    )
}

export default PolicyReview