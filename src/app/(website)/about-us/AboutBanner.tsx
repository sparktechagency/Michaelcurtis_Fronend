"use client"

import { useContentApiQuery } from '@/app/api/website/content/webContentApi';
import React from 'react'

// comments 
// about page 

const AboutBanner = () => {

    const { data } = useContentApiQuery({ pageName: "about" });
    console.log(data?.data?.content);

    return (
        <div className=' lg:pb-14 pb-7 ' >
            <div className=' bg-[#FAF5EC] py-6 lg:py-12 ' >
                <h1 className=' text-center lg:text-5xl text-xl font-bold ' >About <span className=' text-[#D09A40] ' >CoverageGrader</span></h1>
                <p className=' text-center lg:mt-5 mt-3 max-w-4xl mx-auto lg:text-xl text-sm font-thin  ' >
                    Our mission is to empower people to make confident insurance decisions through transparent, community-driven reviews and unbiased, expert guidance
                </p>
            </div>
            <div className=' lg:mt-14 mt-7 mb-5 lg:mb-10  max-w-4xl mx-auto shadow shadow-[#00000040] rounded-[7px] px-6 py-5 bg-white lg:py-10 lg:px-12 ' >
                <h1 className=' lg:text-4xl text-lg font-normal text-black text-center lg:mb-4 pb-2 ' >Our Story</h1>
                <div>
                    <p
                        dangerouslySetInnerHTML={{ __html: data?.data?.content }}
                    />
                </div>

            </div>










            








        </div>
    )
}

export default AboutBanner