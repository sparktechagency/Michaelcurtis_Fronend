'use client'

import { useParams } from 'next/navigation'
import PolicyDetailsBanner from './PolicyDetailsBanner'
import PolicyDetails from './PolicyDetails'
import PolicyTopInsurance from './PolicyTopInsurance'
import PolicyCategory from './PolicyCategory'

const Page = () => {
    const params = useParams()
    const id = params.id as string

    return (
        <div className="bg-[#f9fafb] border-b border-[#989DA3]">
            <PolicyDetailsBanner slug={id} />
            <PolicyDetails slug={id} />
            <PolicyTopInsurance slug={id} />
            <PolicyCategory />
        </div>
    )
}

export default Page
