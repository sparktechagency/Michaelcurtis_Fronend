import React from 'react'
import CommunityBanner from './CommunityBanner'
import CoreTerm from './CoreTerm'

const Page: React.FC = () => {
    return (
        <div className=' bg-[#f9fafb] border-b border-[#989DA3] ' >
            <CommunityBanner></CommunityBanner>
            <CoreTerm></CoreTerm>
        </div>
    )
}

export default Page