"use client"

import { useContentApiQuery } from '@/app/api/website/content/webContentApi';
import React from 'react'

const TermText = () => {
    const { data } = useContentApiQuery({ pageName: "terms" });
    console.log(data?.data?.content);
    return (
        <div className=' pb-3 ' >
            <div className=' lg:mt-14 mt-7 mb-5 lg:mb-10  max-w-4xl mx-auto shadow shadow-[#00000040] rounded-[7px] px-6 py-5 bg-white lg:py-10 lg:px-12 text-2xl ' >




                <p
                    dangerouslySetInnerHTML={{ __html: data?.data?.content }}
                />





            </div>
        </div>
    )
}

export default TermText