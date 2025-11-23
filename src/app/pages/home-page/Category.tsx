"use client"
import { useWebAllPolicyQuery } from '@/app/api/website/policy/webPolicyApi'
import MaxWidth from '@/app/components/max-width/MaxWidth'
import PolicyLoader from '@/app/components/skeleton/PolicyLoader'
import { AllPolicyApiResponse } from '@/utility/types/admin/policy/policyType'
import Image from 'next/image'
import React from 'react'

const Category = () => {
    const { data, isLoading } = useWebAllPolicyQuery([]);
    const allPolicy: AllPolicyApiResponse[] = data?.data || [];
    if (isLoading) {
        return (
            <div>
                <PolicyLoader></PolicyLoader>
            </div>
        )
    }
    return (
        <div className=' lg:py-11 py-6 ' >
            <MaxWidth>
                <div>
                    <h1 className=' text-center font-medium lg:text-4xl text-2xl ' >Browse by Category</h1>

                    <div className=' flex flex-wrap gap-x-3 lg:gap-x-9 lg:mt-5 mt-3 justify-center gap-y-6 ' >
                        {/* logo 1  */}
                        {
                            allPolicy.map((item, i) => {
                                return (
                                    <div key={i} >
                                        <div className="w-44 h-32 shadow shadow-[#00000033] rounded-[8px] flex flex-col justify-center items-center px-2 ">
                                            <span className='h-12   ' >

                                                <Image unoptimized src={item?.logo_url} width={10000} height={1000000} alt='' className=' w-16 h-14 ' />


                                            </span>
                                            <p className=' text-[#697079] lg:text-[16px] text-center font-normal h-12 mt-3 ' >
                                                {
                                                    item?.name
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }



                    </div>
                </div>
            </MaxWidth >
        </div >
    )
}

export default Category