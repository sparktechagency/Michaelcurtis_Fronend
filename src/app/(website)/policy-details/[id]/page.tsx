import React from 'react'
import PolicyDetailsBanner from './PolicyDetailsBanner';
import PolicyDetails from './PolicyDetails';
import PolicyTopInsurance from './PolicyTopInsurance';
import PolicyCategory from './PolicyCategory';

const Page: React.FC = () => {
    return (
        <div className=' bg-[#f9fafb] border-b border-[#989DA3] ' >
            <PolicyDetailsBanner></PolicyDetailsBanner>
            <PolicyDetails></PolicyDetails>
            <PolicyTopInsurance></PolicyTopInsurance>
            <PolicyCategory></PolicyCategory>
        </div>
    )
}

export default Page;