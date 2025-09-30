import MaxWidth from '@/app/components/max-width/MaxWidth'
import React from 'react'
import InsuranceTable from './InsuranceTable'

const Page = () => {
    return (
        <div className="bg-[#f9fafb] border-b border-[#989DA3] ">
            <MaxWidth>
                <div className=' pt-11 pb-14 ' >
                    <div className="">
                        <h1 className="lg:text-4xl text-lg font-normal">Compare Providers</h1>
                        <p className=' mt-3.5 font-thin lg:text-xl text-xs text-[#000000]  ' >See how providers stack up across coverage, pricing, service, and more to make an informed decision.</p>
                    </div>
                    <div className=' mt-11 ' >
                        <InsuranceTable></InsuranceTable>
                    </div>
                </div>

            </MaxWidth>
        </div>
    )
}

export default Page
