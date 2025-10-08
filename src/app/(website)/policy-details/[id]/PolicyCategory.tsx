"use client"
import React from 'react'
import { useWebAllPolicyQuery } from '@/app/api/website/policy/webPolicyApi';
import { SinglePolicyApiResponseType } from '@/utility/types/admin/policy/policyType';
import Image from 'next/image';



const PolicyCategory = () => {
    const { data } = useWebAllPolicyQuery({});
    const policies: SinglePolicyApiResponseType[] = data?.data || [];
    return (
        <div className=' max-w-5xl mx-auto lg:pb-10 pb-5  ' >
            <h1 className=' text-center lg:text-4xl font-normal text-lg ' >Explore Other Categories</h1>
            <div>
                <div>


                    <div className=' flex flex-wrap gap-x-12 gap-y-8 lg:gap-x-9 lg:mt-5  justify-center mt-5 ' >
                        {
                            policies.map((item, i) => {
                                return (
                                    <div className='' key={i} >
                                        {/* logo 1  */}
                                        <div className="w-[99px] h-[80px] shadow shadow-[#00000033] rounded-[8px] flex justify-center ">
                                            <span>
                                                <Image src={item?.logo_url} width={2000} height={2000} className=' w-12 h-8 mt-3 ' alt={item?.name} />
                                                <p className=' text-[#697079] lg:text-[16px] text-center font-normal ' >
                                                    {
                                                        item?.name
                                                    }
                                                </p>

                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }



                    </div>
                </div>
            </div>
        </div>
    )
}

export default PolicyCategory