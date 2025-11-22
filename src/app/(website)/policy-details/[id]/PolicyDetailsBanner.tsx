"use client"
import { useSinglePolicyDetailsQuery } from '@/app/api/website/policy/webPolicyApi'
import Image from 'next/image'
import React from 'react'

const PolicyDetailsBanner = ({ slug }: { slug: string }) => {
    const { data } = useSinglePolicyDetailsQuery(slug);


    return (
        <div className=' bg-[#FAF5EC] lg:pt-13 pt-6 pb-7 lg:pb-16   ' >
            <div className=' max-w-4xl mx-auto ' >
                <div className='' >
                    <Image src={data?.data?.category?.logo_url} width={10000} unoptimized height={20000} alt='' className=' block mx-auto  w-[297px] h-[109px] ' />
                    <h1 className=' font-bold lg:text-5xl text-2xl text-center lg:mt-8 mt-4 ' >{data?.data?.category?.name} Insurance <span className=' text-[#D09A40] ' >Explained</span></h1>
                    <p className=' lg:text-xl  text-xs text-center lg:mt-6 mt-3 font-thin ' >Everything you need to know about auto insurance — from coverage basics and costs to what to look for in a provider.</p>
                </div>
            </div>
        </div>
    )
}

export default PolicyDetailsBanner