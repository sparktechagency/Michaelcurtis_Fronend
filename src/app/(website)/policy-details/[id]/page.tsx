import React from 'react'
import PolicyDetailsBanner from './PolicyDetailsBanner'
import PolicyDetails from './PolicyDetails'
import PolicyTopInsurance from './PolicyTopInsurance'
import PolicyCategory from './PolicyCategory'

interface PageProps {
    params: { id: string }
}

const Page: React.FC<PageProps> = ({ params }) => {
    const { id } = params

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
