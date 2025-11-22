"use client"
import { useSinglePolicyDetailsQuery } from '@/app/api/website/policy/webPolicyApi';
import React from 'react'

const PolicyDetails = ({ slug }: { slug: string }) => {
    const { data } = useSinglePolicyDetailsQuery(slug);
    return (
        <div className=' max-w-5xl mx-auto pt-7 lg:pt-14 pb-5 lg:pb-10  ' >
            <div className=' bg-white px-9 lg:px-[72px] pt-7 lg:pt-14 pb-8 lg:pb-16  shadow shadow-[#00000040] ' >
                <div>
                    <p
                        dangerouslySetInnerHTML={{ __html: data?.data?.category.description }}
                    />
                </div>


            </div>
        </div>
    )
}

export default PolicyDetails