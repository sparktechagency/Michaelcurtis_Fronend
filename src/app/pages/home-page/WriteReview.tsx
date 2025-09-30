import MaxWidth from '@/app/components/max-width/MaxWidth'
import Link from 'next/link'
import React from 'react'

const WriteReview = () => {
    return (
        <div className=' bg-[#D09A40] mb-10  ' >
            <MaxWidth>
                <div className=' text-center py-7 lg:py-14 ' >
                    <h1 className=' font-bold lg:text-5xl text-3xl text-white  ' >Share your experience - help the community</h1>
                    <p className=' mt-4 lg:text-2xl font-normal text-xl text-white max-w-5xl mx-auto ' >Your review could help someone make the right insurance choice. It only takes a few minutes to share your experience.</p>
                    <button className=' lg:mt-11 mt-5 px-5 py-2 rounded-[26px] bg-white text-[#D09A40] lg:text-xl text-[16px] font-normal ' >
                        <Link href={"/review-from"}>
                            Write a Review
                        </Link>
                    </button>
                </div>
            </MaxWidth>

        </div>
    )
}

export default WriteReview