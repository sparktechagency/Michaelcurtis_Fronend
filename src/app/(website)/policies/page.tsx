import React from 'react'
import PolicyBanner from './PolicyBanner'
import MostReview from './MostReview'
import PolicyReview from './PolicyReview'

const Page: React.FC = () => {
    return (
        <div className='border-b border-[#989DA3]' >
            <PolicyBanner></PolicyBanner>
            <MostReview></MostReview>
            <PolicyReview></PolicyReview>
        </div>
    )
}

export default Page