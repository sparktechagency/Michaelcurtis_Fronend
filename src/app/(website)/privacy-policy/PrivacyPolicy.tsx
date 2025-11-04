"use client";
import { useContentApiQuery } from '@/app/api/website/content/webContentApi';
import React from 'react'




const PrivacyPolicy = () => {


    const { data } = useContentApiQuery({ pageName: "privacy" });

    return (
        <>
            <div className=' bg-[#FAF5EC] py-6 lg:py-12 ' >
                <h1 className=' text-center lg:text-5xl text-xl font-bold ' >Privacy  <span className=' text-[#D09A40] ' >Policy</span></h1>


                <p className=' text-center lg:mt-5 mt-3 max-w-4xl mx-auto lg:text-xl text-sm font-thin  ' >
                    Last updated: September 07, 2025. Your privacy matters to us. Here’s how we handle your data to keep it safe and secure.
                </p>
            </div>

            <div className=' pb-3 ' >
                <div className=' lg:mt-14 mt-7 mb-5 lg:mb-10  max-w-4xl mx-auto shadow shadow-[#00000040] rounded-[7px] px-6 py-5 bg-white lg:py-10 lg:px-12 text-2xl ' >




                    <p
                        dangerouslySetInnerHTML={{ __html: data?.data?.content }}
                    />





                </div>
            </div>

        </>
    )
}

export default PrivacyPolicy