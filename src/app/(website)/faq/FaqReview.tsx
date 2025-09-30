import Link from 'next/link'
import React from 'react'

const FaqReview = () => {
    return (
        <div className=' lg:pb-9 pb-4 ' >
            <div className=' max-w-7xl mx-auto bg-white shadow shadow-[#00000040] rounded-[7px] py-6 text-center   ' >
                <h1 className=' text-[#000000] lg:text-4xl text-lg font-normal ' >Can&apos;t find what you&apos;re looking for?</h1>
                <p className=' lg:mt-3 mt-1  font-thin  lg:text-xl text-xs  ' >Our support team is happy to help with any other questions you may have.</p>
                <Link href={"/contact"}><button className=' lg:mt-8 mt-3 lg:text-xl text-xs text-white  bg-[#D09A40] py-2 px-5 font-normal rounded-[26px] cursor-pointer ' >Contact Support</button></Link>
            </div>
        </div>
    )
}

export default FaqReview