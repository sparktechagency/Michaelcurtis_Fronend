"use client"
import { useContentApiQuery } from '@/app/api/website/content/webContentApi';
import React from 'react'

const Methodology = () => {
    const { data } = useContentApiQuery({ pageName: "metholodgy" });
    console.log(data?.data?.content);
    return (
        <div className=' lg:pb-16 pb-8 ' >
            <div className=' bg-[#FAF5EC] py-6 lg:py-12 ' >
                <h1 className=' text-center lg:text-5xl text-xl font-bold ' >How We Calculate <span className=' text-[#D09A40] ' >Provider Scores</span></h1>

                <p className=' text-center lg:mt-5 mt-3 max-w-4xl mx-auto lg:text-xl text-sm font-thin  ' >
                    Our commitment to transparency starts here. Learn about our scoring methodology and review moderation process to understand how we put the community&lsquo;s voice first.                    </p>
            </div>

            <div className=' lg:mt-14 mt-7 mb-5 lg:mb-10  max-w-4xl mx-auto shadow shadow-[#00000040] rounded-[7px] px-6 py-5 bg-white lg:py-10 lg:px-12 ' >
                <p
                    dangerouslySetInnerHTML={{ __html: data?.data?.content }}
                />

            </div>

        </div>
    )
}

export default Methodology